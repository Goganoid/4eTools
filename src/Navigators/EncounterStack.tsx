
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { IconButton } from 'react-native-paper';
import { AddEntity } from '../components/Encounter/AddEntity';
import { Encounter } from '../components/Encounter/Encounter';
import { CompendiumListStack } from './CompendiumListStack';
import { configListingTitle } from '../helpers/configListingTitle';
import { CompendiumItemDetails } from '../components/Compendium/CompendiumItemDetails';
import { Category, CategoryMode } from '../types/entityTypes';
import { EncounterMode, EncounterStackParamList, MainDrawerParamList, GroupStackParamList, GroupsStackParamList } from '../types/navigatorTypes';
import { CustomEntityDetails } from '../components/Encounter/CustomEntityDetails';
import { RouteProp } from '@react-navigation/native';


const Stack = createNativeStackNavigator<EncounterStackParamList>();

export const EncounterStack = ({ route }:
  { route: RouteProp<GroupsStackParamList, 'Group'> | RouteProp<MainDrawerParamList, 'EncounterStack'> }

) => {
  if (route.params === undefined) throw "No route passed to EncounterStackNavigator"
  const { mode, groupId } = route.params;
  const compendiumAddMode = mode == EncounterMode.encounter ? CategoryMode.encounter : CategoryMode.group;
  return (
    <Stack.Navigator initialRouteName="Encounter">
      <Stack.Screen name="Encounter" component={Encounter}
        initialParams={{ mode, groupId }}
        options={{
          title: mode==EncounterMode.encounter ? "Encounter" : "Group"
        }} />
      <Stack.Group screenOptions={{ presentation: 'containedTransparentModal', headerShown: false }}>
        <Stack.Screen name="CustomEntityDetails"
          // @ts-ignore
          component={CustomEntityDetails} />
        <Stack.Screen name="Details"
          // @ts-ignore
          component={CompendiumItemDetails}
          initialParams={{ mode: CategoryMode.modal, category: Category.bestiary }}
        />
        <Stack.Screen name="ConditionDetails"
          // @ts-ignore
          component={CompendiumItemDetails}
          initialParams={{ mode: CategoryMode.modal, category: Category.glossary }} />
      </Stack.Group>
      <Stack.Screen
        name="AddCardCustom"
        component={AddEntity}
        initialParams={{ mode: mode }}
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
        initialParams={{ mode: mode }}
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
        initialParams={{ mode: compendiumAddMode, category: Category.bestiary }}
        options={({ route }) => { return configListingTitle(route, 'Add Monster') }} />
    </Stack.Navigator>
  )
}
