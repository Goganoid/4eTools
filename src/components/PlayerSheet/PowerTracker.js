import { useState, useContext, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme, withTheme } from 'react-native-paper';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { TextInput, Text, List, DataTable, Badge, IconButton, Checkbox, Divider, Portal } from 'react-native-paper';
import { CustomThemeProvider } from '../shared/ThemeProvider';
import { PowerTrackerControls } from './PowerTrackerControls';
import { PowerTrackerContext } from '../../Navigators/PowerTrackerStack';
import { getSavedTracker } from '../../data/storage';
import MenuDrawer from '../shared/MenuDrawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StatEditor } from '../shared/StatEditor';
const arraySort = require('array-sort');


const setFormatedStatValue = (value, maxValue, minValue, setValue) => {
    console.log(`${value}:${typeof value}, ${maxValue}:${typeof maxValue} ${value > maxValue}`);
    if (value > maxValue) return;
    else if (value < minValue) return;
    else setValue(value);
}

const PlayerStat = ({ name, setValue, value, maxValue, allowNegative = true, setEditorVisible }) => {

    const minValue = allowNegative ? -99 : 0
    const [text, setText] = useState(value.toString());

    useEffect(() => {
        setText(typeof (value) === 'number' ? value.toString() : value);
    }, [value]);

    return <View style={styles.player_stat}>
        <View >
            <Text>{name}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >
            <IconButton icon='minus' style={styles.icon}
                onPress={() => {
                    const newValue = value - 1;
                    if (newValue > maxValue || (!allowNegative && newValue < 0)) return;
                    setValue(newValue);
                }} />
            <TextInput mode='outlined'
                style={styles.statInput}
                onChangeText={newText => {
                    let newValue = newText.replace(/[,\.\s]/g, "");
                    let parsedNewValue = parseInt(newValue)
                    if (!isNaN(parsedNewValue)) {
                        if (parsedNewValue <= maxValue && parsedNewValue > minValue) {
                            setText(parsedNewValue.toString());
                        }
                    }
                    else {
                        setText(newValue);
                    }
                }}
                onSubmitEditing={() => {
                    let parsedNewValue = parseInt(text) || 0;
                    setFormatedStatValue(parsedNewValue, maxValue, minValue, setValue);
                }}
                value={text}
                keyboardType='number-pad' />
            <IconButton icon='plus' style={styles.icon}
                onPress={() => {
                    const newValue = value + 1;
                    if (newValue > maxValue || (!allowNegative && newValue < 0)) return;
                    setValue(newValue)
                }}
            />
        </View>
        <View>
            <IconButton icon='pencil' style={styles.icon} onPress={() => setEditorVisible(true)}  size={14} />
        </View>
    </View>
}
const PowerTracker = ({ navigation, route }) => {
    const context = useContext(PowerTrackerContext);
    const theme = useTheme();
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState({ open: false });
    const onStateChange = ({ open }) => setState({ open });
    const { open } = state;

    const [maxHpEditorVisible, setMaxHpEditorVisible] = useState(false)
    const [maxSurgesEditorVisible, setMaxSurgesEditorVisible] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => MenuDrawer(navigation),
        });
    }, [navigation]);

    useEffect(() => {
        if (loading) {
            console.log("Loading entities first time");
            getSavedTracker().then(value => {
                console.log("Loaded:", value);
                if (value != null) {
                    console.log("Passed check");
                    context.setTracker(value);
                }
                setLoading(false);
            });
        }
    }, [])

    const sections = [
        { label: "At-Will", filterCriteria: "At-Will" },
        { label: "Encounter", filterCriteria: "Enc." },
        { label: "Daily", filterCriteria: "Daily" },
    ]


    const PowerItem = (power, key) =>
    (
        <View key={key}>
            <View style={styles.element} >
                <View style={styles.nameSection}>
                    <TouchableOpacity style={styles.title} onPress={() => power.power_id != null
                        ? navigation.navigate("PowerDetails", { id: power.power_id })
                        : navigation.navigate("CustomPowerDetails", { power })
                    }>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text variant="titleLarge">{power.name}</Text>
                            <IconButton icon='delete' style={styles.icon} size={20}
                                onPress={() => context.removePower(power)}
                            />
                        </View>
                    </TouchableOpacity>
                    <Checkbox status={power.checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            context.setChecked(power, !power.checked);
                        }}
                    />
                </View>
                <View style={styles.stats}>
                    <Text style={styles.stat}><Text style={styles.bold_text}>Level: </Text>{power.level}</Text>
                    <Text style={styles.stat}><Text style={styles.bold_text}>Action: </Text>{power.action}</Text>
                    <Text style={styles.stat}><Text style={styles.bold_text}>Type: </Text>{power.type}</Text>
                </View>
            </View>
            <Divider />
        </View>
    )



    return (
        <CustomThemeProvider>

            <ScrollView style={{ backgroundColor: theme.colors.background }}>
                <View style={styles.player_stats}>
                    <PlayerStat name='HP'
                        value={context.hp}
                        setValue={value => context.setHp(value)}
                        maxValue={context.maxHp}
                        setMaxValue={value => context.setMaxValue(value)}
                        setEditorVisible={setMaxHpEditorVisible} />
                    <PlayerStat name='Surges'
                        value={context.surges}
                        setValue={value => context.setSurges(value)}
                        maxValue={context.maxSurges}
                        setMaxValue={value => context.setMaxSurges(value)}
                        setEditorVisible={setMaxSurgesEditorVisible} />
                </View>
                {sections.map(({ label, filterCriteria }, index) =>
                (
                    <List.Accordion title={label} key={label} >
                        {arraySort(context.powers
                            .filter(power => power.type.includes(filterCriteria)), ['level', 'action', 'name'])
                            .map((power, ind) => PowerItem(power, power.id))}
                    </List.Accordion>
                ))}
            </ScrollView>
            {<PowerTrackerControls
                open={open}
                navigation={navigation}
                onStateChange={onStateChange}
            />}
            <Portal>
                <StatEditor
                    isDialogVisible={maxHpEditorVisible}
                    setIsDialogVisible={setMaxHpEditorVisible}
                    setValue={(value) => context.setMaxHp(value)}
                    statName={"Max HP"}
                    value={context.maxHp.toString()} />
                <StatEditor
                    isDialogVisible={maxSurgesEditorVisible}
                    setIsDialogVisible={setMaxSurgesEditorVisible}
                    setValue={(value) => context.setMaxSurges(value)}
                    statName={"Max Surges"}
                    value={context.maxSurges.toString()} />
            </Portal>
        </CustomThemeProvider>

    )
}

const styles = StyleSheet.create({
    player_stats: {
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
        paddingVertical: 20,
    },
    player_stat: {
        flexBasis: "50%",
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
    stat: {
        flexBasis: "50%",
        paddingVertical: 3,
        flex: 1,
        // paddingHorizontal: 10,
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


export default withTheme(PowerTracker);  