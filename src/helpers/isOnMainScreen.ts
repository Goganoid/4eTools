import { getFocusedRouteNameFromRoute, RouteProp } from '@react-navigation/native';

export const isOnMainScreen = (route:RouteProp<any,any>, mainScreenName:string) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  return routeName == null || routeName == mainScreenName;
};
