import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { ScrollView } from 'react-native'
import { List } from 'react-native-paper'
import { CompendiumCategory, CompendiumCategoryMode } from '../../Navigators/entityTypes'
import { CompendiumListParams } from '../../Navigators/navigatorTypes'
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
                onPress={() => navigation.navigate("CompendiumList", { category: CompendiumCategory.bestiary, mode: CompendiumCategoryMode.compendium })}
            />
            <List.Item
                title="Weapons"
                left={props => <List.Icon {...props} icon="sword" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:CompendiumCategory.weapons,mode:CompendiumCategoryMode.compendium})}
            />
            <List.Item
                title="Traps"
                left={props => <List.Icon {...props} icon="exclamation" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:CompendiumCategory.trap,mode:CompendiumCategoryMode.compendium})}
            />
            <List.Item
                title="Themes"
                left={props => <List.Icon {...props} icon="book-open-blank-variant" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:CompendiumCategory.theme,mode:CompendiumCategoryMode.compendium})}
            />
            <List.Item
                title="Rituals"
                left={props => <List.Icon {...props} icon="pentagram" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:CompendiumCategory.ritual,mode:CompendiumCategoryMode.compendium})}
            />
            <List.Item
                title="Races"
                left={props => <List.Icon {...props} icon="drama-masks" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:CompendiumCategory.race,mode:CompendiumCategoryMode.compendium})}
            />
            <List.Item
                title="Powers"
                left={props => <List.Icon {...props} icon="star-four-points" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:CompendiumCategory.power,mode:CompendiumCategoryMode.compendium})}
            />
            <List.Item
                title="Paragon Powers"
                left={props => <List.Icon {...props} icon="star-four-points" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:CompendiumCategory.paragonpower,mode:CompendiumCategoryMode.compendium})}
            />
            <List.Item
                title="Epic Powers"
                left={props => <List.Icon {...props} icon="star-four-points" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:CompendiumCategory.epicdestinypower,mode:CompendiumCategoryMode.compendium})}
            />
            <List.Item
                title="Theme Powers"
                left={props => <List.Icon {...props} icon="star-four-points" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:CompendiumCategory.themepower,mode:CompendiumCategoryMode.compendium})}
            />
            <List.Item
                title="Poison"
                left={props => <List.Icon {...props} icon="bottle-tonic-skull-outline" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:CompendiumCategory.poison,mode:CompendiumCategoryMode.compendium})}
            />
            <List.Item
                title="Paragon Path"
                left={props => <List.Icon {...props} icon="chess-bishop" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:CompendiumCategory.paragonpath,mode:CompendiumCategoryMode.compendium})}
            />
            <List.Item
                title="Item"
                left={props => <List.Icon {...props} icon="treasure-chest" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:CompendiumCategory.item,mode:CompendiumCategoryMode.compendium})}
            />
            <List.Item
                title="Implement"
                left={props => <List.Icon {...props} icon="magic-staff" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:CompendiumCategory.implement,mode:CompendiumCategoryMode.compendium})}
            />
            <List.Item
                title="Glossary"
                left={props => <List.Icon {...props} icon="book-alphabet" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:CompendiumCategory.glossary,mode:CompendiumCategoryMode.compendium})}
            />
             <List.Item
                title="Feat"
                left={props => <List.Icon {...props} icon="medal" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:CompendiumCategory.feat,mode:CompendiumCategoryMode.compendium})}
            />
            <List.Item
                title="Epic Destiny"
                left={props => <List.Icon {...props} icon="chess-king" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:CompendiumCategory.epicdestiny,mode:CompendiumCategoryMode.compendium})}
            />
            <List.Item
                title="Disease"
                left={props => <List.Icon {...props} icon="emoticon-sick-outline" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:CompendiumCategory.disease,mode:CompendiumCategoryMode.compendium})}
            />
            <List.Item
                title="Deity"
                left={props => <List.Icon {...props} icon="church" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:CompendiumCategory.deity,mode:CompendiumCategoryMode.compendium})}
            />
             <List.Item
                title="Companion"
                left={props => <List.Icon {...props} icon="dog-side" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:CompendiumCategory.companion,mode:CompendiumCategoryMode.compendium})}
            />
            <List.Item
                title="Class"
                left={props => <List.Icon {...props} icon="arrow-projectile-multiple" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:CompendiumCategory.class,mode:CompendiumCategoryMode.compendium})}
            />
            <List.Item
                title="Background"
                left={props => <List.Icon {...props} icon="script" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:CompendiumCategory.background,mode:CompendiumCategoryMode.compendium})}
            />
            <List.Item
                title="Armor"
                left={props => <List.Icon {...props} icon="shield" />}
                onPress={()=>navigation.navigate("CompendiumList", {category:CompendiumCategory.armor,mode:CompendiumCategoryMode.compendium})}
            />
        </ScrollView>
    )
}
