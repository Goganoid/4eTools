import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useState } from 'react';
import { ScrollView } from 'react-native';
import { IconButton, TextInput, useTheme } from 'react-native-paper';
import { Entity, GroupEntity } from '../../Navigators/entityTypes';
import { GroupsContext } from '../../Navigators/GroupsStackNavigator';
import { EntityMode, GroupStackParamList } from '../../Navigators/navigatorTypes';
import { EncounterControls } from '../Encounter/EncounterControls';
import { EntityCard } from '../Encounter/EntityCard';
import { CustomThemeProvider } from '../shared/ThemeProvider';
export const Group = ({ navigation, route }: NativeStackScreenProps<GroupStackParamList, 'EntitiesList'>) => {
    const groupId = route.params.groupId;
    console.log("Group Id ", groupId)
    const theme = useTheme();
    const [state, setState] = useState({ open: false });
    const onStateChange = ({ open }: { open: boolean }) => setState({ open });
    const { open } = state;
    const groupsContext = useContext(GroupsContext);
    if (groupsContext == null) {
        console.log("Group context is null");
        return null;
    }
    console.log("Groups context ", groupsContext);
    const encounter = groupsContext.groups.find(group => group.id == groupId);
    if (encounter == undefined) {
        console.log("Encounter is undefined");
        return;
    }
    const setEncounterId = (newId: string) => groupsContext.updateGroup({ ...encounter, id: newId } as GroupEntity);
    const setEncounterName = (newName: string) => groupsContext.updateGroup({ ...encounter, name: newName } as GroupEntity);
    const addEntity = (entity: Entity) => groupsContext.updateGroup({
        ...encounter,
        entities: ([...encounter.entities, entity])
    } as GroupEntity);
    const removeEntity = (entityId: string) => groupsContext.updateGroup({
        ...encounter,
        entities: encounter.entities.filter(entity => entity.uuid != entityId)
    });
    const setEntities = (entities: Array<Entity>) => groupsContext.updateGroup({ ...encounter, entities })


    const setEntityStat = (entity: Entity, statName: string, statValue: string | number) => {
        if (typeof statValue == 'string')
            statValue = parseInt(statValue) || 0;
        let newEntities = encounter.entities.map(e => {
            console.log(e.uuid, entity.uuid, e.uuid === entity.uuid);
            if (e.uuid === entity.uuid) {
                console.log("Found");
                (e.stats as any)[statName] = statValue;
            }
            return e;
        })
        setEntities(newEntities)
    }
    const setConditions = (entity: Entity, conditions: Array<string>) => {
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
                    }} />
                </>
            ),
        });
    }, [navigation, encounter.entities]);
    return (
        <CustomThemeProvider>
            <>
                <TextInput label='Name' value={encounter.name} onChangeText={setEncounterName} />
                <ScrollView contentContainerStyle={{ paddingBottom: 100 }} style={{ backgroundColor: theme.colors.background }}>
                    {encounter.entities.map((entity, index) =>
                        <EntityCard
                            navigation={navigation}
                            entity={entity}
                            key={entity.uuid}
                            setStat={setEntityStat}
                            setConditions={setConditions}
                            highlight={false}
                            mode={EntityMode.group}
                            showInitiative={false}
                        />
                    )}
                </ScrollView>

                {<EncounterControls open={open} navigation={navigation} onStateChange={onStateChange} />}
            </>
        </CustomThemeProvider>
    )
}