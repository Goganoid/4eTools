import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Checkbox, Divider, IconButton, Text } from "react-native-paper";
import { Power } from "../../types/entityTypes";

type Props = {
    power: Power,
    navigation: any,
    removePower: (power: Power) => void,
    toggleChecked:(power:Power)=>void,
}

export const PowerItem = ({power,navigation,removePower,toggleChecked}:Props) =>
(
    <View>
        <View style={styles.element} >
            <View style={styles.nameSection}>
                <TouchableOpacity style={styles.title} onPress={() => power.power_id != null
                    ? navigation.navigate("PowerDetails", { id: power.power_id })
                    : navigation.navigate("CustomPowerDetails", { power })
                }>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text variant="titleLarge">{power.name}</Text>
                        <IconButton icon='delete' style={styles.icon} size={20}
                            onPress={() => removePower(power)}
                        />
                    </View>
                </TouchableOpacity>
                <Checkbox status={power.checked ? 'checked' : 'unchecked'}
                    onPress={() => toggleChecked(power)}
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

export const styles = StyleSheet.create({
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