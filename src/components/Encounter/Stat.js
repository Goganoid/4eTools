import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
    Button, Dialog,
    Portal, Text, TextInput, Modal
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

export const Stat = ({ statName, statValue, editable = true, onChange, minimalistic = false, style }) => {
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [newStatValue, setNewStatValueRaw] = useState(typeof (statValue) === 'number' ? statValue.toString() : statValue);

    const setNewStatValue = (value) => {
        const cleanValue = value.replace(/[,\.\s]/g, "");
        setNewStatValueRaw(cleanValue);
    }

    const ChangeByButton = ({ value }) => {
        return <Button style={styles.changeby} mode="contained" onPress={() => {
            const parsed = parseInt(newStatValue) || 0;
            setNewStatValue((parsed+value).toString())
        }} >{value>0 && '+'}{value}</Button>
    }

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
                        <View style={{flexDirection:"row", alignItems:"center",alignSelf:"center"}}>
                            <View>
                                <ChangeByButton value={1} />
                                <ChangeByButton value={5} />
                                <ChangeByButton value={10} />
                            </View>
                            <TextInput
                                keyboardType='number-pad'
                                mode='outlined'
                                value={newStatValue}
                                onChangeText={value => setNewStatValue(value)}
                                style={styles.input}
                            />
                            <View>
                                <ChangeByButton value={-1} />
                                <ChangeByButton value={-5} />
                                <ChangeByButton value={-10} />
                            </View>
                        </View>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => {

                            onChange(newStatValue);
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