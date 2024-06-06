import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Compendium } from '../components/Compendium/Compendium';
import { configListingTitle } from '../helpers/configListingTitle';
import { CompendiumListStack } from './CompendiumListStack';
import { CompendiumListParams } from '../types/navigatorTypes';
import { CategoryMode } from '../types/entityTypes';

const Stack = createNativeStackNavigator<CompendiumListParams>();

export const CompendiumStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="CompendiumMainPage"
      >
      <Stack.Screen
        name="CompendiumMainPage"
        component={Compendium}
        options={{
          title: 'Compendium',
        }}
      />
      <Stack.Screen
        name="CompendiumList"
        component={CompendiumListStack}
        initialParams={{ mode: CategoryMode.compendium }}
        options={({ route }) => {
          return configListingTitle(route, 'Listing');
        }}
      />
    </Stack.Navigator>
  );
};
