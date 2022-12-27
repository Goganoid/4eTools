import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { IconButton } from 'react-native-paper';
import { GroupsScreen } from '../components/Group/GroupsScreen';
import { saveGroups } from '../data/storage';
import { GroupStackNavigator } from './GroupStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import { Entity, GroupEntity } from './entityTypes';
import { GroupsStackParamList } from './navigatorTypes';



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



export const GroupsStackNavigator = () => {
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
                <Stack.Screen name="GroupsTable" component={GroupsScreen}
                    options={{
                        title: "Groups",
                        headerRight: () => <IconButton icon='plus' />,
                    }} />
                {/* @ts-ignore */}
                <Stack.Screen name="Group" component={GroupStackNavigator}
                    options={{
                        headerShown: false,
                    }} />
            </Stack.Navigator>
        </GroupsContext.Provider>
    )
}
