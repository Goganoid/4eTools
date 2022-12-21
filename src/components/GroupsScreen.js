import React, { useContext, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity,ScrollView } from 'react-native'
import { Text, Surface, IconButton, Dialog, Portal, Provider, TextInput, Button, TouchableRipple } from 'react-native-paper'
import { GroupsContext } from '../Navigators/GroupsStackNavigator'
import { v4 as uuid } from 'uuid'
import { CustomThemeProvider } from './ThemeProvider'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { EncounterContext } from '../App'
import { getSavedGroups } from '../data/storage'
import { GroupContext } from '../Navigators/GroupStackNavigator'
// import { EncounterContext } from '../Navigators/EncounterStackNavigator';
export const GroupsScreen = ({ navigation, route }) => {

    const [loading, setLoading] = React.useState(true);

    const [visibleNameDialog, setVisibleNameDialog] = React.useState(false);
    const [enteredSymbolOnce, setEnteredSymbolOnce] = React.useState(false);
    const [invalidName, setInvalidName] = React.useState(true);
    const [groupName, setGroupName] = React.useState('');

    const showDialog = () => setVisibleNameDialog(true);

    const hideDialog = () => setVisibleNameDialog(false);

    const context = useContext(GroupsContext);
    const encounterContext = useContext(EncounterContext);
    React.useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <IconButton icon="plus"
                    onPress={createGroup} />
            ),
        });
    }, [navigation, context]);

    const createGroup = () => {
        showDialog(true);
    }

    useEffect(() => {
        getSavedGroups().then(groups => {
            console.log("Test ", context);
            console.log("Loaded groups ", groups);
            context.setGroups(Object.values(groups));
            console.log("After setGroup")
            setLoading(false);
        })
    },[])
    
    return (
        <CustomThemeProvider>
            <ScrollView>
                <View style={styles.groups_table}>
                    {context.groups.map((group, index) => {
                        return (
                                <Surface  style={styles.group} key={index}>
                                <TouchableOpacity style={styles.groupContainer} key={index} onPress={() => navigation.navigate("Group",{id:group.id})}>
                                    <View style={styles.title}>
                                        <Text variant='titleMedium' style={styles.encounter_name}> {group.name}</Text>
                                        <IconButton icon="plus-circle-outline" size={20} color={"#000"} onPress={() => {
                                            let entities = [...group.entities].map(entity => { return { ...entity, uuid:uuid() } });
                                            encounterContext.addEntities(entities);
                
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
                    setGroupName('');
                    hideDialog();
                }}>
                    <Dialog.Title>Alert</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            label='Group Name'
                            value={groupName}
                            maxLength={15}
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
        </CustomThemeProvider>
    )
}

const styles = StyleSheet.create({
    title: {
        flexDirection: "row",
        paddingRight: 5,
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%"
    },
    encounter_name: {
        fontWeight: "bold",
        textAlign: 'left'
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
        marginHorizontal:"2%",
        borderWidth: 0.5,
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: "45%",
    }
})