
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { IconButton } from 'react-native-paper';
import { AddEntity } from '../components/Encounter/AddEntity';
import { Encounter } from '../components/Encounter/Encounter';
import { EnemyDetails } from '../components/Encounter/EnemyDetails';
import { CompendiumListStack } from './CompendiumListStack';
import { configMainScreenTitle } from '../helpers/configMainScreenTitle';
import { CompendiumItemDetails } from '../components/Compendium/CompendiumItemDetails';
const Stack = createNativeStackNavigator();



export const EncounterStackNavigator = () => {


  return (
    <Stack.Navigator initialRouteName="Encounter">
      <Stack.Screen
        name="Encounter" component={Encounter}
        options={{
          headerRight: () => <IconButton icon="dice-d20" />
        }} />
      <Stack.Screen name="Details"
        component={CompendiumItemDetails}
        initialParams={{ category: "monster" }} />
      <Stack.Screen name="ConditionDetails"
        component={CompendiumItemDetails}
        initialParams={{ category: "glossary" }}
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
        component={CompendiumListStack}
        initialParams={{ category: 'monster', mode:'encounter' }}
        options={({ route }) => { return configMainScreenTitle(route, 'Add Monster') }} />
    </Stack.Navigator>
  )
}
