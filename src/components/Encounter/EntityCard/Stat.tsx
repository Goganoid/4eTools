import React, { useEffect, useState } from 'react';
import { StyleSheet, View,TouchableOpacity } from 'react-native';
import {
    Portal, Text, useTheme, Surface
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StatEditor } from '../../shared/StatEditor';

type Props = {
    statName: string,
    statValue: number,
    maxValue?: number,
    onChange: (value: any) => void,
    minimalistic?: boolean,
    textStyle?: any
    style?: any
}

export const Stat = ({ statName, statValue, onChange, minimalistic = false, textStyle = {}, style = {} }: Props) => {
    if (typeof statValue == 'string') throw "Stat value can't be string";
    const theme = useTheme();
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    return (
        <>
            <View style={style}>
                    <TouchableOpacity onPress={() => setIsDialogVisible(true)} style={{alignSelf:"flex-start"}}  >
                        <View style={{ ...styles.def_stat }} >
                        {minimalistic ? null : <Text style={{
                            ...styles.bold_text,
                            ...textStyle,
                            ...styles.underline,
                        }} >{statName}: </Text>}
                            <Text style={{...textStyle,...styles.underline}}>{statValue}</Text>
                        </View>
                    </TouchableOpacity>
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
    underline: {
        textDecorationLine: "underline",
    },
    bold_text: {
        fontWeight: "bold",
        
    },
    def_stat: {
        flexDirection: "row",
        alignItems: "flex-start"
    }
});


