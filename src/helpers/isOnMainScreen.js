import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

export const isOnMainScreen = (route, mainScreenName) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  return routeName == null || routeName == mainScreenName;
};
