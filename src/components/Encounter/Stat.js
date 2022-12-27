import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
    Portal, Text, Modal
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StatEditor } from '../shared/StatEditor';
import { useTheme } from 'react-native-paper';
export const Stat = ({ statName, statValue, maxValue = 2000, onChange, minimalistic = false, style={} }) => {
    const theme = useTheme();
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [newStatValue, setNewStatValueRaw] = useState('');
    useEffect(() => {
        setNewStatValueRaw(typeof (statValue) === 'number' ? statValue.toString() : statValue);
    }, [statValue]);
    const setNewStatValue = (value) => {
        const cleanValue = value.replace(/[,\.\s]/g, "");
        let parsed = parseInt(cleanValue);
        if (parsed > maxValue) return;
        else if (parsed < -maxValue)return;
        else setNewStatValueRaw(cleanValue)
    }
    return (
        <><View>

            <View style={{ ...styles.def_stat, ...style }} >
                {minimalistic ? null : <Text style={styles.bold_text} >{statName}:</Text>}
                <Text onPress={() => setIsDialogVisible(true)}>{statValue}</Text>
                <Icon name="pencil" size={12} color={theme.colors.text} style={{ paddingTop: 2.5, paddingLeft: 2.5 }} onPress={() => setIsDialogVisible(true)} />
            </View>
            <Portal>
                {StatEditor({ isDialogVisible, setIsDialogVisible, statName, value:newStatValue, setValue:setNewStatValue, onChange })}
            </Portal>
        </View>

        </>
    )
}
export const styles = StyleSheet.create({
    input: {
        marginHorizontal: 10,
        padding:10
    },
    changeby: {
        marginTop:10,
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


