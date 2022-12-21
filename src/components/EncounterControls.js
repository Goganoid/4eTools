import React from 'react';
import { FAB, Portal } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export function EncounterControls({ open, navigation, onStateChange, addEntity }) {
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
                    onPress: () => navigation.navigate("AddCardCustom", { isHeroTab: false })
                },

                {
                    icon: 'emoticon-happy',
                    label: 'Hero',
                    onPress: () => navigation.navigate("AddCardCustom", { isHeroTab: true }),
                },
                {
                    icon: 'emoticon-devil',
                    label: 'Enemy',
                    onPress: () => navigation.navigate("AddMonster", { showAddScreen: true }),
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
        marginBottom:70,
        // right: 0,
        // bottom: 0,
    },
})