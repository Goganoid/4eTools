import React, { useContext, useState } from 'react';
import { ScrollView } from 'react-native';
import { IconButton, TextInput, useTheme } from 'react-native-paper';
import { GroupsContext } from '../../Navigators/GroupsStackNavigator';
import { EncounterControls } from '../Encounter/EncounterControls';
import { EntityCard } from '../Encounter/EntityCard';
import { CustomThemeProvider } from '../shared/ThemeProvider';
export const Group = ({ navigation, route }) => {
    const groupId = route?.params.groupId;
    console.log("Group Id ", groupId)
    const theme = useTheme();
    const [state, setState] = useState({ open: false });
    const onStateChange = ({ open }) => setState({ open });
    const { open } = state;

    // const context = useContext(GroupContext);
    // console.log("Context ", context);
    // const {
    //     id,
    //     name,
    //     entities,
    //     setEncounterId,
    //     setEncounterName,
    //     setEntities,
    //     addEntity,
    //     removeEntity } = context;

    const groupsContext = useContext(GroupsContext);

    console.log("Groups context ", groupsContext);
    const encounter = groupsContext.groups.find(group => group.id == groupId);

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


    const setEntityStat = (entity, statName, statValue) => {
        statValue = parseInt(statValue) || 0;
        let newEntities = encounter.entities.map(e => {
            console.log(e.uuid, entity.uuid, e.uuid === entity.uuid);
            if (e.uuid === entity.uuid) {
                console.log("Found");
                e.stats[statName] = statValue;
            }
            return e;
        })
        setEntities(newEntities)
    }
    const setConditions = (entity, conditions) => {
        let newEntities = encounter.entities.map(e => {
            console.log(e.uuid, entity.uuid, e.uuid === entity.uuid);
            if (e.uuid === entity.uuid) {
                e.conditions = conditions;
            }
            return e;
        })
        setEntities(newEntities)
    }

    React.useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <>
                    <IconButton icon="delete" onPress={() => {
                        navigation.goBack();
                        groupsContext.removeGroup(encounter);
                    }}/>
                </>
            ),
        });
    }, [navigation, encounter.entities]);
    return (
        <CustomThemeProvider>
            <TextInput label='Name' value={encounter.name} onChangeText={setEncounterName} />
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} style={{backgroundColor:theme.colors.background}}>
                {encounter.entities.map((entity, index) =>
                    <EntityCard
                        navigation={navigation}
                        entity={entity}
                        key={entity.uuid}
                        setStat={setEntityStat}
                        setConditions={setConditions}
                        highlight={false}
                        removeEntity={removeEntity}
                        mode={'group'}
                        showInitiative={false}
                    />
                )}
            </ScrollView>

            {<EncounterControls open={open} navigation={navigation} onStateChange={onStateChange} addEntity={addEntity} />}
        </CustomThemeProvider>
    )
}