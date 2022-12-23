import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Compendium } from '../components/Compendium';
import { BestiaryStackNavigator } from './BestiaryStackNavigator';
import { CompendiumListViewer } from '../components/CompendiumListViewer';
import { CompendiumListStack } from './CompendiumListStack';
import { configMainScreenTitle } from '../helpers/configMainScreenTitle';
const Stack = createNativeStackNavigator();

export const CompendiumStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="CompendiumMainPage">
            <Stack.Screen name="CompendiumMainPage"
                component={Compendium}
                options={{
                    title:"Compendium",
                }} />
            <Stack.Screen name="Monster"
                component={CompendiumListStack}
                initialParams={{ category: 'monster' }}
                options={({route})=>{return configMainScreenTitle(route,'Bestiary')}} />
            <Stack.Screen name="Weapons"
                component={CompendiumListStack}
                initialParams={{category:'weapons'}}
                options={({route})=>{return configMainScreenTitle(route,'Weapons')}} />
            <Stack.Screen name="Trap"
                component={CompendiumListStack}
                initialParams={{category:'trap'}}
                options={({route})=>{return configMainScreenTitle(route,'Traps')}} />
            <Stack.Screen name="Theme"
                component={CompendiumListStack}
                initialParams={{category:'theme'}}
                options={({route})=>{return configMainScreenTitle(route,'Themes')}} />
            <Stack.Screen name="Ritual"
                component={CompendiumListStack}
                initialParams={{category:'ritual'}}
                options={({route})=>{return configMainScreenTitle(route,'Rituals')}} />
            <Stack.Screen name="Race"
                component={CompendiumListStack}
                initialParams={{category:'race'}}
                options={({route})=>{return configMainScreenTitle(route,'Races')}} />
            <Stack.Screen name="Power"
                component={CompendiumListStack}
                initialParams={{category:'power'}}
                options={({route})=>{return configMainScreenTitle(route,'Powers')}}/>
            <Stack.Screen name="ParagonPower"
                component={CompendiumListStack}
                initialParams={{category:'paragonpower'}}
                options={({route})=>{return configMainScreenTitle(route,'Paragon Powers')}} />
            <Stack.Screen name="EpicPower"
                component={CompendiumListStack}
                initialParams={{category:'epicdestinypower'}}
                options={({route})=>{return configMainScreenTitle(route,'Epic Destiny Powers')}} />
             <Stack.Screen name="ThemePower"
                component={CompendiumListStack}
                initialParams={{category:'themepower'}}
                options={({route})=>{return configMainScreenTitle(route,'Theme Powers')}} />
            <Stack.Screen name="Poison"
                component={CompendiumListStack}
                initialParams={{category:'poison'}}
                options={({route})=>{return configMainScreenTitle(route,'Poison')}} />
            <Stack.Screen name="ParagonPath"
                component={CompendiumListStack}
                initialParams={{category:'paragonpath'}}
                options={({route})=>{return configMainScreenTitle(route,'Paragon Pathes')}} />
            <Stack.Screen name="Item"
                component={CompendiumListStack}
                initialParams={{category:'item'}}
                options={({route})=>{return configMainScreenTitle(route,'Items')}} />
            <Stack.Screen name="Implement"
                component={CompendiumListStack}
                initialParams={{category:'implement'}}
                options={({route})=>{return configMainScreenTitle(route,'Implements')}} />
            <Stack.Screen name="Glossary"
                component={CompendiumListStack}
                initialParams={{category:'glossary'}}
                options={({route})=>{return configMainScreenTitle(route,'Glossary')}} />
            <Stack.Screen name="Feat"
                component={CompendiumListStack}
                initialParams={{category:'feat'}}
                options={({route})=>{return configMainScreenTitle(route,'Feats')}} />
            <Stack.Screen name="EpicDestiny"
                component={CompendiumListStack}
                initialParams={{category:'epicdestiny'}}
                options={({route})=>{return configMainScreenTitle(route,'Epic Destinies')}} />
            <Stack.Screen name="Disease"
                component={CompendiumListStack}
                initialParams={{category:'disease'}}
                options={({route})=>{return configMainScreenTitle(route,'Diseases')}} />
            <Stack.Screen name="Deity"
                component={CompendiumListStack}
                initialParams={{category:'deity'}}
                options={({route})=>{return configMainScreenTitle(route,'Deities')}} />
            <Stack.Screen name="Companion"
                component={CompendiumListStack}
                initialParams={{category:'companion'}}
                options={({route})=>{return configMainScreenTitle(route,'Companions')}} />
            <Stack.Screen name="Class"
                component={CompendiumListStack}
                initialParams={{category:'class'}}
                options={({route})=>{return configMainScreenTitle(route,'Classes')}}/>
            <Stack.Screen name="Background"
                component={CompendiumListStack}
                initialParams={{category:'background'}}
                options={({route})=>{return configMainScreenTitle(route,'Backgrounds')}} />
            <Stack.Screen name="Armor"
                component={CompendiumListStack}
                initialParams={{category:'armor'}}
                options={({route})=>{return configMainScreenTitle(route,'Armor')}}/>
        </Stack.Navigator>
    )
}
