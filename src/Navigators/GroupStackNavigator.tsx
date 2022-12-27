import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text } from 'react-native-paper';
import { EncounterStackNavigator } from './EncounterStackNavigator';
import { Entity, GroupEntity } from './entityTypes';
import { GroupsContext } from './GroupsStackNavigator';
import { GroupsStackParamList, GroupStackParamList } from './navigatorTypes';

const Stack = createNativeStackNavigator<GroupStackParamList>();
interface GroupContextSetters {
    setEncounterId: (newId: string) => void,
    setEncounterName: (newName: string) => void,
    setEntities: (entities: Array<Entity>) => void,
    addEntity: (entity: Entity) => void,
    removeEntity: (entityId: string) => void,
    removeGroup: ()=>void,
}

export type GroupContextType = null | GroupEntity & GroupContextSetters

export const GroupContext = React.createContext<GroupContextType>(null);

export const GroupStackNavigator = ({ navigation, route }: NativeStackScreenProps<GroupsStackParamList, 'Group'>) => {
    const groupsContext = React.useContext(GroupsContext);

    if (groupsContext == null) {
        console.log("Group context is null");
        return;
    }
    const { groupId } = route.params;

    const encounter = groupsContext.groups.find(group => group.id == groupId);

    if (encounter == undefined)
        return (<Text>Group with id:{groupId} not found!</Text>)

    const setEncounterId = (newId: string) => groupsContext.updateGroup({ ...encounter, id: newId });
    const setEncounterName = (newName: string) => groupsContext.updateGroup({ ...encounter, name: newName });
    const addEntity = (entity: Entity) => groupsContext.updateGroup({
        ...encounter,
        entities: ([...encounter.entities, entity])
    });
    const removeEntity = (entityId: string) => groupsContext.updateGroup({
        ...encounter,
        entities: encounter.entities.filter(entity => entity.uuid != entityId)
    });
    const setEntities = (entities: Array<Entity>) => groupsContext.updateGroup({ ...encounter, entities })
    const removeGroup = () => {
        groupsContext.removeGroup(encounter);
    }
    const encounterContextSetters = {
        setEncounterId,
        setEncounterName,
        setEntities,
        addEntity,
        removeEntity,
        removeGroup
    }

    return (
        <GroupContext.Provider value={{ ...encounter, ...encounterContextSetters }} >
          <EncounterStackNavigator route={route}/>
        </GroupContext.Provider>
    )
}
