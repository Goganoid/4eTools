import { createDrawerNavigator } from '@react-navigation/drawer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { CompendiumCategoryParams } from '../../types/navigatorTypes';
import { CompendiumListContent } from './CompendiumListContent';
import { CompendiumListContextProvider } from './CompendiumListContext';
import { CompendiumListSidebar } from './CompendiumListSidebar';
var clone = require('clone');

const Drawer = createDrawerNavigator();

export const CompendiumListViewerInner = () => {
  return (
    <>
      <Drawer.Navigator
        drawerContent={CompendiumListSidebar}
        screenOptions={{
          drawerPosition: 'right',
          headerShown: false,
          swipeEnabled: false,
        }}>
        <Drawer.Screen
          name="ListingContent"
          component={CompendiumListContent}
        />
      </Drawer.Navigator>
    </>
  );
};

export const CompendiumListViewer = ({
  navigation,
  route,
}: NativeStackScreenProps<CompendiumCategoryParams, 'Listing'>) => {
  return (
    <CompendiumListContextProvider
      navigation={navigation}
      route={route}
      category={route.params.category as any}>
      <CompendiumListViewerInner />
    </CompendiumListContextProvider>
  );
};
