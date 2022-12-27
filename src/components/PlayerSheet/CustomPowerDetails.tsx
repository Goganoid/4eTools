import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react'
import { View,StyleSheet } from 'react-native';
import { Text } from 'react-native-paper'
import { PowerTrackerParams } from '../../Navigators/navigatorTypes';
export const CustomPowerDetails = ({ navigation, route }:NativeStackScreenProps<PowerTrackerParams,'CustomPowerDetails'>) => {
    const power = route.params.power;
    return (
        <View style={{padding:30}}>
            <Text style={styles.bold_text}>{power.name}</Text>
            <View style={styles.stats}>
                <Text style={styles.stat}><Text style={styles.bold_text}>Level: </Text>{power.level}</Text>
                <Text style={styles.stat}><Text style={styles.bold_text}>Action: </Text>{power.action}</Text>
                <Text style={styles.stat}><Text style={styles.bold_text}>Type: </Text>{power.type}</Text>
            </View>
            <Text style={styles.stat}><Text style={styles.bold_text}>Notes: </Text>{power.notes}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    stat: {
        paddingVertical: 3,
        fontSize:25,
    },
    bold_text: {
        fontWeight: "bold",
        fontSize:25,
    },
    stats: {
        flexDirection: 'column',
        flexWrap: "wrap",
    },
    element: {
        height: 90,
        padding: 10,
        marginVertical: 5,
        zIndex: 1,

    },
    title: {
        width: "70%"
    },
    icon: {
        padding: 0, margin: 0
    },
})