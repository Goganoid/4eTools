import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
export const statNames = {
    hp: 'HP',
    ac: 'AC',
    fort: 'Fortitude',
    ref: 'Reflex',
    will: 'Will',
    initiative: 'Initiative',
};

export function InputStat({ statName, stats, stat, setStats, style }) {
    return (
        <TextInput
            mode="outlined"
            style={{ ...styles.stat_input, ...style }}
            label={statName}
            maxLength={3}
            keyboardType={'numeric'}
            value={stats[stat]}
            onChangeText={value => setStats({ ...stats, [stat]: value })}></TextInput>
    );
}

export function InputStats(stats, setStats) {
    return <View style={styles.stats}>
        {Object.keys(stats).map((key, ind) => {
            if (key == 'initiative')
                return null;
            return key == 'initiative' ? null : (
                <InputStat
                    statName={statNames[key]}
                    setStats={setStats}
                    stat={key}
                    stats={stats}
                    key={ind} />
            );
        })}
    </View>;
}
export const styles = StyleSheet.create({

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