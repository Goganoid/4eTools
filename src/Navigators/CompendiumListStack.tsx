
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { IconButton } from 'react-native-paper';
import { CompendiumItemDetails } from '../components/Compendium/CompendiumItemDetails';
import { CompendiumListViewer } from '../components/Compendium/CompendiumListViewer';
import { Category, CategoryMode } from '../types/entityTypes';
import { CompendiumCategoryParams, CompendiumListParams, PowerTrackerParams } from '../types/navigatorTypes';





const Stack = createNativeStackNavigator<CompendiumCategoryParams>();

export const CompendiumListStack = ({ navigation, route }:
    NativeStackScreenProps<CompendiumListParams, 'CompendiumList'>
    | NativeStackScreenProps<PowerTrackerParams, 'AddPower'>) => {
    if(route.params==undefined) throw 'Route params are undefined';
    const category = route.params.category;
    const mode = route.params.mode;
    if (category == undefined) throw 'Category is undefined';
    if (mode == undefined) throw 'Mode is undefined';
    return (
        <Stack.Navigator initialRouteName="Listing">
            <Stack.Screen name="ItemDetails" component={CompendiumItemDetails}
                initialParams={{category:category,mode:mode}}
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
