import { RouteProp } from '@react-navigation/native';
import { isOnMainScreen } from './isOnMainScreen';

export const configListingTitle = (route:RouteProp<any,any>, title:string) => {
    return {
        title: title,
        headerShown: isOnMainScreen(route, 'Listing')
    };
};
