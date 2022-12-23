
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { IconButton } from 'react-native-paper';
import { CompendiumItemDetails } from '../components/CompendiumItemDetails';
import { CompendiumListViewer } from '../components/CompendiumListViewer';
import { EnemyDetails } from '../components/EnemyDetails';
import { MonsterListing } from '../components/MonsterListing';

const Stack = createNativeStackNavigator();

export const CompendiumListStack = ({ navigation, route }) => {
    const category = route?.params.category ?? {};
    if (category == undefined) throw 'Category is undefined';
    return (
        <Stack.Navigator initialRouteName="MonsterListing">
            <Stack.Screen name="ItemDetails" component={CompendiumItemDetails}
                options={{
                    title: "Details",
                }} />
            <Stack.Screen
                name="MonsterListing"
                component={CompendiumListViewer}
                initialParams={{category:category}}
                options={{
                    // title: 'Compendium',
                    headerShown:false,    
                }}
            />
        </Stack.Navigator>
    )
}
