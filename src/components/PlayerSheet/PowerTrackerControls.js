import React from 'react';
import { FAB, Portal } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export function PowerTrackerControls({ open, navigation, onStateChange }) {
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
        // position: 'absolute',
        margin: 8,
        padding:0,
        // marginBottom:70,
        right: 0,
        // bottom: 50,
    },
})