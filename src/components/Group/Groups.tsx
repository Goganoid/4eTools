import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { IconButton, Portal, useTheme } from 'react-native-paper';
import { EncounterContext } from '../../context/EncounterContext';
import { getSavedGroups } from '../../data/storage';
import { GroupsContext } from '../../Navigators/GroupsStack';
import { Entity, GroupEntity } from '../../types/entityTypes';
import { GroupsStackParamList } from '../../types/navigatorTypes';
import MenuDrawer from '../shared/MenuDrawer';
import { CustomThemeProvider } from '../shared/ThemeProvider';
import { CreateGroupDialog } from './CreateGroupDialog';
import { GroupItem } from './GroupItem';

export const Groups = ({ navigation }: NativeStackScreenProps<GroupsStackParamList, 'GroupsTable'>) => {
    const theme = useTheme();

    const [visibleNameDialog, setVisibleNameDialog] = React.useState(false);
   
    const [groupName, setGroupName] = React.useState('');

    const showCreationDialog = () => setVisibleNameDialog(true);

    const hideCreationDialog = () => setVisibleNameDialog(false);

    const context = useContext(GroupsContext);
    const encounterContext = useContext(EncounterContext);
    if (context == null) throw " Groups ontext is null";
    if (encounterContext == null) throw "Encounter context is null";
    React.useEffect(() => {
        navigation.setOptions({
            headerLeft: () => MenuDrawer(navigation),
            headerRight: () => (
                <IconButton icon="plus"
                    onPress={showCreationDialog} />
            ),
        });
    }, [navigation, context]);

    useEffect(() => {
        getSavedGroups().then(groups => {
            if (groups != null) context.setGroups(groups);
        })
    }, [])

    const addEntities = (entities: Array<Entity>) => encounterContext.addEntities(entities);

    const showSuccessMessage = () => showMessage({
        message: `Entities were added to the encounter`,
        type: "info",
        backgroundColor: theme.colors.primary
    });

    return (
        <CustomThemeProvider>
            <>
                <ScrollView style={{ backgroundColor: theme.colors.background }}>
                    <View style={styles.groups_table}>
                        {context.groups.map((group, index) => {
                            return (
                                <GroupItem
                                    key={index}
                                    addEntities={addEntities}
                                    group={group}
                                    navigation={navigation}
                                    showSuccessMessage={showSuccessMessage}
                                />)})}
                    </View>
                </ScrollView>
                <Portal>
                    <CreateGroupDialog
                        addGroup={(group: GroupEntity) => context.addGroup(group)}
                        groupName={groupName}
                        setGroupName={setGroupName}
                        hideCreationDialog={hideCreationDialog}
                        visibleNameDialog={visibleNameDialog}
                    />
                </Portal>
            </>
        </CustomThemeProvider>
    )
}

export const styles = StyleSheet.create({
    groups_table: {
        flexDirection: "row",
        marginTop: 10,
        flexWrap: "wrap"
    },
})


