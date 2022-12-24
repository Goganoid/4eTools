import { useState, useContext,useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme, withTheme } from 'react-native-paper';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { TextInput, Text, List, DataTable, Badge, Divider, IconButton, Checkbox } from 'react-native-paper';
import { CustomThemeProvider } from '../ThemeProvider';
import { PowerTrackerControls } from './PowerTrackerControls';
import { PowerTrackerContext } from '../../Navigators/PowerTrackerStack';
import { getSavedTracker } from '../../data/storage';

const arraySort = require('array-sort');

const PowerTracker = ({ navigation, route }) => {
    const context = useContext(PowerTrackerContext);
    const theme = useTheme();
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState({ open: false });
    const onStateChange = ({ open }) => setState({ open });
    const { open } = state;
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <IconButton icon="menu" style={{ padding: 0, margin: 0 }} onPress={() => navigation.openDrawer()} />,
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
        </CustomThemeProvider>

    )
}

const styles = StyleSheet.create({
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
        padding: 0, margin: 0
    },
})


export default withTheme(PowerTracker);  