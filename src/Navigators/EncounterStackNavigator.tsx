
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { IconButton } from 'react-native-paper';
import { AddEntity } from '../components/Encounter/AddEntity';
import { Encounter } from '../components/Encounter/Encounter';
import { CompendiumListStack } from './CompendiumListStack';
import { configMainScreenTitle } from '../helpers/configMainScreenTitle';
import { CompendiumItemDetails } from '../components/Compendium/CompendiumItemDetails';
import { CompendiumCategory, CompendiumCategoryMode } from './CompendiumStackNavigator';


export enum AddCardMode{
  group,
  encounter
}

export type EncounterStackParamList = {
  Encounter: undefined;
  Details: { id: string, category: string };
  ConditionDetails: { id: string, category: string };
  AddCardCustom: { isHeroTab: boolean, mode: AddCardMode };
  AddHero: { isHeroTab: boolean, mode: AddCardMode };
  AddMonster:{category:CompendiumCategory, mode:CompendiumCategoryMode};
};

const Stack = createNativeStackNavigator<EncounterStackParamList>();

export const EncounterStackNavigator = () => {


  return (
    <Stack.Navigator initialRouteName="Encounter">
      <Stack.Screen name="Encounter" component={Encounter}
        options={{
          headerRight: () => <IconButton icon="dice-d20" />
        }} />
      <Stack.Screen name="Details"
        // @ts-ignore
        component={CompendiumItemDetails}
        initialParams={{ category: CompendiumCategory.bestiary }} />
      <Stack.Screen name="ConditionDetails"
         // @ts-ignore
        component={CompendiumItemDetails}
        initialParams={{ category: CompendiumCategory.glossary }}
        options={{
          title: "Condition",
        }} />
      <Stack.Screen
        name="AddCardCustom"
        component={AddEntity}
        initialParams={{ mode: 'encounter' }}
        options={{
          title: 'Add Entity',
          headerRight: () => <>
            <IconButton icon="content-save" />
            <IconButton icon="check" />
          </>,
        }} />
      <Stack.Screen
        name="AddHero"
        component={AddEntity}
        initialParams={{ mode: 'encounter' }}
        options={{
          title: 'Add Hero',
          headerRight: () => <>
            <IconButton icon="content-save" />
            <IconButton icon="check" />
          </>,
        }} />
      <Stack.Screen name="AddMonster"
        // @ts-ignore
        component={CompendiumListStack}
        initialParams={{category:CompendiumCategory.bestiary,mode:CompendiumCategoryMode.encounter}}
        options={({ route }) => { return configMainScreenTitle(route, 'Add Monster') }} />
    </Stack.Navigator>
  )
}
