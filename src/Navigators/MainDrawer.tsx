
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
import { EncounterStack } from './EncounterStack';
import { EncounterStackNavigator } from './EncounterStackNavigator';
import { Entity, Encounter, Loading } from './entityTypes';
import { GroupsStackNavigator } from './GroupsStackNavigator';
import { EntityMode, MainDrawerParamList } from './navigatorTypes';
import { PowerTrackerStack } from './PowerTrackerStack';

export interface EncounterContextSetters{
  setEncounter:(encounter:Encounter)=>void,
  setEncounterId:(newId:string)=>void,
  setEncounterName:(newName:string)=>void,
  setEntities:(entities:Array<Entity>)=>void,
  addEntity:(entity:Entity)=>void,
  addEntities:(entities:Array<Entity>)=>void,
  removeEntity:(entityId: string)=>void,
}


const Drawer = createDrawerNavigator<MainDrawerParamList>();

export const EncounterContext = React.createContext<null | Encounter & EncounterContextSetters & Loading>(null);



export default function MainDrawer() {
  const { width } = useWindowDimensions();
  const theme = useTheme();
  const initialContextState: Encounter = {
    entities: [],
    loading:true
  }
  const [encounter, setEncounter] = React.useState<Encounter>(initialContextState);
  const setEncounterAndSave = (newEncounter:Encounter) => {
    console.log("Setting encounter and saving ",newEncounter)
    saveCurrentEncounter(newEncounter);
    setEncounter(newEncounter);
  }
  const setLoading = (loading:boolean) => setEncounter({...encounter,loading:loading})
  const setEncounterId = (newId:string) => setEncounter({ ...encounter, id: newId });
  const setEncounterName = (newName:string) => setEncounter({ ...encounter, name: newName });
  const setEntities = (entities:Array<Entity>) => setEncounterAndSave({ ...encounter, entities: sortByInitiative(entities) });
  const addEntity = (entity:Entity) => setEncounterAndSave({
    ...encounter,
    entities: sortByInitiative([...encounter.entities, entity])
  });
  const addEntities = (entities:Array<Entity>) => setEncounterAndSave({
    ...encounter,
    entities: sortByInitiative([...encounter.entities, ...entities])
  });
  const removeEntity = (entityId: string) => setEncounterAndSave({
    ...encounter,
    entities: encounter.entities.filter(entity => entity.uuid != entityId)
  });

  const encounterContextSetters = {
    setEncounter,
    setEncounterId,
    setEncounterName,
    setEntities,
    addEntity,
    addEntities,
    removeEntity,
  }

  
  return (
    <CustomThemeProvider>
      <EncounterContext.Provider value={{ ...encounter, ...encounterContextSetters,setLoading }} >
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="EncounterStack" screenOptions={{
            drawerActiveBackgroundColor: theme.colors.primaryContainer,
          }}>
            <Drawer.Screen name="EncounterStack" component={EncounterStack}
              initialParams={{mode:EntityMode.encounter}}
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
