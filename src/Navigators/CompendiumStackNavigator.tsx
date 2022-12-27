import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Compendium } from '../components/Compendium/Compendium';
import { configMainScreenTitle } from '../helpers/configMainScreenTitle';
import { CompendiumListStack } from './CompendiumListStack';
import { CompendiumListParams } from './navigatorTypes';






const Stack = createNativeStackNavigator<CompendiumListParams>();

export const CompendiumStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="CompendiumMainPage">
            <Stack.Screen name="CompendiumMainPage"
                component={Compendium}
                options={{
                    title:"Compendium",
                }} />
            <Stack.Screen name="CompendiumList"
                component={CompendiumListStack}
                options={({route})=>{return configMainScreenTitle(route,'Bestiary')}} />
        </Stack.Navigator>
    )
}
