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
                onPress={()=>navigation.navigate("Monster")}
            />
            <List.Item
                title="Weapons"
                left={props => <List.Icon {...props} icon="sword" />}
                onPress={()=>navigation.navigate("Weapons")}
            />
            <List.Item
                title="Traps"
                left={props => <List.Icon {...props} icon="exclamation" />}
                onPress={()=>navigation.navigate("Trap")}
            />
            <List.Item
                title="Themes"
                left={props => <List.Icon {...props} icon="book-open-blank-variant" />}
                onPress={()=>navigation.navigate("Theme")}
            />
            <List.Item
                title="Rituals"
                left={props => <List.Icon {...props} icon="pentagram" />}
                onPress={()=>navigation.navigate("Ritual")}
            />
            <List.Item
                title="Races"
                left={props => <List.Icon {...props} icon="drama-masks" />}
                onPress={()=>navigation.navigate("Race")}
            />
            <List.Item
                title="Powers"
                left={props => <List.Icon {...props} icon="star-four-points" />}
                onPress={()=>navigation.navigate("Power")}
            />
            <List.Item
                title="Paragon Powers"
                left={props => <List.Icon {...props} icon="star-four-points" />}
                onPress={()=>navigation.navigate("ParagonPower")}
            />
            <List.Item
                title="Epic Powers"
                left={props => <List.Icon {...props} icon="star-four-points" />}
                onPress={()=>navigation.navigate("EpicPower")}
            />
            <List.Item
                title="Theme Powers"
                left={props => <List.Icon {...props} icon="star-four-points" />}
                onPress={()=>navigation.navigate("ThemePower")}
            />
            <List.Item
                title="Poison"
                left={props => <List.Icon {...props} icon="bottle-tonic-skull-outline" />}
                onPress={()=>navigation.navigate("Poison")}
            />
            <List.Item
                title="Paragon Path"
                left={props => <List.Icon {...props} icon="chess-bishop" />}
                onPress={()=>navigation.navigate("ParagonPath")}
            />
            <List.Item
                title="Item"
                left={props => <List.Icon {...props} icon="treasure-chest" />}
                onPress={()=>navigation.navigate("Item")}
            />
            <List.Item
                title="Implement"
                left={props => <List.Icon {...props} icon="magic-staff" />}
                onPress={()=>navigation.navigate("Implement")}
            />
            <List.Item
                title="Glossary"
                left={props => <List.Icon {...props} icon="book-alphabet" />}
                onPress={()=>navigation.navigate("Glossary")}
            />
             <List.Item
                title="Feat"
                left={props => <List.Icon {...props} icon="medal" />}
                onPress={()=>navigation.navigate("Feat")}
            />
            <List.Item
                title="Epic Destiny"
                left={props => <List.Icon {...props} icon="chess-king" />}
                onPress={()=>navigation.navigate("EpicDestiny")}
            />
            <List.Item
                title="Disease"
                left={props => <List.Icon {...props} icon="emoticon-sick-outline" />}
                onPress={()=>navigation.navigate("Disease")}
            />
            <List.Item
                title="Deity"
                left={props => <List.Icon {...props} icon="church" />}
                onPress={()=>navigation.navigate("Deity")}
            />
             <List.Item
                title="Companion"
                left={props => <List.Icon {...props} icon="dog-side" />}
                onPress={()=>navigation.navigate("Companion")}
            />
            <List.Item
                title="Class"
                left={props => <List.Icon {...props} icon="arrow-projectile-multiple" />}
                onPress={()=>navigation.navigate("Class")}
            />
            <List.Item
                title="Background"
                left={props => <List.Icon {...props} icon="script" />}
                onPress={()=>navigation.navigate("Background")}
            />
            <List.Item
                title="Armor"
                left={props => <List.Icon {...props} icon="shield" />}
                onPress={()=>navigation.navigate("Armor")}
            />
        </ScrollView>
    )
}
