
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { IconButton } from 'react-native-paper';
import { CompendiumItemDetails } from '../components/Compendium/CompendiumItemDetails';
import { CompendiumListViewer } from '../components/Compendium/CompendiumListViewer';
import { CompendiumCategory, CompendiumCategoryMode } from './entityTypes';
import { CompendiumCategoryParams, CompendiumListParams, PowerTrackerParams } from './navigatorTypes';





const Stack = createNativeStackNavigator<CompendiumCategoryParams>();

export const CompendiumListStack = ({ navigation, route }:
    NativeStackScreenProps<CompendiumListParams, 'CompendiumList'>
    | NativeStackScreenProps<PowerTrackerParams, 'AddPower'>

    ) => {
    const category = route.params.category ?? {};
    if (category == undefined) throw 'Category is undefined';

    const mode = route.params.mode;
    console.log("STACK ", category, mode ,CompendiumCategoryMode[mode]);
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
                initialParams={{category:category, mode:mode}}
                options={{
                    headerShown:false,    
                }}
            />
        </Stack.Navigator>
    )
}
