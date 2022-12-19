import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
    Button, Dialog,
    Portal, Text, TextInput
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

export const Stat = ({ statName, statValue, editable = true, onChange, minimalistic = false, style }) => {
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [text, setText] = useState(typeof (statValue) === 'number' ? statValue.toString() : statValue);
    return (
        <><View>

            <View style={{ ...styles.def_stat, ...style }} >
                {minimalistic ? null : <Text style={styles.bold_text} >{statName}:</Text>}
                <Text onPress={() => setIsDialogVisible(true)}>{statValue}</Text>
                <Icon name="pencil" size={12} color="black" style={{ paddingTop: 2.5, paddingLeft: 2.5 }} onPress={() => setIsDialogVisible(true)} />
            </View>
            <Portal>
                <Dialog
                    visible={isDialogVisible}
                    onDismiss={() => setIsDialogVisible(false)}>
                    <Dialog.Title>{statName}</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            keyboardType='numeric'
                            value={text}
                            onChangeText={value => setText(value)}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => {

                            onChange(text);
                            setIsDialogVisible(false)
                        }}>Done</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>

        </>
    )
}
const styles = StyleSheet.create({
    bold_text: {
        fontWeight: "bold"
    },
    def_stat: {
        paddingHorizontal: 5,
        flexDirection: "row",
        alignItems: "flex-start"
    }
});