import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { IconButton } from 'react-native-paper';
import { GroupsScreen } from '../components/Group/GroupsScreen';
import { saveGroups } from '../data/storage';
import { GroupStackNavigator } from './GroupStackNavigator';
const Stack = createNativeStackNavigator();


export const GroupsContext = React.createContext(null);

export const GroupsStackNavigator = () => {
    const initialState = []
    const [groups, setGroups] = React.useState(initialState);

    const setGroupsAndSave = (groups) => {
        saveGroups(groups);
        setGroups(groups);
    } 
    const addGroup = (group) => { setGroupsAndSave([...groups, group])}
    const removeGroup = (groupToRemove) => setGroupsAndSave(groups.filter(group => group.id != groupToRemove.id));
    const updateGroup = (updatedGroup) => {
       
        setGroupsAndSave(groups.map(group => {
        if (group.id == updatedGroup.id)
            return updatedGroup;
        return group;
        }))
    }
    console.log("Groups ", groups)
    return (
        <GroupsContext.Provider value={{ groups, addGroup, removeGroup,updateGroup,setGroups }}>
            <Stack.Navigator initialRouteName="GroupsTable">
                <Stack.Screen name="GroupsTable" component={GroupsScreen}
                    options={{
                        title:"Groups",
                        headerRight: () => <IconButton icon='plus' />,
                    }} />
                <Stack.Screen name="Group" component={GroupStackNavigator}
                    options={{
                        headerShown:false,
                    }} />
            </Stack.Navigator>
        </GroupsContext.Provider>
    )
}
