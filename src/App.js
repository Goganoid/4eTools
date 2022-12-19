
import { createDrawerNavigator } from '@react-navigation/drawer';
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import { CustomThemeProvider } from './components/ThemeProvider';
import { BestiaryStackNavigator } from './Navigators/BestiaryStackNavigator';
import { EncounterStackNavigator } from './Navigators/EncounterStackNavigator';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
export default function Main() {
  const { width } = useWindowDimensions();
  const isOnMainScreen = (route, mainScreenName) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    console.log("Route name ", routeName);
    return routeName==null || routeName==mainScreenName
  }
  return (
    <CustomThemeProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="EncounterStack">
          <Drawer.Screen name="EncounterStack" component={EncounterStackNavigator}
            options={({ route }) => {
              const routeName = getFocusedRouteNameFromRoute(route) ?? 'Encounter';
              const swipeEnabled = routeName == "Encounter";
              return {
                title: "Encounter",
                headerShown: false,
                swipeEnabled: isOnMainScreen(route,'Encounter')
              }
            }}
          />
          <Drawer.Screen name="Bestiary" component={BestiaryStackNavigator}
            options={({ route }) => {
              return {
                headerShown: false,
                swipeEnabled: isOnMainScreen(route,'MonsterListing')
              }
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>


    </CustomThemeProvider>
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
