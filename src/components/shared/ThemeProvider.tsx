import React, { ReactElement } from 'react';
import { useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme, Provider } from 'react-native-paper';


export const CustomThemeProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  return (
    <Provider theme={isDarkMode ? MD3DarkTheme : MD3LightTheme}>{children}</Provider>
  );
};
