import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import { CustomThemeProvider } from './components/shared/ThemeProvider';
import MainDrawer from './Navigators/MainDrawer';

export default function Main() {
  return (
    <CustomThemeProvider>
      <MainDrawer />
      <FlashMessage position={'bottom'} />
    </CustomThemeProvider >
  );
}