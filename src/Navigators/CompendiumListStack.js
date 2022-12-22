
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { IconButton } from 'react-native-paper';
import { CompendiumListViewer } from '../components/CompendiumListViewer';
import { EnemyDetails } from '../components/EnemyDetails';
import { MonsterListing } from '../components/MonsterListing';

const Stack = createNativeStackNavigator();

export const CompendiumListStack = ({ navigation, route }) => {
    const category = route?.params.category ?? {};
    if (category == undefined) throw 'Category is undefined';
    return (
        <Stack.Navigator initialRouteName="MonsterListing">
            <Stack.Screen name="MonsterDetails" component={EnemyDetails}
                options={{
                    title: "Details",
                    headerRight: () =>
                        <>
                            <IconButton icon="check" />
                        </>
                    ,
                }} />
            <Stack.Screen
                name="MonsterListing"
                component={CompendiumListViewer}
                initialParams={{category}}
                options={{
                    title: 'Bestiary',
                        
                }}
            />
        </Stack.Navigator>
    )
}
