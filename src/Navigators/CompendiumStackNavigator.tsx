import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Compendium } from '../components/Compendium/Compendium';
import { configMainScreenTitle } from '../helpers/configMainScreenTitle';
import { CompendiumListStack } from './CompendiumListStack';


export enum CompendiumCategory {
    bestiary,
    weapons,
    trap,
    theme,
    ritual,
    race,
    power,
    paragonpower,
    epicdestinypower,
    themepower,
    poison,
    paragonpath,
    item,
    implement,
    glossary,
    feat,
    epicdestiny,
    disease,
    deity,
    campaign,
    class,
    companion,
    background,
    armor
}
export enum CompendiumCategoryMode{
    encounter,
    group,
    power,
    compendium
}


export type CompendiumListParams = {
    CompendiumMainPage: undefined,
    CompendiumList: {category:CompendiumCategory, mode:CompendiumCategoryMode},
};

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
