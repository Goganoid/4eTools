
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { IconButton } from 'react-native-paper';
import { AddEntity } from '../components/AddEntity';
import { Encounter } from '../components/Encounter';
import { EnemyDetails } from '../components/EnemyDetails';
import { CompendiumListStack } from './CompendiumListStack';
import { configMainScreenTitle } from '../helpers/configMainScreenTitle';
const Stack = createNativeStackNavigator();



export const EncounterStackNavigator = () => {


  return (
    <Stack.Navigator initialRouteName="Encounter">
      <Stack.Screen
        name="Encounter" component={Encounter}
        options={{
          headerLeft: () => <IconButton icon="menu" style={{ padding: 0, margin: 0 }} />,
          headerRight: () => <IconButton icon="dice-d20" />
        }} />
      <Stack.Screen name="Details"
        component={EnemyDetails} />
      <Stack.Screen name="MonsterDetails" component={EnemyDetails}
        initialParams={{ mode: 'encounter' }}
        options={{
          title: "Details",
          headerRight: () => <>
            <IconButton icon="check" />
          </>,
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
          title: 'Add Entity',
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
