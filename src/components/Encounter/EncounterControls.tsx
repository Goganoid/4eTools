import React from 'react';
import { FAB, Portal } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { EncounterStackParamList, GroupStackParamList } from '../../types/navigatorTypes';
import { Category } from '../../types/entityTypes';
type Props = {
    navigation: NativeStackNavigationProp<EncounterStackParamList, 'Encounter'>
    |NativeStackNavigationProp<GroupStackParamList, "EntitiesList">,
    open: boolean,
    onStateChange: ({open}:{open:boolean}) => void
}

export function EncounterControls({ open, navigation, onStateChange }:Props) {
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
                    // @ts-ignore
                    onPress: () => navigation.navigate("AddCardCustom", { isHeroTab: false })
                },

                {
                    icon: 'emoticon-happy',
                    label: 'Hero',
                     // @ts-ignore
                    onPress: () => navigation.navigate("AddCardCustom", { isHeroTab: true }),
                },
                {
                    icon: 'emoticon-devil',
                    label: 'Enemy',
                     // @ts-ignore
                    onPress: () => navigation.navigate("AddMonster",{hook:(item:any)=>{console.log("CALLED HOOK")}}),
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