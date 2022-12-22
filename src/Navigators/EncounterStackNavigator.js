
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { IconButton } from 'react-native-paper';
import { AddEntity } from '../components/AddEntity';
import { Encounter } from '../components/Encounter';
import { EnemyDetails } from '../components/EnemyDetails';
import { MonsterListing } from '../components/MonsterListing';
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
          options={{
            title: "Details",
            headerRight: () => <>
              <IconButton icon="check" />
            </>,
          }} />
        <Stack.Screen
          name="AddCardCustom"
          component={AddEntity}
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
          options={{
            title: 'Add Entity',
            headerRight: () => <>
              <IconButton icon="content-save" />
              <IconButton icon="check" />
            </>,
          }} />
        <Stack.Screen
          name="AddMonster"
          component={MonsterListing}
          options={{
            title: 'Add Monster',
          }} />
      </Stack.Navigator>
  )
}
