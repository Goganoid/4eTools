import React from 'react';
import { View } from 'react-native';
import { styles, statNames } from './AddEntity';
import { InputStat } from "./InputStat";

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
