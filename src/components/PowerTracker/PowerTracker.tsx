import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Checkbox, Divider, IconButton, List, Portal, Text, useTheme } from 'react-native-paper';
import { getSavedTracker } from '../../data/storage';
import { PowerTrackerContext } from '../../Navigators/PowerTrackerStack';
import { Power } from '../../types/entityTypes';
import { PowerTrackerParams } from '../../types/navigatorTypes';
import MenuDrawer from '../shared/MenuDrawer';
import { StatEditor } from '../shared/StatEditor';
import { CustomThemeProvider } from '../shared/ThemeProvider';
import { PlayerStat } from './PlayerStat';
import { PowerItem } from './PowerItem';
import { PowerTrackerControls } from './PowerTrackerControls';


const arraySort = require('array-sort');


export const setFormatedStatValue = (value: number, maxValue: number, minValue: number, setValue: (value: number) => void) => {
    if (value > maxValue) return;
    else if (value < minValue) return;
    else setValue(value);
}

const PowerTracker = ({ navigation, route }: NativeStackScreenProps<PowerTrackerParams, 'PowerTracker'>) => {
    const context = useContext(PowerTrackerContext);

    if (context == null) throw "Power tracker context is null"

    const theme = useTheme();
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState({ open: false });
    const onStateChange = ({ open }: { open: boolean }) => setState({ open });
    const { open } = state;

    const [maxHpEditorVisible, setMaxHpEditorVisible] = useState(false)
    const [maxSurgesEditorVisible, setMaxSurgesEditorVisible] = useState(false);
    const [healBonusEditorVisible, setHealBonusEditorVisible] = useState(false);
    const [damageEditorVisible, setDamageEditorVisible] = useState(false);
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => MenuDrawer(navigation),
        });
    }, [navigation]);

    useEffect(() => {
        if (loading) {
            console.log("Loading entities first time");
            const value = getSavedTracker();
            console.log("Loaded:", value);
            if (value != null) {
                context.setTracker(value);
            }
            setLoading(false);
        }
    }, [])

    const sections = [
        { label: "At-Will", filterCriteria: "At-Will" },
        { label: "Encounter", filterCriteria: "Enc." },
        { label: "Daily", filterCriteria: "Daily" },
    ]


    const toggleChecked = (power: Power) => {
        context.setChecked(power, !power.checked);
    };
    const removePower = (power: Power) => context.removePower(power);

    const PlayerStats = () =>
        <View style={styles.player_stats}>
            <View style={{ ...styles.player_stat, flex: 4 }}>
                <PlayerStat name='HP'
                    isHp={true}
                    value={context.hp}
                    setValue={value => context.setHp(value)}
                    maxValue={context.maxHp}
                    setEditorVisible={setMaxHpEditorVisible} />
            </View>
            <View style={{ ...styles.player_stat, flex: 2 }}>

                <IconButton icon='sword' onPress={()=>setDamageEditorVisible(true)} />
                <IconButton icon='bottle-tonic-plus' onPress={() => setHealBonusEditorVisible(true)} />

                {/* <Button onPress={() => setHealBonusEditorVisible(true)}
                    contentStyle={{ margin: 0, padding: 0, height: 40 }}
                    compact
                >
                    DAMAGE
                </Button>
                <Button onPress={() => setHealBonusEditorVisible(true)}
                    disabled={context.surges <= 0}
                    contentStyle={{ margin: 0, padding: 0, height: 40 }}
                    compact
                >
                    HEAL
                </Button> */}
                <Text style={{ color: "gray", fontSize: 10 }} >1/4MAX = {Math.floor(context.maxHp / 4.0)}</Text>
            </View>
            <View style={{ ...styles.player_stat, flex: 4 }}>
                <PlayerStat name='Surges'
                    value={context.surges}
                    setValue={value => context.setSurges(value)}
                    maxValue={context.maxSurges}
                    setEditorVisible={setMaxSurgesEditorVisible} />
            </View>
        </View>;
    const Powers = sections.map(({ label, filterCriteria }, index) => (
        <List.Accordion title={label} key={label}>
            {arraySort(context.powers
                .filter(power => power.type.includes(filterCriteria)), ['level', 'action', 'name'])
                .map((power: Power, ind: number) => <PowerItem key={ind}
                    navigation={navigation}
                    power={power}
                    removePower={removePower}
                    toggleChecked={toggleChecked} />
                )}
        </List.Accordion>
    ));
    return (
        <CustomThemeProvider>
            <>
                <ScrollView style={{ backgroundColor: theme.colors.background }} contentContainerStyle={{ paddingBottom: 30 }}>
                    {PlayerStats()}
                    {Powers}
                </ScrollView>
                {<PowerTrackerControls
                    open={open}
                    navigation={navigation}
                    onStateChange={onStateChange}
                />}
                <Portal>
                    <StatEditor
                        isDialogVisible={damageEditorVisible}
                        setIsDialogVisible={setDamageEditorVisible}
                        onSubmit={(damage) => {
                            let newHp = context.hp - damage;
                            context.setHp(newHp)
                        }}
                        onlyPositive
                        statName={"Take damage"}
                        value={0} />
                    <StatEditor
                        isDialogVisible={healBonusEditorVisible}
                        setIsDialogVisible={setHealBonusEditorVisible}
                        onlyPositive
                        onSubmit={(bonus) => {
                            if (context.surges <= 0 || context.hp==context.maxHp) return;
                            const surgeHealing = Math.floor(context.maxHp / 4.0);
                            let newHp = context.hp + bonus + surgeHealing;
                            if (newHp > context.maxHp) newHp = context.maxHp;
                            context.setTracker({
                                attacks: context.attacks,
                                damageTypes: context.damageTypes,
                                maxSurges: context.maxSurges,
                                powers: context.powers,
                                maxHp: context.maxHp,
                                surges: context.surges - 1,
                                hp: newHp
                            })
                        }}
                        statName={"Bonus to healing surge"}
                        value={0} />
                    <StatEditor
                        isDialogVisible={maxHpEditorVisible}
                        setIsDialogVisible={setMaxHpEditorVisible}
                        onSubmit={(value) => {
                            console.log("NEW MAX HP ", value)
                            context.setTracker({
                                attacks: context.attacks,
                                damageTypes: context.damageTypes,
                                maxSurges: context.maxSurges,
                                surges: context.surges,
                                powers: context.powers,
                                maxHp: value,
                                hp: context.hp > value ? value : context.hp
                            })
                        }}
                        statName={"Max HP"}
                        value={context.maxHp} />
                    <StatEditor
                        isDialogVisible={maxSurgesEditorVisible}
                        setIsDialogVisible={setMaxSurgesEditorVisible}
                        onSubmit={(value) => {
                            context.setTracker({
                                attacks: context.attacks,
                                damageTypes: context.damageTypes,
                                maxSurges: value,
                                surges: context.surges > value ? value : context.surges,
                                powers: context.powers,
                                maxHp: context.maxHp,
                                hp: context.hp
                            })
                        }}
                        statName={"Max Surges"}
                        value={context.maxSurges} />
                </Portal>
            </>
        </CustomThemeProvider>

    )
}

export const styles = StyleSheet.create({
    player_stats: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        paddingVertical: 20,
    },
    player_stat: {
        // flexBasis: "20%",
        justifyContent: "center",
        alignItems: "center"
    },
    statInput: {
        height: 50,
        textAlign: "center",
        marginBottom: 0,
        marginTop: 3,
        color: "black"
    },
    stat: {
        flexBasis: "50%",
        paddingVertical: 3,
        flex: 1,
        // paddingHorizontal: 10,
    },
    stats: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
    },
    element: {
        height: 90,
        padding: 10,
        marginVertical: 5,
        zIndex: 1,

    },
    bold_text: {
        fontWeight: "bold"
    },
    nameSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexGrow: 1,
        width: "100%"
    },
    title: {
        width: "70%"
    },
    icon: {
        padding: 0, margin: 0,
        color: "#000"
    },
})


export default PowerTracker;  