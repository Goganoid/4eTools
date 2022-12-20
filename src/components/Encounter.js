import React,{useState} from 'react';
import { DeviceEventEmitter, ScrollView, StyleSheet, View } from 'react-native';
import { IconButton, Text, ActivityIndicator, Button, TouchableRipple, Surface } from 'react-native-paper';
import { EntityCard } from './EntityCard';
import { roll20 } from "../helpers/roll20";
import { getEncounterEntities, storeEncounterEntities } from '../data/storage';
import calculateInitiative from '../helpers/calculateInitiative';
import { CustomThemeProvider } from './ThemeProvider';
import { EncounterControls } from './EncounterControls';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';


const sortByInitiative = (entities) => entities.sort((entityA, entityB) => calculateInitiative(entityB) - calculateInitiative(entityA));

export const Encounter = ({ navigation, route }) => {
    const theme = useTheme();
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState({ open: false });
    const onStateChange = ({ open }) => setState({ open });
    const { open } = state;
    const [entities, setEntities] = useState([]);
    

    const [turn, setTurn] = useState(0);
    const prevTurn = () => {
        if (turn > 0) setTurn(turn - 1);
    }
    const nextTurn = () => {
        if (turn < entities.length - 1) setTurn(turn + 1);
    }
    const nextRound = () => {
        setTurn(0);
    }


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
                    {entities.map((entity,index) =>
                        <EntityCard navigation={navigation} entity={entity} key={entity.uuid} setStat={setEntityStat} highlight={index==turn} />
                    )}
                </ScrollView>
            }
            <View style={{ ...styles.bottom_bar, backgroundColor: theme.colors.primaryContainer, }}>
                <TouchableRipple style={styles.bottom_side_item} onPress={() => prevTurn()}>
                    <Icon name='chevron-left' size={40} style={{ color: "black" }} />
                </TouchableRipple>
                <TouchableRipple style={styles.bottom_center_item} onPress={() => nextRound()}>
                    <View>
                        <Text>NEXT ROUND</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple style={styles.bottom_side_item} onPress={() => nextTurn()}>
                    <Icon name='chevron-right' size={40} style={{ color: "black" }} />
                </TouchableRipple>
            </View>
            {EncounterControls(open, navigation, onStateChange)}
        </CustomThemeProvider>
    )
}

const styles = StyleSheet.create({
    bottom_side_item: {
        flex: 1,
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    bottom_center_item: {
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        flex: 4,
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    bottom_bar: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        height: 55,
        elevation: 25,
    },
    activity_indicator_container: {
        flex: 1,
    }
})