import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Dialog, TextInput } from 'react-native-paper';

type Props = {
    isDialogVisible: boolean,
    setIsDialogVisible: (visible: boolean) => void,
    statName: string,
    value: number,
    onSubmit?: (value: number) => void,
    onlyPositive?: boolean
}

export function StatEditor({ isDialogVisible, setIsDialogVisible, statName, value, onSubmit, onlyPositive = false }: Props) {

    const [text, setText] = useState(value.toString())

    const ChangeByButton = ({ modifier }: { modifier: number }) => {
        return <Button style={styles.changeby} mode="contained" onPress={() => {
            const parsed = parseInt(text) || 0;
            let newValue = (parsed + modifier);
            setText(newValue.toString());
        }}>{modifier > 0 && '+'}{modifier}</Button>;
    };

    useEffect(() => {
        setText(value.toString() || '');
    }, [value])

    const onChangeText = (newText: string) => {
        let cleanText = newText.replace(/[,\.\s]/g, "");
        if (onlyPositive) cleanText = cleanText.replace("-", ""); 
        let parsed = parseInt(cleanText);
        if (parsed > 2000) return;
        else if (parsed < -2000) return;
        else setText(cleanText)
    }

    return <Dialog
        visible={isDialogVisible}
        onDismiss={() => setIsDialogVisible(false)}>
        <Dialog.Title>{statName}</Dialog.Title>
        <Dialog.Content>
            <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "center" }}>
                <View>
                    {
                        (onlyPositive ? [1, 5] : [1, 5, 10]).map((mod, ind) =>
                            <ChangeByButton modifier={mod} key={ind} />
                        )
                    }

                    {/* <ChangeByButton modifier={5} /> */}
                    {/* <ChangeByButton modifier={10} /> */}
                </View>
                <TextInput
                    keyboardType='number-pad'
                    mode='outlined'
                    value={text}
                    maxLength={5}
                    onChangeText={onChangeText}
                    style={styles.input} />
                <View>
                    {
                        (onlyPositive ? [10, 50] : [-1, -5, -10]).map((mod, ind) =>
                            <ChangeByButton modifier={mod} key={ind} />
                        )
                    }
                    {/* <ChangeByButton modifier={onlyPositive? 20 :-1} />
                    <ChangeByButton modifier={-5} />
                    <ChangeByButton modifier={-10} /> */}
                </View>
            </View>
        </Dialog.Content>
        <Dialog.Actions>
            <Button onPress={() => {
                if (onSubmit) {
                    onSubmit(parseInt(text) || 0);
                }
                setText(value.toString());
                setIsDialogVisible(false);
            }}>Done</Button>
        </Dialog.Actions>
    </Dialog>;
}

const styles = StyleSheet.create({
    input: {
        marginHorizontal: 10,
        padding: 10
    },
    changeby: {
        marginTop: 10,
    }
});
