
import { createDrawerNavigator } from '@react-navigation/drawer';
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import { useTheme } from 'react-native-paper';
import { CustomThemeProvider } from '../components/shared/ThemeProvider';
import { saveCurrentEncounter } from '../data/storage';
import { isOnMainScreen } from '../helpers/isOnMainScreen';
import { sortByInitiative } from '../helpers/sortByInitiative';
import { CompendiumStackNavigator } from './CompendiumStackNavigator';
import { EncounterStackNavigator } from './EncounterStackNavigator';
import { GroupsStackNavigator } from './GroupsStackNavigator';
import { PowerTrackerStack } from './PowerTrackerStack';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export const EncounterContext = React.createContext(null);

export default function MainDrawer() {
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
      <EncounterContext.Provider value={{ ...encounter, ...encounterContextSetters }} >
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="EncounterStack" screenOptions={{
            drawerActiveBackgroundColor: theme.colors.primaryContainer,
            headerMode:"float",
          }}>
            <Drawer.Screen name="EncounterStack" component={EncounterStackNavigator}
              options={({ route }) => {
                const routeName = getFocusedRouteNameFromRoute(route) ?? 'Encounter';
                const swipeEnabled = routeName == "Encounter";
                return {
                  title: "Encounter",
                  headerShown: false,
                  headerStyle: {
                    height: 1,
                  },
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
            <Drawer.Screen name="Tracker" component={PowerTrackerStack}
              options={({route}) => {
                return {
                  title: "Power Tracker",
                  headerShown: false,
                  swipeEnabled: isOnMainScreen(route, 'PowerTracker')
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
