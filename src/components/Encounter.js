import React from 'react';
import { DeviceEventEmitter, ScrollView, StyleSheet, View } from 'react-native';
import { IconButton, Text, ActivityIndicator } from 'react-native-paper';
import { EntityCard } from './EntityCard';
import { roll20 } from "../helpers/roll20";
import { getEncounterEntities, storeEncounterEntities } from '../data/storage';
import calculateInitiative from '../helpers/calculateInitiative';
import { CustomThemeProvider } from './ThemeProvider';
import { EncounterControls } from './EncounterControls';


const sortByInitiative = (entities) => entities.sort((entityA, entityB) => calculateInitiative(entityB) - calculateInitiative(entityA));

export const Encounter = ({ navigation, route }) => {
    const [loading, setLoading] = React.useState(true);
    const [state, setState] = React.useState({ open: false });

    const onStateChange = ({ open }) => setState({ open });

    const { open } = state;

    const [entities, setEntities] = React.useState([]);

    const setEntityStat = (entity, statName, statValue) => {
        statValue = parseInt(statValue) || 0;
        let newEntities = entities.map(e => {
            console.log(e.uuid, entity.uuid, e.uuid === entity.uuid);
            if (e.uuid === entity.uuid) {
                console.log("Found");
                e.stats[statName] = statValue;
            }
            return e;
        })
        setEntities(newEntities)
    }


    DeviceEventEmitter.addListener("event.addEntity", (entity) => {
        console.log("Got event");
        console.log(entity);
        setEntities(sortByInitiative([
            ...entities,
            entity,
        ]));
    });
    DeviceEventEmitter.addListener("event.removeEntity", (id) => {
        console.log("Got event");
        console.log(id);
        setEntities(entities.filter(entity => entity.uuid != id));
    });
    React.useEffect(() => {
        if (loading) {
            console.log("Loading entities first time");
            getEncounterEntities().then(value => {
                setEntities(value);
                setLoading(false);
            });
        }
        else {
            let sortedEntities = sortByInitiative(entities);
            console.log("Storing")
            storeEncounterEntities(sortedEntities);
            setEntities(sortedEntities);
        }
    }, [entities])
    React.useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <IconButton icon="menu" style={{ padding: 0, margin: 0 }} onPress={() => navigation.openDrawer()} />,
            headerRight: () => (
                <IconButton icon="dice-d20"
                    onPress={reroll} />
            ),
        });
    }, [navigation, entities]);

    const reroll = () => {
        let newEntities = entities.map(entity => {
            entity.initiativeRoll = roll20();
            return entity;
        })
        setEntities(sortByInitiative(newEntities));
    }
    return (
        <CustomThemeProvider>
            {loading
                ? <View styles={styles.activity_indicator_container}>
                    <ActivityIndicator animating={true} />
                </View>
                : <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                    {entities.map(entity =>
                        <EntityCard navigation={navigation} entity={entity} key={entity.uuid} setStat={setEntityStat} />
                    )}
                </ScrollView>}
            {EncounterControls(open, navigation, onStateChange)}
        </CustomThemeProvider>
    )
}

const styles = StyleSheet.create({
    activity_indicator_container: {
        flex:1,
        
    }
})