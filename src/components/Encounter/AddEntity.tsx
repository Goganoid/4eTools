import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import {
    IconButton, RadioButton,
    Text,
    TextInput,
    useTheme
} from 'react-native-paper';
import { v4 as uuid } from 'uuid';
import { EncounterContext } from '../../context/EncounterContext';
import { GroupContext } from '../../context/GroupContext';
import { getSavedEntities, saveEntity, setSavedEntities, updateEntity } from '../../data/storage';
import { createEntity } from '../../helpers/entities';
import { Entity, EntityType } from '../../types/entityTypes';
import { EncounterMode, EncounterStackParamList } from '../../types/navigatorTypes';
import { ImageSelector } from '../shared/ImageGallery';
import { CustomThemeProvider } from '../shared/ThemeProvider';
import { InputStat, InputStats } from './InputStats';
import { SavedEntitiesTab } from './SavedEntitiesTab';
export const AddEntity = ({ navigation, route }: NativeStackScreenProps<EncounterStackParamList, 'AddCardCustom' | 'AddHero'>) => {
    const mode = route.params.mode;

    const context = mode == EncounterMode.group ? React.useContext(GroupContext) :
        mode == EncounterMode.encounter ? React.useContext(EncounterContext) : null;
    const theme = useTheme();
    const { isHeroTab } = route.params;
    const [id, setId] = useState(uuid());
    const [name, setName] = useState('');
    const [entity_type, setType] = React.useState<EntityType>(EntityType.Enemy);
    const [imageUri, setImageUri] = useState<null | string>(null)
    const [stats, setStats] = useState({
        hp: '',
        ac: '',
        fort: '',
        ref: '',
        will: '',
        initiative: '',
    });

    useEffect(() => {
        setType(isHeroTab ? EntityType.Hero : entity_type);
    }, [isHeroTab]);
    useEffect(() => {
        if (context == null) return;
        navigation.setOptions({
            headerRight: () => context && <>
                <IconButton icon="content-save" onPress={save} />
                <IconButton icon="check" onPress={create} />
            </>,
        });
    }, [navigation, name, entity_type, stats, context, imageUri]);

    const getFieldValues = () => {
        return {
            name,
            entity_type,
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

    const validateName = (name: string) => {
        if (name.length == 0) {
            showMessage({
                message: 'Name is required!',
                type: 'warning',
                backgroundColor: theme.colors.errorContainer,
            });
            return false;
        }
        return true;
    };
    const create = async () => {
        const values = getFieldValues();

        if (!validateName(values.name)) return;

        let entity = createEntity(
            {
                type: values.entity_type,
                name: values.name,
                stats: values.stats,
                image_uri: imageUri,
            }
        );
        console.log("Adding entity");
        console.log("Entity ", entity);
        context!.addEntity(entity);
        showMessage({
            message: `${isHeroTab ? 'Hero' : 'Entity'} was added`,
            type: 'info',
            backgroundColor: theme.colors.onPrimary,
        });
    };
    const save = async () => {
        if (stored_entities == null) return;
        const values = getFieldValues();
        if (!validateName(values.name)) return;
        let entity = createEntity(
            {
                type: values.entity_type,
                name: values.name,
                stats: values.stats,
                custom_id: id as any,
                image_uri:imageUri,
            }
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
            backgroundColor: theme.colors.onPrimary,
        });
        await updateDisplayedStoredEntities();
        setId(uuid());
    };
    const removeSavedEntityHook = (entity: Entity) => {
        let newEntities = { ...stored_entities };
        delete (newEntities as any)[entity.uuid]
        setStored_entities(newEntities);
        setSavedEntities(newEntities, isHeroTab);
    }

    const [stored_entities, setStored_entities] = useState<object>({});

    const updateDisplayedStoredEntities = async () =>
        setStored_entities(await getSavedEntities(isHeroTab));


    useEffect(() => {
        updateDisplayedStoredEntities();
    }, []);

    const EnemyTypeSelector = <RadioButton.Group
        onValueChange={newValue => {
            setType(newValue as EntityType);
        } }
        value={entity_type}>
        {isHeroTab ? null : (
            <>
                <View style={styles.radio_item}>
                    <RadioButton value={EntityType.Enemy} />
                    <Text>Enemy</Text>
                </View>
                <View style={styles.radio_item}>
                    <RadioButton value={EntityType.Hero} />
                    <Text>Hero</Text>
                </View>
            </>
        )}
    </RadioButton.Group>;
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
                    setImageUri,
                    removeSavedEntityHook
                )}
                <View style={styles.add_entity_view}>
                    <Text variant="titleLarge">{isHeroTab ? 'Hero' : 'Entity'}</Text>
                    <TextInput
                        mode="outlined"
                        label={'Name'}
                        value={name}
                        onChangeText={value => setName(value)}
                    />
                    {EnemyTypeSelector}
                    <InputStat
                        statName={'Initiative bonus'}
                        setStats={setStats}
                        stat={'initiative'}
                        stats={stats}
                        style={{ width: '50%' }}
                    />
                    <Text variant="titleLarge">Stats</Text>
                    {InputStats(stats, setStats)}
                    {ImageSelector(imageUri,setImageUri)}
                </View>
            </ScrollView>
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