
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { IconButton } from 'react-native-paper';
// import { EncounterContext } from '../Navigators/EncounterStackNavigator';
import { EncounterContext } from '../App';
import { AddEntity } from '../components/AddEntity';
import { Encounter } from '../components/Encounter';
import { EnemyDetails } from '../components/EnemyDetails';
import { MonsterListing } from '../components/MonsterListing';
import { sortByInitiative } from '../components/sortByInitiative';
import { saveCurrentEncounter } from '../data/storage';
const Stack = createNativeStackNavigator();

// export const EncounterContext = React.createContext(null);


export const EncounterStackNavigator = () => {
  


  // const initialContextState = {
  //   id: null,
  //   name: null,
  //   entities: null,
  // }

  // const [encounter, setEncounter] = React.useState(initialContextState);
  // const setEncounterAndSave = (newEncounter) => {
  //   console.log("Setting encounter and saving")
  //   saveCurrentEncounter(newEncounter);
  //   setEncounter(newEncounter);
  // }
  // const setEncounterId = (newId) => setEncounter({ ...encounter, id: newId });
  // const setEncounterName = (newName) => setEncounter({ ...encounter, name: newName });
  // const setEntities = (entities) => setEncounterAndSave({ ...encounter, entities: sortByInitiative(entities) });
  // const addEntity = (entity) => setEncounterAndSave({
  //   ...encounter,
  //   entities: sortByInitiative([...encounter.entities, entity])
  // });
  // const removeEntity = (entityId) => setEncounterAndSave({
  //   ...encounter,
  //   entities: encounter.entities.filter(entity => entity.uuid != entityId)
  // });

  // const encounterContextSetters = {
  //   setEncounterId,
  //   setEncounterName,
  //   setEntities,
  //   addEntity,
  //   removeEntity,
  // }

  return (
      // <EncounterContext.Provider value={{ ...encounter, ...encounterContextSetters}} >
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
      // </EncounterContext.Provider >
  )
}
