import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Compendium } from '../components/Compendium';
import { BestiaryStackNavigator } from './BestiaryStackNavigator';
import { CompendiumListViewer } from '../components/CompendiumListViewer';
import { CompendiumListStack } from './CompendiumListStack';
const Stack = createNativeStackNavigator();


export const CompendiumStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="CompendiumMainPage">
            <Stack.Screen name="CompendiumMainPage"
                component={Compendium} />
            <Stack.Screen name="Bestiary"
                component={BestiaryStackNavigator} />
            <Stack.Screen name="Weapons"
                component={CompendiumListStack}
                initialParams={{category:'weapons'}}
                options={{
                    headerShown:false,
                }} />
        </Stack.Navigator>
    )
}
