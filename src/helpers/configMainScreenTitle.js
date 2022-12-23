import { isOnMainScreen } from '../helpers/isOnMainScreen';

export const configMainScreenTitle = (route, title) => {
    return {
        title: title,
        headerShown: isOnMainScreen(route, 'Listing')
    };
};
