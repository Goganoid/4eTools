import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { IconButton, Text } from 'react-native-paper';
import { AddEntity } from '../components/Encounter/AddEntity';
import { configMainScreenTitle } from '../helpers/configMainScreenTitle';
import { CompendiumListStack } from './CompendiumListStack';
import { Group } from '../components/Group/Group';
import { CompendiumItemDetails } from '../components/Compendium/CompendiumItemDetails';
import { CompendiumCategory, CompendiumCategoryMode, Entity, GroupEntity } from './entityTypes';
import { EntityMode, GroupsStackParamList, GroupStackParamList } from './navigatorTypes';
import { GroupsContext } from './GroupsStackNavigator';





const Stack = createNativeStackNavigator<GroupStackParamList>();




interface GroupContextSetters {
    setEncounterId: (newId: string) => void,
    setEncounterName: (newName: string) => void,
    setEntities: (entities: Array<Entity>) => void,
    addEntity: (entity: Entity) => void,
    removeEntity: (entityId: string) => void,
}

export const GroupContext = React.createContext<null | GroupEntity & GroupContextSetters>(null);

export const GroupStackNavigator = ({ navigation, route }: NativeStackScreenProps<GroupsStackParamList, 'Group'>) => {
    const groupsContext = React.useContext(GroupsContext);

    if (groupsContext == null) {
        console.log("Group context is null");
        return;
    }
    const { id } = route.params;

    const encounter = groupsContext.groups.find(group => group.id == id);

    if (encounter == undefined)
        return (<Text>Group with id:{id} not found!</Text>)

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

    const encounterContextSetters = {
        setEncounterId,
        setEncounterName,
        setEntities,
        addEntity,
        removeEntity,
    }

    return (
        <GroupContext.Provider value={{ ...encounter, ...encounterContextSetters }} >
            <Stack.Navigator initialRouteName="EntitiesList">
                <Stack.Screen name="EntitiesList"
                    // @ts-ignore
                    component={Group}
                    initialParams={{ groupId: id }}
                    options={{
                        title: "Group"
                    }} />
                <Stack.Screen name="Details"
                    // @ts-ignore
                    component={CompendiumItemDetails}
                    initialParams={{ category: CompendiumCategory.bestiary }} />
                <Stack.Screen name="ConditionDetails"
                    // @ts-ignore
                    component={CompendiumItemDetails}
                    initialParams={{ category: CompendiumCategory.glossary }}
                    options={{
                        title: "Condition",
                    }} />
                <Stack.Screen name="AddMonster"
                    // @ts-ignore
                    component={CompendiumListStack}
                    initialParams={{ category: CompendiumCategory.bestiary, mode: CompendiumCategoryMode.group }}
                    options={({ route }) => { return configMainScreenTitle(route, 'Add Monster') }} />
                <Stack.Screen
                    name="AddCardCustom"
                     // @ts-ignore
                    component={AddEntity}
                    initialParams={{ mode: EntityMode.group }}
                    options={{
                        title: 'Add Entity',
                        headerRight: () => <>
                            <IconButton icon="content-save" />
                            <IconButton icon="check" />
                        </>,
                    }} />
                <Stack.Screen
                    name="AddHero"
                     // @ts-ignore
                    component={AddEntity}
                    initialParams={{ mode:EntityMode.group }}
                    options={{
                        title: 'Add Hero',
                        headerRight: () => <>
                            <IconButton icon="content-save" />
                            <IconButton icon="check" />
                        </>,
                    }} />
            </Stack.Navigator>
        </GroupContext.Provider>
    )
}
