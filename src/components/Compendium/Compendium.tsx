import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { ScrollView } from 'react-native'
import { List } from 'react-native-paper'
import { Category } from '../../types/entityTypes'
import { CompendiumListParams } from '../../types/navigatorTypes'
import MenuDrawer from '../shared/MenuDrawer'
export const Compendium = ({ navigation } : NativeStackScreenProps<CompendiumListParams,'CompendiumMainPage'>) => {
    

    React.useEffect(() => {
        navigation.setOptions({
            headerLeft: ()=>MenuDrawer(navigation),
        });
    }, [navigation]);

    return (
        <ScrollView>
            <List.Item
                title="Bestiary"
                left={props => <List.Icon {...props} icon="emoticon-devil" />}
                onPress={() => navigation.navigate("CompendiumList", { category: Category.bestiary })}
            />
            <List.Item
                title="Weapons"
                left={props => <List.Icon {...props} icon="sword" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:Category.weapons})}
            />
            <List.Item
                title="Traps"
                left={props => <List.Icon {...props} icon="exclamation" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:Category.trap})}
            />
            <List.Item
                title="Themes"
                left={props => <List.Icon {...props} icon="book-open-blank-variant" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:Category.theme})}
            />
            <List.Item
                title="Rituals"
                left={props => <List.Icon {...props} icon="pentagram" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:Category.ritual})}
            />
            <List.Item
                title="Races"
                left={props => <List.Icon {...props} icon="drama-masks" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:Category.race})}
            />
            <List.Item
                title="Powers"
                left={props => <List.Icon {...props} icon="star-four-points" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:Category.power})}
            />
            <List.Item
                title="Paragon Powers"
                left={props => <List.Icon {...props} icon="star-four-points" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:Category.paragonpower})}
            />
            <List.Item
                title="Epic Powers"
                left={props => <List.Icon {...props} icon="star-four-points" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:Category.epicdestinypower})}
            />
            <List.Item
                title="Theme Powers"
                left={props => <List.Icon {...props} icon="star-four-points" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:Category.themepower})}
            />
            <List.Item
                title="Poison"
                left={props => <List.Icon {...props} icon="bottle-tonic-skull-outline" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:Category.poison})}
            />
            <List.Item
                title="Paragon Path"
                left={props => <List.Icon {...props} icon="chess-bishop" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:Category.paragonpath})}
            />
            <List.Item
                title="Item"
                left={props => <List.Icon {...props} icon="treasure-chest" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:Category.item})}
            />
            <List.Item
                title="Implement"
                left={props => <List.Icon {...props} icon="magic-staff" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:Category.implement})}
            />
            <List.Item
                title="Glossary"
                left={props => <List.Icon {...props} icon="book-alphabet" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:Category.glossary})}
            />
             <List.Item
                title="Feat"
                left={props => <List.Icon {...props} icon="medal" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:Category.feat})}
            />
            <List.Item
                title="Epic Destiny"
                left={props => <List.Icon {...props} icon="chess-king" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:Category.epicdestiny})}
            />
            <List.Item
                title="Disease"
                left={props => <List.Icon {...props} icon="emoticon-sick-outline" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:Category.disease})}
            />
            <List.Item
                title="Deity"
                left={props => <List.Icon {...props} icon="church" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:Category.deity})}
            />
             <List.Item
                title="Companion"
                left={props => <List.Icon {...props} icon="dog-side" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:Category.companion})}
            />
            <List.Item
                title="Class"
                left={props => <List.Icon {...props} icon="arrow-projectile-multiple" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:Category.class})}
            />
            <List.Item
                title="Background"
                left={props => <List.Icon {...props} icon="script" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:Category.background})}
            />
            <List.Item
                title="Armor"
                left={props => <List.Icon {...props} icon="shield" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:Category.armor})}
            />
        </ScrollView>
    )
}
