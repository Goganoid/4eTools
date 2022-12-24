
import { createDrawerNavigator } from '@react-navigation/drawer';
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import { GroupsScreen } from './components/GroupsScreen';
import { CustomThemeProvider } from './components/ThemeProvider';
import { BestiaryStackNavigator } from './Navigators/BestiaryStackNavigator';
import { EncounterStackNavigator } from './Navigators/EncounterStackNavigator';
import { GroupsStackNavigator } from './Navigators/GroupsStackNavigator';
import { IconButton, useTheme } from 'react-native-paper';
import { sortByInitiative } from './helpers/sortByInitiative';
import { saveCurrentEncounter } from './data/storage';
import { Compendium } from './components/Compendium/Compendium';
import { CompendiumStackNavigator } from './Navigators/CompendiumStackNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isOnMainScreen } from './helpers/isOnMainScreen';
import PowerTracker from './components/PlayerSheet/PowerTracker';
import { PowerTrackerStack } from './Navigators/PowerTrackerStack';
import MainDrawer from './Navigators/MainDrawer';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// export const EncounterContext = React.createContext(null);

export default function Main() {
  // AsyncStorage.clear();
  const { width } = useWindowDimensions();
  const theme = useTheme();
  const initialContextState = {
    id: null,
    name: null,
    entities: null,
  }

  const [encounter, setEncounter] = React.useState(initialContextState);
  const setEncounterAndSave = (newEncounter) => {
    console.log("Setting encounter and saving ")
    saveCurrentEncounter(newEncounter);
    setEncounter(newEncounter);
  }
  const setEncounterId = (newId) => setEncounter({ ...encounter, id: newId });
  const setEncounterName = (newName) => setEncounter({ ...encounter, name: newName });
  const setEntities = (entities) => setEncounterAndSave({ ...encounter, entities: sortByInitiative(entities) });
  const addEntity = (entity) => setEncounterAndSave({
    ...encounter,
    entities: sortByInitiative([...encounter.entities, entity])
  });
  const addEntities = (entities) => setEncounterAndSave({
    ...encounter,
    entities: sortByInitiative([...encounter.entities, ...entities])
  });
  const removeEntity = (entityId) => setEncounterAndSave({
    ...encounter,
    entities: encounter.entities.filter(entity => entity.uuid != entityId)
  });

  const encounterContextSetters = {
    setEncounterId,
    setEncounterName,
    setEntities,
    addEntity,
    addEntities,
    removeEntity,
  }

  return (
    <CustomThemeProvider>
     <MainDrawer/>
    </CustomThemeProvider >
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    width: 200,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
