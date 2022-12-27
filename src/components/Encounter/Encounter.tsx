import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, IconButton, Text, TextInput, TouchableRipple, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getCurrentEncounter } from '../../data/storage';
import { roll20 } from "../../helpers/roll20";
import { CustomThemeProvider } from '../shared/ThemeProvider';
import { EncounterControls } from './EncounterControls';
import { EntityCard } from './EntityCard/EntityCard';
import { sortByInitiative } from '../../helpers/sortByInitiative';
import MenuDrawer from '../shared/MenuDrawer';
import { NavigationProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Entity } from '../../types/entityTypes';
import { EncounterContext } from '../../context/EncounterContext';
import { EncounterStackParamList, EncounterMode } from '../../types/navigatorTypes';
import { GroupContext, GroupContextType } from '../../context/GroupContext';



export const Encounter = ({ navigation, route }: NativeStackScreenProps<EncounterStackParamList, 'Encounter'>) => {
    const mode = route.params.mode;
    const theme = useTheme();
    const [state, setState] = useState({ open: false });
    const onStateChange = ({ open }: { open: boolean }) => setState({ open });
    const { open } = state;
    const [turn, setTurn] = useState(0);

    const context = mode == EncounterMode.encounter
        ? useContext(EncounterContext)
        : mode == EncounterMode.group ? useContext(GroupContext) : null;
    if (context == null) throw "Unknown mode passed to Encounter";

    const prevTurn = () => {
        if (turn > 0) setTurn(turn - 1);
    }
    const nextTurn = () => {
        if (turn < context.entities.length - 1) setTurn(turn + 1);
    }
    const nextRound = () => {
        setTurn(0);
    }
    const setEntityStat = (entity: Entity, statName: string, statValue: any) => {
        statValue = parseInt(statValue) || 0;
        let newEntities = context.entities.map(e => {
            if (e.uuid === entity.uuid) {
                (e.stats as any)[statName] = statValue;
            }
            return e;
        })
        context.setEntities(newEntities)
    }
    const setConditions = (entity: Entity, conditions: Array<string>) => {
        let newEntities = context.entities.map(e => {
            if (e.uuid === entity.uuid) {
                e.conditions = conditions;
            }
            return e;
        })
        context.setEntities(newEntities)
    }
    React.useEffect(() => {
        if ("loading" in context && !context.loading) {
            if (context.entities.length == 0) setTurn(0);
            else if (context.entities.length - 1 < turn) setTurn(context.entities.length - 1);
        }
    }, [context.entities])
    React.useEffect(() => {
        navigation.setOptions({
            headerLeft: () =>mode==EncounterMode.encounter && MenuDrawer(navigation),
            headerRight: () => (
                <>
                    {mode == EncounterMode.encounter
                        ? <IconButton icon="dice-d20" onPress={reroll} />
                        : <IconButton icon="delete" onPress={() => {
                            navigation.goBack();
                            if ("removeGroup" in context) context!.removeGroup();
                        }} />}
                </>
            ),
        });
    }, [navigation, context.entities]);
    const reroll = () => {
        let newEntities = context.entities.map(entity => {
            entity.initiativeRoll = roll20();
            return entity;
        })
        context.setEntities(sortByInitiative(newEntities));
    }
    console.log("Render encounter entities:", context.entities?.length);
    const InitiativeControl =
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
        </View>;
    return (
        <CustomThemeProvider>
            <>
                {(context as any).loading
                    ? <View style={styles.activity_indicator_container}>
                        <ActivityIndicator animating={true} />
                    </View>
                    : <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>

                        {mode == EncounterMode.group && "name" in context &&
                            <TextInput label='Name' value={context.name} onChangeText={context.setEncounterName} />}
                        {context.entities.map((entity, index) =>
                            <EntityCard
                                navigation={navigation}
                                entity={entity}
                                key={index}
                                setStat={setEntityStat}
                                setConditions={setConditions}
                                mode={mode}
                                highlight={index == turn && mode == EncounterMode.encounter}
                                showInitiative={mode == EncounterMode.encounter}
                            />
                        )}
                    </ScrollView>
                }
                {mode == EncounterMode.encounter && InitiativeControl}
                {<EncounterControls
                    open={open}
                    navigation={navigation}
                    onStateChange={onStateChange}
                />}
            </>
        </CustomThemeProvider>
    )
}

export const styles = StyleSheet.create({
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