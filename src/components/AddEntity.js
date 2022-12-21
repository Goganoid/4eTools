import React, { useEffect, useState,useContext } from 'react';
import { DeviceEventEmitter, ScrollView, StyleSheet, View } from 'react-native';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import {
    IconButton,
    Divider,
    RadioButton,
    Text,
    TextInput,
    useTheme
} from 'react-native-paper';
import { v4 as uuid } from 'uuid';
import { getSavedEntities, saveEntity, updateEntity } from '../data/storage';
import { createEntity } from '../helpers/entities';
// import { EncounterContext } from '../Navigators/EncounterStackNavigator';
import { EncounterContext } from '../App';
import { InputStats,InputStat } from './InputStats';
import { SavedEntitiesTab } from './SavedEntitiesTab';
import { CustomThemeProvider } from './ThemeProvider';
import { sortByInitiative } from './sortByInitiative';
import { GroupContext } from '../Navigators/GroupStackNavigator';
export const AddEntity = ({ navigation, route }) => {
    const groupMode = route?.params.groupMode ?? false;
    console.log("Group mode ", groupMode);
    const context = groupMode ? useContext(GroupContext) : useContext(EncounterContext);
    const theme = useTheme();
    const { isHeroTab } = route.params;
    const [id, setId] = useState(uuid());
    const [name, setName] = useState('');
    const [entity_type, setType] = React.useState('enemy');
    const [stats, setStats] = useState({
        hp: '',
        ac: '',
        fort: '',
        ref: '',
        will: '',
        initiative: '',
    });
    const [notes, setNotes] = useState('');

    useEffect(() => {
        console.log('Setting hero type');
        setType(isHeroTab ? 'hero' : entity_type);
    }, [isHeroTab]);
    useEffect(() => {

        


        navigation.setOptions({
            headerRight: () => <>
                <IconButton icon="content-save" onPress={save} />
                <IconButton icon="check" onPress={create} />
            </>,
        });
    }, [navigation, name, entity_type, stats, notes,context]);

    const getFieldValues = () => {
        return {
            name,
            entity_type,
            notes,
            stats: {
                hp: parseInt(stats.hp) || 0,
                initiative: parseInt(stats.initiative) || 0,
                ac: parseInt(stats.ac) || 0,
                fort: parseInt(stats.fort) || 0,
                ref: parseInt(stats.ref) || 0,
                will: parseInt(stats.will) || 0,
            },
        };
    };

    const validateName = name => {
        if (name.length == 0) {
            showMessage({
                message: 'Name is required!',
                type: 'warning',
                backgroundColor: theme.colors.error,
            });
            return false;
        }
        return true;
    };
    const create = async () => {
        const values = getFieldValues();

        if (!validateName(values.name)) return;

        let entity = createEntity(
            values.entity_type,
            values.name,
            values.stats,
            values.notes,
        );
        // DeviceEventEmitter.emit('event.addEntity', entity);
        console.log("Adding entity");
        console.log("Entity ", entity);
        context.addEntity(entity);
        showMessage({
            message: `${isHeroTab ? 'Hero' : 'Entity'} was added`,
            type: 'info',
            backgroundColor: theme.colors.primary,
        });
    };
    const save = async () => {
        const values = getFieldValues();
        if (!validateName(values.name)) return;
        let entity = createEntity(
            values.entity_type,
            values.name,
            values.stats,
            values.notes,
            (custom_id = id),
        );
        let ents = await getSavedEntities();
        console.log('Saving entity with id', id);
        if (ents[id] != undefined) {
            await updateEntity(entity, isHeroTab);
        } else {
            await saveEntity(entity, isHeroTab);
        }
        showMessage({
            message: `${isHeroTab ? 'Hero' : 'Entity'} saved`,
            type: 'success',
            backgroundColor: theme.colors.primary,
        });
        await updateDisplayedStoredEntities();
        setId(uuid());
    };

  
    const updateDisplayedStoredEntities = async () =>
        setStored_entities(await getSavedEntities(isHeroTab));

    const [stored_entities, setStored_entities] = useState({});
    useEffect(() => {
        updateDisplayedStoredEntities();
    }, []);

    return (
        <CustomThemeProvider>
            <ScrollView>
                {SavedEntitiesTab(
                    isHeroTab,
                    stored_entities,
                    setName,
                    setType,
                    setId,
                    setStats,
                )}
                <View style={styles.add_entity_view}>
                    <Text variant="titleLarge">{isHeroTab ? 'Hero' : 'Entity'}</Text>
                    <TextInput
                        mode="outlined"
                        label={'Name'}
                        value={name}
                        onChangeText={value => setName(value)}
                    />

                    <RadioButton.Group
                        onValueChange={newValue => setType(newValue)}
                        value={entity_type}>
                        {isHeroTab ? null : (
                            <>
                                <View style={styles.radio_item}>
                                    <RadioButton value="enemy" />
                                    <Text>Enemy</Text>
                                </View>
                                <View style={styles.radio_item}>
                                    <RadioButton value="hero" />
                                    <Text>Hero</Text>
                                </View>
                            </>
                        )}
                    </RadioButton.Group>
                    <Text variant="titleLarge">Initiative</Text>

                    <InputStat
                        statName={'Initiative'}
                        setStats={setStats}
                        stat={'initiative'}
                        stats={stats}
                        style={{ width: '50%' }}
                    />
                    <Text variant="titleLarge">Stats</Text>
                    {InputStats(stats, setStats)}
                    <Divider bold={true} />
                    <Text variant="titleLarge">Notes</Text>
                    <TextInput
                        mode="outlined"
                        multiline
                        numberOfLines={10}
                        value={notes}
                        onChangeText={value => setNotes(value)}
                    />
                </View>
            </ScrollView>
            <FlashMessage position={'bottom'} />
        </CustomThemeProvider>
    );
};

export const styles = StyleSheet.create({
    radio_item: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    add_entity_view: {
        padding: 15,
    },
    stats: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    stat_input: {
        flexGrow: 0,
        flexShrink: 0,
        marginHorizontal: '2.5%',
        marginVertical: 10,
        flexBasis: '30%',
    },
});
