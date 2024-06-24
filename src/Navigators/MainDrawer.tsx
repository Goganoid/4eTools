import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import * as React from 'react';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import { useTheme } from 'react-native-paper';
import { About } from '../components/About/About';
import { CustomThemeProvider } from '../components/shared/ThemeProvider';
import { EncounterContextProvider } from '../context/EncounterContext';
import { isOnMainScreen } from '../helpers/isOnMainScreen';
import { EncounterMode, MainDrawerParamList } from '../types/navigatorTypes';
import { CompendiumStack } from './CompendiumStack';
import { EncounterStackWrapper } from './EncounterStackWrapper';
import { GroupsStack } from './GroupsStack';
import { PowerTrackerStack } from './PowerTrackerStack';

const Drawer = createDrawerNavigator<MainDrawerParamList>();

export default function MainDrawer() {
  const theme = useTheme();
  return (
    <CustomThemeProvider>
      <EncounterContextProvider>
        <NavigationContainer
          theme={{
            colors: {
              background: theme.colors.background,
              text: theme.colors.onSurface,
              primary: theme.colors.primary,
              border: theme.colors.outline,
              card: theme.colors.surface,
              notification: theme.colors.tertiary,
            },
            dark: theme.dark,
          }}
          >
          <Drawer.Navigator
            initialRouteName="Compendium"
            screenOptions={{
              drawerActiveBackgroundColor: theme.colors.primaryContainer,
              drawerLabelStyle: {color: theme.colors.onSurface}
            }}>
            <Drawer.Screen
              name="EncounterStack"
              component={EncounterStackWrapper}
              initialParams={{ mode: EncounterMode.encounter }}
              options={({ route }) => {
                const routeName =
                  getFocusedRouteNameFromRoute(route) ?? 'Encounter';
                return {
                  title: 'Encounter',
                  headerShown: false,
                  swipeEnabled: isOnMainScreen(route, 'Encounter'),
                };
              }}
            />
            <Drawer.Screen
              name="Groups"
              component={GroupsStack}
              options={({ route }) => {
                return {
                  headerShown: false,
                  swipeEnabled: isOnMainScreen(route, 'GroupsTable'),
                };
              }}
            />
            <Drawer.Screen
              name="Compendium"
              component={CompendiumStack}
              options={({ route }) => {
                return {
                  headerShown: false,
                  swipeEnabled: isOnMainScreen(route, 'CompendiumMainPage'),
                };
              }}
            />
            <Drawer.Screen
              name="Tracker"
              component={PowerTrackerStack}
              options={({ route }) => {
                return {
                  title: 'Power Tracker',
                  headerShown: false,
                  swipeEnabled: isOnMainScreen(route, 'PowerTracker'),
                };
              }}
            />
            <Drawer.Screen name="About" component={About} />
          </Drawer.Navigator>
        </NavigationContainer>
      </EncounterContextProvider>
    </CustomThemeProvider>
  );
}
