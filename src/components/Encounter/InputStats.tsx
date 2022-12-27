import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
export const statNames = {
    hp: 'HP',
    ac: 'AC',
    fort: 'Fortitude',
    ref: 'Reflex',
    will: 'Will',
    initiative: 'Initiative',
};
type StringStats =  {
    hp: string,
    ac: string,
    fort: string,
    ref: string,
    will: string,
    initiative: string,
}

type Props = {
    statName: string,
    stats:StringStats,
    stat: string,
    setStats: (stats:any) => void,
    style?: any
}

export function InputStat({ statName, stats, stat, setStats, style }:Props) {
    return (
        <TextInput
            mode="outlined"
            style={{ ...styles.stat_input,...styles }}
            label={statName}
            maxLength={3}
            keyboardType={'numeric'}
            value={(stats as any)[stat]}
            onChangeText={value => setStats({ ...stats, [stat]: value })}></TextInput>
    );
}

export function InputStats(stats:StringStats, setStats:(stats:any)=>void) {
    return <View style={styles.stats}>
        {Object.keys(stats).map((key, ind) => {
            if (key == 'initiative')
                return null;
            return key == 'initiative' ? null : (
                <InputStat
                    statName={(statNames as any)[key]}
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