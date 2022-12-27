import React, { ReactElement } from 'react'
import { Text } from 'react-native';
import { Entity, GroupEntity } from '../types/entityTypes';
import { GroupsContext } from '../Navigators/GroupsStack';

interface GroupContextSetters {
    setEncounterId: (newId: string) => void,
    setEncounterName: (newName: string) => void,
    setEntities: (entities: Array<Entity>) => void,
    addEntity: (entity: Entity) => void,
    removeEntity: (entityId: string) => void,
    removeGroup: () => void,
}

export type GroupContextType = null | GroupEntity & GroupContextSetters

export const GroupContext = React.createContext<GroupContextType>(null);

export const GroupContextProvider = ({ groupId, children }: { groupId: string, children: ReactElement }) => {
    const groupsContext = React.useContext(GroupsContext);

    if (groupsContext == null)
        throw "Group context is null";

    const encounter = groupsContext.groups.find(group => group.id == groupId);

    if (encounter == undefined)
        throw `Group with id:${groupId} not found!`;

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
        <GroupContext.Provider value={{ ...encounter, ...encounterContextSetters }}>
            {children}
        </GroupContext.Provider>
    )
}
