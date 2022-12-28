import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Dialog, IconButton, Paragraph, Portal, Surface, Text, Button } from 'react-native-paper';
import { v4 as uuid } from 'uuid';
import limitLength from '../../helpers/limitLength';
import { roll20 } from '../../helpers/roll20';
import { Entity } from '../../types/entityTypes';
import { EncounterMode } from '../../types/navigatorTypes';
import { CustomThemeProvider } from '../shared/ThemeProvider';

export type GroupItemProps = {
    navigation: any,
    group: any,
    addEntities: (entities: Array<Entity>) => void,
    showSuccessMessage: () => void;
}


export const GroupItem = ({ navigation, group, addEntities, showSuccessMessage }: GroupItemProps) => {

    const [visible, setVisible] = React.useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    return (
        <>
            <Surface style={styles.group}>
                <TouchableOpacity style={styles.groupContainer} onPress={() => navigation.navigate("Group", { groupId: group.id, mode: EncounterMode.group })}>
                    <View style={styles.title}>
                        <Text variant='titleMedium' style={styles.encounter_name}> {limitLength(group.name, 15)}</Text>
                        <IconButton icon="plus-circle-outline" size={20} onPress={() => {
                            // let entities = [...group.entities].map(entity => { return { ...entity, uuid: uuid() }; });
                            // addEntities(entities);
                            // showSuccessMessage();
                            showDialog();
                        }} />
                    </View>
                    <Text>Creatures: {group.entities.length}</Text>
                </TouchableOpacity>
            </Surface>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Add to the encounter</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>How to roll initiative for entities?</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Cancel</Button>
                        <Button onPress={() => {
                            let entities = [...group.entities].map(entity => { return { ...entity, uuid: uuid() }; });
                            addEntities(entities);
                            showSuccessMessage();
                            hideDialog();
                        }}>Individually</Button>
                        <Button onPress={() => {
                            const roll = roll20();
                            let entities = [...group.entities].map(entity => { return { ...entity, uuid: uuid(), initiativeRoll: roll }; });
                            addEntities(entities);
                            showSuccessMessage();
                            hideDialog();
                        }}>Together</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </>
    );
}

export const styles = StyleSheet.create({
    title: {
        flexDirection: "row",
        paddingRight: 5,
        justifyContent: "space-between",
        width: "100%"
    },
    encounter_name: {
        fontWeight: "bold",
        textAlign: 'left',
        flexBasis: '50%'
    },
    groupContainer: {
        padding: 5,
        alignItems: "flex-start",
        justifyContent: "space-around",
    },
    group: {
        marginTop: 10,
        height: 100,
        marginHorizontal: "2%",
        borderWidth: 0.5,
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: "45%",
    }
})