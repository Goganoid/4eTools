import { useEffect, useState } from 'react';
import { StyleSheet, Touchable, TouchableOpacity, View } from 'react-native';
import { IconButton, Text, TextInput, useTheme } from 'react-native-paper';
import { setFormatedStatValue } from './PowerTracker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
type Props = {
    name: string;
    setValue: (value: number) => void;
    value: number;
    maxValue: number;
    allowNegative?: boolean;
    isHp?: boolean;
    setEditorVisible: (visible: boolean) => void;
};
export const PlayerStat = ({ name, setValue, value, maxValue, allowNegative = true,isHp=false, setEditorVisible }: Props) => {
    const theme = useTheme();
    const minValue = allowNegative ? -99 : 0;
    const [text, setText] = useState(value.toString());

    useEffect(() => {
        setText(typeof (value) === 'number' ? value.toString() : value);
    }, [value]);

    const decrease = () => {
        const newValue = value - 1;
        if (newValue < minValue)
            return;
        setValue(newValue);
    };
    const increase = () => {
        const newValue = value + 1;
        if (newValue > maxValue)
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
            <Text>{name}<Icon name='restart' onPress={() => { setValue(maxValue) }} size={14} /></Text>
        </View>
        <View style={styles.stat_container}>
            <IconButton icon='minus' style={styles.icon}
                onPress={decrease} />
            <TextInput mode='outlined'
                textColor={(isHp && value<=Math.floor(maxValue/2.0)) ? theme.colors.error : "black"}
                style={[styles.statInput]}
                onChangeText={onChangeText}
                onSubmitEditing={onSumbitEditing}
                value={text}
                keyboardType='number-pad' />
            <IconButton icon='plus' style={styles.icon}
                onPress={increase} />
        </View>
        <View>
            <TouchableOpacity style={{
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderRadius: 5,
                padding: 3,
                marginTop:2,
            }} onPress={() => setEditorVisible(true)}>
                <Text style={{ fontSize: 10 }}>
                    <Text style={styles.bold_text}>MAX:</Text>{maxValue}</Text>
                {/* <Icon name='pencil'
                    style={styles.icon}
                    size={12}
                    color={"#808080"} /> */}
                
            </TouchableOpacity>
        </View>
    </View>;
};

export const styles = StyleSheet.create({
    stat_container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    bold_text: {
        fontWeight: "bold",
       fontSize:10,
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
