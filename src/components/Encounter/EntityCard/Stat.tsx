import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
    Portal, Text, useTheme
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StatEditor } from '../../shared/StatEditor';

type Props = {
    statName: string,
    statValue: number,
    maxValue?: number,
    onChange: (value: any) => void,
    minimalistic?: boolean,
    style?: any
}

export const Stat = ({ statName, statValue, onChange, minimalistic = false, style = {} }: Props) => {
    if (typeof statValue == 'string') throw "Stat value can't be string";
    const theme = useTheme();
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    return (
        <>
            <View>
                <View style={{ ...styles.def_stat, ...style }} >
                    {minimalistic ? null : <Text style={styles.bold_text} >{statName}:</Text>}
                    <Text onPress={() => setIsDialogVisible(true)}>{statValue}</Text>
                    <Icon name="pencil" size={12} color={(theme.colors as any).text} style={{ paddingTop: 2.5, paddingLeft: 2.5 }} onPress={() => setIsDialogVisible(true)} />
                </View>
                <Portal>
                    {StatEditor({ isDialogVisible, setIsDialogVisible, statName, value: statValue, onSubmit : onChange })}
                </Portal>
            </View>

        </>
    )
}
const styles = StyleSheet.create({
    input: {
        marginHorizontal: 10,
        padding: 10
    },
    changeby: {
        marginTop: 10,
    },
    bold_text: {
        fontWeight: "bold"
    },
    def_stat: {
        paddingHorizontal: 5,
        flexDirection: "row",
        alignItems: "flex-start"
    }
});


