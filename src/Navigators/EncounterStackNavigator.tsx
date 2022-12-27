
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { IconButton } from 'react-native-paper';
import { AddEntity } from '../components/Encounter/AddEntity';
import { Encounter } from '../components/Encounter/Encounter';
import { CompendiumListStack } from './CompendiumListStack';
import { configMainScreenTitle } from '../helpers/configMainScreenTitle';
import { CompendiumItemDetails } from '../components/Compendium/CompendiumItemDetails';
import { CompendiumCategory, CompendiumCategoryMode } from './entityTypes';
import { EntityMode, EncounterStackParamList, MainDrawerParamList, GroupStackParamList, GroupsStackParamList } from './navigatorTypes';
import { CustomEntityDetails } from '../components/Encounter/CustomEntityDetails';
import { RouteProp } from '@react-navigation/native';






const Stack = createNativeStackNavigator<EncounterStackParamList>();

export const EncounterStackNavigator = ({ route }:
  { route: RouteProp<GroupsStackParamList, 'Group'> | RouteProp<MainDrawerParamList,'EncounterStack'> }

) => {
  console.log("WHY")
  if(route.params===undefined) throw "No route passed to EncounterStackNavigator"
  const mode = route.params.mode;
  const groupId = route.params.groupId;
  const compendiumAddMode = mode == EntityMode.encounter ? CompendiumCategoryMode.encounter : CompendiumCategoryMode.group;
  return (
    <Stack.Navigator initialRouteName="Encounter">
      <Stack.Screen name="Encounter" component={Encounter}
        initialParams={{mode,groupId}}
        options={{
          headerRight: () => <IconButton icon="dice-d20" />
        }} />
      <Stack.Group screenOptions={{presentation:'containedTransparentModal',headerShown:false}}>
        <Stack.Screen name="CustomEntityDetails"
          // @ts-ignore
          component={CustomEntityDetails} />
        <Stack.Screen name="Details"
          // @ts-ignore
          component={CompendiumItemDetails}
           />
        <Stack.Screen name="ConditionDetails"
          // @ts-ignore
          component={CompendiumItemDetails}
          options={{
            title: "Condition",
          }} />
      </Stack.Group>
      <Stack.Screen
        name="AddCardCustom"
        component={AddEntity}
        initialParams={{mode:mode}}
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
        initialParams={{mode:mode}}
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
        initialParams={{mode:compendiumAddMode}}
        options={({ route }) => { return configMainScreenTitle(route, 'Add Monster') }} />
    </Stack.Navigator>
  )
}
