import React from 'react'
import { ScrollView, View, StyleSheet } from 'react-native';
import { EntityCard } from './EntityCard';
import { DeviceEventEmitter } from "react-native"
import { FAB, Portal, Provider, IconButton,Text } from 'react-native-paper';

import { createEnemy } from '../helpers/entities';
import { roll20 } from "../helpers/roll20";

import { CustomThemeProvider } from './ThemeProvider';
import { getEncounterEntities, storeEncounterEntities } from '../data/storage';
import calculateInitiative from '../helpers/calculateInitiative';

import { createStackNavigator } from 'react-navigation-stack';
import { EncounterStackNavigator } from '../Navigators/EncounterStackNavigator';

const sortByInitiative = (entities) => entities.sort((entityA,entityB) => calculateInitiative(entityB) - calculateInitiative(entityA));

export const Encounter = ({ navigation, route }) => {
    const [loading, setLoading] =React.useState(true);
    const [state, setState] = React.useState({ open: false });

    const onStateChange = ({ open }) => setState({ open });

    const { open } = state;

    const [entities, setEntities] = React.useState([
        createEnemy("monster4759"),
        createEnemy("monster4228")
    ]);

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
        // storeEncounterEntities(entities);
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
        setEntities(entities.filter(entity=>entity.uuid!=id));
    });
    React.useEffect(() => {
        if(loading){
            console.log("Loading entities first time");
            getEncounterEntities().then(value => {
                setEntities(value);
                setLoading(false);
            });
        }
        else{
            let sortedEntities = sortByInitiative(entities);
            console.log("Storing")
            storeEncounterEntities(sortedEntities);
            setEntities(sortedEntities);
        }
    }, [entities])
    React.useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <IconButton icon="menu" style={{padding:0,margin:0}} onPress={()=>navigation.openDrawer()} />,
            headerRight: () => (
                <IconButton icon="dice-d20"
                    onPress={reroll} />
            ),
        });
    }, [navigation, entities]);

    const reroll = () => {
        console.log("Reroll, check length", entities.length);
        let newEntities = entities.map(entity => {
            entity.initiativeRoll = roll20();
            return entity;
        })
        setEntities(sortByInitiative(newEntities));
    }
    console.log("Render length", entities.length)
    console.log("Render", entities)
    return (
        <>

            <CustomThemeProvider>
                {loading ? <Text>Loading...</Text> : <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                    {entities.map(entity =>
                        <EntityCard navigation={navigation} entity={entity} key={entity.uuid} setStat={setEntityStat} />
                    )}
                </ScrollView>}
                <Portal>
                    <FAB.Group fabStyle={styles.fab}
                        open={open}
                        visible
                        icon={open ? 'plus' : 'plus'}
                        theme={{ colors: { backdrop: 'transparent' } }}
                        actions={[
                            {
                                icon: 'plus',
                                label: 'Custom',
                                onPress: () => navigation.navigate("AddCardCustom",{isHeroTab:false})
                            },

                            {
                                icon: 'emoticon-happy',
                                label: 'Hero',
                                onPress: () => navigation.navigate("AddCardCustom",{isHeroTab: true }),
                            },
                            {
                                icon: 'emoticon-devil',
                                label: 'Enemy',
                                onPress: () => navigation.navigate("AddMonster",{showAddScreen:true}),
                            },
                            {
                                icon: 'plus',
                                onPress: () => console.log('Pressed notifications'),
                            },
                        ]}
                        onStateChange={onStateChange}
                        onPress={() => {
                            if (open) {
                                // do something if the speed dial is open
                            }
                        }}
                    />
                </Portal>
            </CustomThemeProvider>
        </>
    )
}
const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
})