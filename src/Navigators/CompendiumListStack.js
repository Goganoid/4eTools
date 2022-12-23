
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { CompendiumItemDetails } from '../components/CompendiumItemDetails';
import { CompendiumListViewer } from '../components/CompendiumListViewer';
import { EncounterContext } from '../App';
import { GroupContext } from './GroupStackNavigator';
import { IconButton } from 'react-native-paper';
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
