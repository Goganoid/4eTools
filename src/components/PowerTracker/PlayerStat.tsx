import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Text, TextInput } from 'react-native-paper';
import { setFormatedStatValue } from './PowerTracker';

type Props = {
    name: string;
    setValue: (value: number) => void;
    value: number;
    maxValue: number;
    allowNegative?: boolean;
    setEditorVisible: (visible: boolean) => void;
};
export const PlayerStat = ({ name, setValue, value, maxValue, allowNegative = true, setEditorVisible }: Props) => {

    const minValue = allowNegative ? -99 : 0;
    const [text, setText] = useState(value.toString());

    useEffect(() => {
        setText(typeof (value) === 'number' ? value.toString() : value);
    }, [value]);

    const decrease = () => {
        const newValue = value - 1;
        if (newValue > maxValue || (!allowNegative && newValue < 0))
            return;
        setValue(newValue);
    };
    const increase = () => {
        const newValue = value + 1;
        if (newValue > maxValue || (!allowNegative && newValue < 0))
            return;
        setValue(newValue);
    };
    const onChangeText = (newText: string): void => {
        let newValue = newText.replace(/[,\.\s]/g, "");
        let parsedNewValue = parseInt(newValue);
        if (!isNaN(parsedNewValue)) {
            if (parsedNewValue <= maxValue && parsedNewValue > minValue) {
                setText(parsedNewValue.toString());
            }
        }
        else {
            setText(newValue);
        }
    };
    const onSumbitEditing = () => {
        let parsedNewValue = parseInt(text) || 0;
        setFormatedStatValue(parsedNewValue, maxValue, minValue, setValue);
    };
    return <View style={styles.player_stat}>
        <View>
            <Text>{name}</Text>
        </View>
        <View style={styles.stat_container}>
            <IconButton icon='minus' style={styles.icon}
                onPress={decrease} />
            <TextInput mode='outlined'
                style={styles.statInput}
                onChangeText={onChangeText}
                onSubmitEditing={onSumbitEditing}
                value={text}
                keyboardType='number-pad' />
            <IconButton icon='plus' style={styles.icon}
                onPress={increase} />
        </View>
        <View>
            <IconButton icon='pencil' style={styles.icon} onPress={() => setEditorVisible(true)} size={14} />
        </View>
    </View>;
};

export const styles = StyleSheet.create({
    stat_container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
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
    icon: {
        padding: 0, margin: 0,
        color: "#000"
    },
})
