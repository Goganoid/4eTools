
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { IconButton } from 'react-native-paper';
import { CompendiumItemDetails } from '../components/Compendium/CompendiumItemDetails';
import { CompendiumListViewer } from '../components/Compendium/CompendiumListViewer';
const Stack = createNativeStackNavigator();

export const CompendiumListStack = ({ navigation, route }) => {
    const category = route?.params.category ?? {};
    if (category == undefined) throw 'Category is undefined';

    const mode = route?.params.mode ?? null;

    return (
        <Stack.Navigator initialRouteName="Listing">
            <Stack.Screen name="ItemDetails" component={CompendiumItemDetails}
                initialParams={{mode:mode}}
                options={{
                    title: "Details",
                    headerRight: () =>
                        <>
                            <IconButton icon="check" />
                        </>
                    ,
                }} />
            <Stack.Screen
                name="Listing"
                component={CompendiumListViewer}
                initialParams={{category:category}}
                options={{
                    headerShown:false,    
                }}
            />
        </Stack.Navigator>
    )
}
