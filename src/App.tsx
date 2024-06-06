import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import { CustomThemeProvider } from './components/shared/ThemeProvider';
import MainDrawer from './Navigators/MainDrawer';
import { useTheme } from 'react-native-paper';

export default function Main() {
  return (
    <CustomThemeProvider>
      {(() => {
        const theme = useTheme();
        return (
          <>
            <MainDrawer />
            <FlashMessage
              position={'bottom'}
              textStyle={{ color: theme.colors.onSurface }}
            />
          </>
        );
      })()}
    </CustomThemeProvider>
  );
}
