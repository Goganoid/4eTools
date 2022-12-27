import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { IconButton } from 'react-native-paper';
import { Groups } from '../components/Group/Groups';
import { saveGroups } from '../data/storage';
import { GroupStackWrapper } from './GroupStackWrapper';
import { StackScreenProps } from '@react-navigation/stack';
import { Entity, GroupEntity } from '../types/entityTypes';
import { GroupsStackParamList } from '../types/navigatorTypes';



const Stack = createNativeStackNavigator<GroupsStackParamList>();

type Groups = Array<GroupEntity>;
export interface GroupsContextProps {
    groups: Groups,
    addGroup: (group: GroupEntity) => void,
    removeGroup: (group: GroupEntity) => void,
    updateGroup: (group: GroupEntity) => void,
    setGroups: (groups: Groups) => void
}

export const GroupsContext = React.createContext<null | GroupsContextProps>(null);



export const GroupsStack = () => {
    const initialState: Groups = []
    const [groups, setGroups] = React.useState<Groups>(initialState);

    const setGroupsAndSave = (groups: Groups) => {
        saveGroups(groups);
        setGroups(groups);
    }
    const addGroup = (group: GroupEntity) => { setGroupsAndSave([...groups, group]) }
    const removeGroup = (groupToRemove: GroupEntity) => setGroupsAndSave(groups.filter(group => group.id != groupToRemove.id));
    const updateGroup = (updatedGroup: GroupEntity) => {

        setGroupsAndSave(groups.map(group => {
            if (group.id == updatedGroup.id)
                return updatedGroup;
            return group;
        }))
    }
    return (
        <GroupsContext.Provider value={{ groups, addGroup, removeGroup, updateGroup, setGroups }}>
            <Stack.Navigator initialRouteName="GroupsTable">
                {/* @ts-ignore */}
                <Stack.Screen name="GroupsTable" component={Groups}
                    options={{
                        title: "Groups",
                        headerRight: () => <IconButton icon='plus' />,
                    }} />
                {/* @ts-ignore */}
                <Stack.Screen name="Group" component={GroupStackWrapper}
                    options={{
                        headerShown: false,
                    }} />
            </Stack.Navigator>
        </GroupsContext.Provider>
    )
}
