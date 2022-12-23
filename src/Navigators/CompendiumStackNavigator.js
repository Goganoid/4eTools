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
                component={Compendium}
                options={{
                    title:"Compendium",
                }} />
            <Stack.Screen name="Bestiary"
                component={BestiaryStackNavigator} />
            <Stack.Screen name="Weapons"
                component={CompendiumListStack}
                initialParams={{category:'weapons'}}
                options={{
                    
                }} />
            <Stack.Screen name="Trap"
                component={CompendiumListStack}
                initialParams={{category:'trap'}}
                options={{
                    title:"Traps",
                }} />
            <Stack.Screen name="Theme"
                component={CompendiumListStack}
                initialParams={{category:'theme'}}
                options={{
                    title:"Themes",
                }} />
            <Stack.Screen name="Ritual"
                component={CompendiumListStack}
                initialParams={{category:'ritual'}}
                options={{
                    title:"Rituals",
                }} />
            <Stack.Screen name="Race"
                component={CompendiumListStack}
                initialParams={{category:'race'}}
                options={{
                    title:"Races",
                }} />
            <Stack.Screen name="Power"
                component={CompendiumListStack}
                initialParams={{category:'power'}}
                options={{
                    title:"Powers",
                }} />
            <Stack.Screen name="ParagonPower"
                component={CompendiumListStack}
                initialParams={{category:'paragonpower'}}
                options={{
                    title:"Paragon Powers",
                }} />
            <Stack.Screen name="EpicPower"
                component={CompendiumListStack}
                initialParams={{category:'epicdestinypower'}}
                options={{
                    title:"Epic Destiny Powers",
                }} />
             <Stack.Screen name="ThemePower"
                component={CompendiumListStack}
                initialParams={{category:'themepower'}}
                options={{
                    title:"Theme Powers",
                }} />
            <Stack.Screen name="Poison"
                component={CompendiumListStack}
                initialParams={{category:'poison'}}
                options={{
                    
                }} />
            <Stack.Screen name="ParagonPath"
                component={CompendiumListStack}
                initialParams={{category:'paragonpath'}}
                options={{
                    title:"Paragon pathes",
                }} />
            <Stack.Screen name="Item"
                component={CompendiumListStack}
                initialParams={{category:'item'}}
                options={{
                    title:"Items",
                }} />
            <Stack.Screen name="Implement"
                component={CompendiumListStack}
                initialParams={{category:'implement'}}
                options={{
                    title:"Implements",
                }} />
            <Stack.Screen name="Glossary"
                component={CompendiumListStack}
                initialParams={{category:'glossary'}}
                options={{
                    
                }} />
            <Stack.Screen name="Feat"
                component={CompendiumListStack}
                initialParams={{category:'feat'}}
                options={{
                    title:"Feats",
                }} />
            <Stack.Screen name="EpicDestiny"
                component={CompendiumListStack}
                initialParams={{category:'epicdestiny'}}
                options={{
                    title:"Epic Destinies",
                }} />
            <Stack.Screen name="Disease"
                component={CompendiumListStack}
                initialParams={{category:'disease'}}
                options={{
                    title:"Diseases",
                }} />
            <Stack.Screen name="Deity"
                component={CompendiumListStack}
                initialParams={{category:'deity'}}
                options={{
                    title:"Deities",
                }} />
            <Stack.Screen name="Companion"
                component={CompendiumListStack}
                initialParams={{category:'companion'}}
                options={{
                    title:"Companions",
                }} />
            <Stack.Screen name="Class"
                component={CompendiumListStack}
                initialParams={{category:'class'}}
                options={{
                    title:"Classes",
                }} />
            <Stack.Screen name="Background"
                component={CompendiumListStack}
                initialParams={{category:'background'}}
                options={{
                    title:"Backgrounds",
                }} />
            <Stack.Screen name="Armor"
                component={CompendiumListStack}
                initialParams={{category:'armor'}}
                options={{
                    
                }} />
        </Stack.Navigator>
    )
}
