import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { IconButton } from 'react-native-paper';
import { AddEntity } from '../components/AddEntity';
import { Encounter } from '../components/Encounter';
import { EnemyDetails } from '../components/EnemyDetails';
import { Group } from '../components/Group';
import { GroupsScreen } from '../components/GroupsScreen';
import { MonsterListing } from '../components/MonsterListing';
import { GroupsContext } from './GroupsStackNavigator';

const Stack = createNativeStackNavigator();


export const GroupContext = React.createContext(null);

export const GroupStackNavigator = ({ navigation, route }) => {
    const groupsContext = React.useContext(GroupsContext);
    const { id } = route.params;


    // const initialContextState = {
    //     id: null,
    //     name: null,
    //     entities: null,
    //   }

    // const [encounter, setEncounter] = useState(initialContextState);
    console.log("Groups context ", groupsContext);
    const encounter = groupsContext.groups.find(group => group.id == id);

    const setEncounterId = (newId) => groupsContext.updateGroup({ ...encounter, id: newId });
    const setEncounterName = (newName) => groupsContext.updateGroup({ ...encounter, name: newName });
    const addEntity = (entity) => groupsContext.updateGroup({
        ...encounter,
        entities: ([...encounter.entities, entity])
    });
    const removeEntity = (entityId) => groupsContext.updateGroup({
        ...encounter,
        entities: encounter.entities.filter(entity => entity.uuid != entityId)
    });
    const setEntities = (entities) => groupsContext.updateGroup({ ...encounter, entities })

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
                    component={Group}
                    initialParams={{ groupId: id }}
                    options={{
                        title:"Group"
                    }} />
                <Stack.Screen name="Details"
                    component={EnemyDetails} />
                <Stack.Screen name="MonsterDetails" component={EnemyDetails}
                    initialParams={{ groupMode: true }}
                    options={{
                        title: "Details",
                    }} />
                <Stack.Screen
                    name="AddCardCustom"
                    component={AddEntity}
                    initialParams={{ groupMode: true }}
                    options={{
                        title: 'Add Entity',
                        headerRight: () => <>
                            <IconButton icon="content-save" />
                            <IconButton icon="check" />
                        </>,
                    }} />
                <Stack.Screen
                    name="AddHero"
                    component={AddEntity}
                    initialParams={{groupMode:true}}
                    options={{
                        title: 'Add Entity',
                        headerRight: () => <>
                            <IconButton icon="content-save" />
                            <IconButton icon="check" />
                        </>,
                    }} />
                <Stack.Screen
                    name="AddMonster"
                    component={MonsterListing}
                    initialParams={{groupMode:true}}
                    options={{
                        title: 'Add Monster',
                    }} />
            </Stack.Navigator>
        </GroupContext.Provider>
    )
}