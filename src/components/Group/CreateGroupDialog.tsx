import React from 'react';
import { Button, Dialog, TextInput } from 'react-native-paper';
import { v4 as uuid } from 'uuid';
import { GroupEntity } from '../../types/entityTypes';


export type CreateGroupDialogProps = {
    visibleNameDialog: boolean,
    setGroupName: (name: string) => void,
    hideCreationDialog: () => void,
    groupName: string,
    addGroup: (group: GroupEntity) => void
}


export function CreateGroupDialog({ visibleNameDialog, setGroupName, hideCreationDialog, groupName, addGroup }: CreateGroupDialogProps) {

    const [enteredSymbolOnce, setEnteredSymbolOnce] = React.useState(false);
    const [invalidName, setInvalidName] = React.useState(true);

    const hideReset = () => {
        setGroupName('');
        setInvalidName(true);
        setEnteredSymbolOnce(false);
        hideCreationDialog();
    };
    return <Dialog visible={visibleNameDialog} onDismiss={hideReset}>
        <Dialog.Title>Group Name</Dialog.Title>
        <Dialog.Content>
            <TextInput
                label='Group Name'
                value={groupName}
                maxLength={50}
                error={invalidName && enteredSymbolOnce}
                onChangeText={text => {
                    if (!enteredSymbolOnce)
                        setEnteredSymbolOnce(true);
                    else {
                        if (text.length == 0)
                            setInvalidName(true);
                        else if (text.length != 0)
                            setInvalidName(false);
                    }
                    setGroupName(text);
                }} />
        </Dialog.Content>
        <Dialog.Actions>
            <Button onPress={hideReset}>Cancel</Button>
            <Button onPress={() => {
                if (invalidName)
                    return;

                addGroup({
                    name: groupName,
                    id: uuid(),
                    entities: [],
                } as GroupEntity);
                hideReset();

            }}>Done</Button>
        </Dialog.Actions>
    </Dialog>;
}
