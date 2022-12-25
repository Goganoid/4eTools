import React from 'react';
import { View } from 'react-native';
import { Button, Dialog, TextInput } from 'react-native-paper';
import { styles } from '../Encounter/Stat';

export function StatEditor({ isDialogVisible, setIsDialogVisible, statName, value, setValue, onChange }) {
    console.log("New stat value ", value);
    const ChangeByButton = ({ modifier }) => {
        return <Button style={styles.changeby} mode="contained" onPress={() => {
            const parsed = parseInt(value) || 0;
            let newValue = (parsed + modifier);
            setValue(newValue.toString());
        }}>{modifier > 0 && '+'}{modifier}</Button>;
    };

    return <Dialog
        visible={isDialogVisible}
        onDismiss={() => setIsDialogVisible(false)}>
        <Dialog.Title>{statName}</Dialog.Title>
        <Dialog.Content>
            <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "center" }}>
                <View>
                    <ChangeByButton modifier={1} />
                    <ChangeByButton modifier={5} />
                    <ChangeByButton modifier={10} />
                </View>
                <TextInput
                    keyboardType='number-pad'
                    mode='outlined'
                    value={value}
                    maxLength={5}
                    onChangeText={value => setValue(value)}
                    style={styles.input} />
                <View>
                    <ChangeByButton modifier={-1} />
                    <ChangeByButton modifier={-5} />
                    <ChangeByButton modifier={-10} />
                </View>
            </View>
        </Dialog.Content>
        <Dialog.Actions>
            <Button onPress={() => {
                if(onChange)
                    onChange(value);
                setIsDialogVisible(false);
            }}>Done</Button>
        </Dialog.Actions>
    </Dialog>;
}
