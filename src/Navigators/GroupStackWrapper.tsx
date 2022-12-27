import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { GroupContextProvider } from '../context/GroupContext';
import { GroupsStackParamList } from '../types/navigatorTypes';
import { EncounterStack } from './EncounterStack';

export const GroupStackWrapper = ({ navigation, route }: NativeStackScreenProps<GroupsStackParamList, 'Group'>) => {
    const { groupId } = route.params;
    return (
        <GroupContextProvider groupId={groupId}>
          <EncounterStack route={route}/>
        </GroupContextProvider>
    )
}
