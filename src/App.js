
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
import { IconButton } from 'react-native-paper';
import { sortByInitiative } from './components/sortByInitiative';
import { saveCurrentEncounter } from './data/storage';
import { Compendium } from './components/Compendium';
import { CompendiumStackNavigator } from './Navigators/CompendiumStackNavigator';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export const EncounterContext = React.createContext(null);

export default function Main() {
  const { width } = useWindowDimensions();
  const isOnMainScreen = (route, mainScreenName) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    return routeName == null || routeName == mainScreenName
  }

  const initialContextState = {
    id: null,
    name: null,
    entities: null,
  }

  const [encounter, setEncounter] = React.useState(initialContextState);
  const setEncounterAndSave = (newEncounter) => {
    console.log("Setting encounter and saving")
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
      <EncounterContext.Provider value={{ ...encounter, ...encounterContextSetters }} >
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="EncounterStack">
            <Drawer.Screen name="EncounterStack" component={EncounterStackNavigator}
              options={({ route }) => {
                const routeName = getFocusedRouteNameFromRoute(route) ?? 'Encounter';
                const swipeEnabled = routeName == "Encounter";
                return {
                  title: "Encounter",
                  headerShown: false,
                  swipeEnabled: isOnMainScreen(route, 'Encounter')
                }
              }}
            />
            <Drawer.Screen name="Groups" component={GroupsStackNavigator}
              options={({ route }) => {
                return {
                  headerShown: false,
                  swipeEnabled: isOnMainScreen(route, 'GroupsTable')
                }
              }}
            />
            <Drawer.Screen name="Compendium" component={CompendiumStackNavigator}
              options={({ route }) => {
                return {
                  headerShown: false,
                  swipeEnabled: isOnMainScreen(route, 'CompendiumMainPage')
                }
              }}
            />

          </Drawer.Navigator>
        </NavigationContainer>
      </EncounterContext.Provider >

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
