import React from 'react'
import { View,ScrollView } from 'react-native'
import { Text } from 'react-native-paper'
import { List } from 'react-native-paper'
export const Compendium = ({navigation}) => {
    return (

        <ScrollView>
            <List.Item
                title="Bestiary"
                left={props => <List.Icon {...props} icon="emoticon-devil" />}
                onPress={()=>navigation.navigate("Bestiary")}
            />
            <List.Item
                title="Weapons"
                left={props => <List.Icon {...props} icon="sword" />}
                onPress={()=>navigation.navigate("Weapons")}
            />
            <List.Item
                title="Traps"
                left={props => <List.Icon {...props} icon="exclamation" />}
            />
            <List.Item
                title="Themes"
                left={props => <List.Icon {...props} icon="book-open-blank-variant" />}
            />
            <List.Item
                title="Rituals"
                left={props => <List.Icon {...props} icon="pentagram" />}
            />
            <List.Item
                title="Races"
                left={props => <List.Icon {...props} icon="drama-masks" />}
            />
            <List.Item
                title="Powers"
                left={props => <List.Icon {...props} icon="star-four-points" />}
            />
            <List.Item
                title="Poison"
                left={props => <List.Icon {...props} icon="bottle-tonic-skull-outline" />}
            />
            <List.Item
                title="Paragon Path"
                left={props => <List.Icon {...props} icon="chess-bishop" />}
            />
            <List.Item
                title="Item"
                left={props => <List.Icon {...props} icon="treasure-chest" />}
            />
            <List.Item
                title="Implement"
                left={props => <List.Icon {...props} icon="magic-staff" />}
            />
            <List.Item
                title="Glossary"
                left={props => <List.Icon {...props} icon="book-alphabet" />}
            />
             <List.Item
                title="Feat"
                left={props => <List.Icon {...props} icon="medal" />}
            />
            <List.Item
                title="Epic Destiny"
                left={props => <List.Icon {...props} icon="chess-king" />}
            />
            <List.Item
                title="Disease"
                left={props => <List.Icon {...props} icon="emoticon-sick-outline" />}
            />
            <List.Item
                title="Deity"
                left={props => <List.Icon {...props} icon="church" />}
            />
             <List.Item
                title="Companion"
                left={props => <List.Icon {...props} icon="dog-side" />}
            />
            <List.Item
                title="Class"
                left={props => <List.Icon {...props} icon="arrow-projectile-multiple" />}
            />
            <List.Item
                title="Background"
                left={props => <List.Icon {...props} icon="script" />}
            />
            <List.Item
                title="Armor"
                left={props => <List.Icon {...props} icon="shield" />}
            />
        </ScrollView>
    )
}
