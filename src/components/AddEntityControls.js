import React from 'react';
import { IconButton } from 'react-native-paper';

export function AddEntityControls(save, create) {
    return <>
        <IconButton icon="content-save" onPress={save} />
        <IconButton icon="check" onPress={create} />
    </>;
}
