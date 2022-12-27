import React from 'react';
import { FAB, Portal } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PowerTrackerParams } from '../../types/navigatorTypes';
import { Category, CategoryMode } from '../../types/entityTypes';

type Props = {
    open: boolean,
    navigation: NativeStackNavigationProp<PowerTrackerParams, 'PowerTracker'>,
    onStateChange:({open}:{open:boolean})=>void,
}

export function PowerTrackerControls({ open, navigation, onStateChange }:Props) {
    return <Portal>
        <FAB.Group fabStyle={styles.fab}

            open={open}
            visible
            icon={open ? 'plus' : 'plus'}
            theme={{ colors: { backdrop: 'transparent' } }}
            actions={[
                {
                    icon: 'plus',
                    label: 'Custom',
                    onPress: () => navigation.navigate("AddCustomPower")
                },
                {
                    icon: 'star-four-points',
                    label: 'Power',
                    onPress: () => navigation.navigate("AddPower"),
                },
            ]}
            onStateChange={onStateChange} />
    </Portal>;
}
export const styles = StyleSheet.create({
    fab: {
        margin: 8,
        padding:0,
        right: 0,
    },
})