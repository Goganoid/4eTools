import React from 'react';
import { TextInput } from 'react-native-paper';
import { styles } from './AddEntity';

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
