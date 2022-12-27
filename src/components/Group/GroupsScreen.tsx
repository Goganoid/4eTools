import React, { useContext, useEffect } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Button, Dialog, IconButton, Portal, Surface, Text, TextInput, useTheme } from 'react-native-paper';
import { v4 as uuid } from 'uuid';
import { getSavedGroups } from '../../data/storage';
import { GroupsContext } from '../../Navigators/GroupsStackNavigator';
import { EncounterContext } from '../../Navigators/MainDrawer';
import MenuDrawer from '../shared/MenuDrawer';
import { CustomThemeProvider } from '../shared/ThemeProvider';
import limitLength from '../../helpers/limitLength';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EntityMode, GroupsStackParamList } from '../../Navigators/navigatorTypes';
export const GroupsScreen = ({ navigation, route }: NativeStackScreenProps<GroupsStackParamList, 'GroupsTable'>) => {
    const theme = useTheme();
    const [loading, setLoading] = React.useState(true);

    const [visibleNameDialog, setVisibleNameDialog] = React.useState(false);
    const [enteredSymbolOnce, setEnteredSymbolOnce] = React.useState(false);
    const [invalidName, setInvalidName] = React.useState(true);
    const [groupName, setGroupName] = React.useState('');

    const showDialog = () => setVisibleNameDialog(true);

    const hideDialog = () => setVisibleNameDialog(false);

    const context = useContext(GroupsContext);
    const encounterContext = useContext(EncounterContext);
    if (context == null || encounterContext == null) {
        console.log("Context is null");
        return;
    }
    React.useEffect(() => {
        navigation.setOptions({
            headerLeft: () => MenuDrawer(navigation),
            headerRight: () => (
                <IconButton icon="plus"
                    onPress={createGroup} />
            ),
        });
    }, [navigation, context]);

    const createGroup = () => {
        showDialog();
    }

    useEffect(() => {
        getSavedGroups().then(groups => {
            console.log("Test ", context);
            console.log("Loaded groups ", groups);
            context.setGroups(Object.values(groups));
            console.log("After setGroup")
            setLoading(false);
        })
    }, [])

    return (
        <CustomThemeProvider>
            <>
                <ScrollView style={{ backgroundColor: theme.colors.background }}>
                    <View style={styles.groups_table}>
                        {context.groups.map((group, index) => {
                            return (
                                <Surface style={styles.group} key={index}>
                                    <TouchableOpacity style={styles.groupContainer} key={index} onPress={() => navigation.navigate("Group", { groupId: group.id, mode:EntityMode.group })}>
                                        <View style={styles.title}>
                                            <Text variant='titleMedium' style={styles.encounter_name}> {limitLength(group.name, 15)}</Text>
                                            <IconButton icon="plus-circle-outline" size={20} onPress={() => {
                                                let entities = [...group.entities].map(entity => { return { ...entity, uuid: uuid() } });
                                                encounterContext.addEntities(entities);
                                                showMessage({
                                                    message: `Entities were added to the encounter`,
                                                    type: "info",
                                                    backgroundColor: theme.colors.primary
                                                });
                                            }} />
                                        </View>
                                        <Text>Creatures: {group.entities.length}</Text>
                                    </TouchableOpacity>
                                </Surface>
                            )
                        })}
                    </View>
                </ScrollView>
                <Portal>
                    <Dialog visible={visibleNameDialog} onDismiss={() => {
                        // setGroupName('');
                        hideDialog();
                    }}>
                        <Dialog.Title>Alert</Dialog.Title>
                        <Dialog.Content>
                            <TextInput
                                label='Group Name'
                                value={groupName}
                                maxLength={50}
                                error={invalidName && enteredSymbolOnce}
                                onChangeText={text => {
                                    if (!enteredSymbolOnce) setEnteredSymbolOnce(true)
                                    else if (text.length == 0) setInvalidName(true)
                                    else if (text.length != 0) setInvalidName(false)
                                    setGroupName(text)
                                }
                                }
                            />
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={() => {
                                if (invalidName) return;

                                context.addGroup({
                                    name: groupName,
                                    id: uuid(),
                                    entities: [],
                                });
                                hideDialog();
                                setGroupName('');

                            }}>Done</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </>
        </CustomThemeProvider>
    )
}

const styles = StyleSheet.create({
    title: {
        flexDirection: "row",
        paddingRight: 5,
        // alignItems: "center",
        justifyContent: "space-between",
        width: "100%"
    },
    encounter_name: {
        fontWeight: "bold",
        textAlign: 'left',
        flexBasis: '50%'
    },
    groups_table: {
        flexDirection: "row",
        // justifyContent: "space-around",
        marginTop: 10,
        flexWrap: "wrap"
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