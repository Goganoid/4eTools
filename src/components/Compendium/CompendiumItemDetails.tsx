import React from 'react';
import { ScrollView, useWindowDimensions } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { IconButton, useTheme } from 'react-native-paper';
import RenderHtml, { defaultHTMLElementModels, HTMLContentModel } from 'react-native-render-html';
// import { EncounterContext } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createEnemy, createPower } from '../../helpers/entities';
import { CompendiumCategoryParams } from '../../Navigators/CompendiumListStack';
import { CompendiumCategory, CompendiumCategoryMode } from '../../Navigators/CompendiumStackNavigator';
import { GroupContext } from '../../Navigators/GroupStackNavigator';
import { EncounterContext } from '../../Navigators/MainDrawer';
import { PowerTrackerContext } from '../../Navigators/PowerTrackerStack';
import { CustomThemeProvider } from '../shared/ThemeProvider';
const headStyle = {
    fontSize: 20,
    padding: 0,
};

const classesStyles = {
    mihead: { ...headStyle },
    thHead: { ...headStyle },
    player: { ...headStyle },
    trap: headStyle,
    milevel: {
        fontSize: 14,
    },
    miflavor: {
        backgroundColor: "#CCC",
        lineHeight: 25,
    },
    alt: {
        lineHeight: 20,
        backgroundColor: "#CCC"
    },
    indent: {
        marginLeft: 30,
        marginVertical: 0,
    },
    tbod: {
        marginLeft: 30,
        marginVertical: 0,
    },
    powerstat: {
        marginLeft: 30,
        marginVertical: 0,
    },
    indent1: {
        marginLeft: 30,
        marginVertical: 0,
    },
    mic4: {
        width: 0,
    },
    trapblocktitle: {
        fontWeight: "bold"
    },
    monster: headStyle,
    flavor: {
        lineHeight: 25,
    },
    flavorIndent: {
        marginLeft: 30,
        marginVertical: 0,
    }
};
const tagsStyles = {
    body: {
        color: "black",
        backgroundColor: "#f8f8f8"
    },
    p: {
        paddingHorizontal: 5,
        color: "black"
    },
    h1: {
        color: "black",
    },
    td: {
        color: "black",
        backgroundColor: "#e0e0e0",
    },
    table: {
        padding: 5,
        fontSize: 10,
    },

}

export const CompendiumItemDetails = ({ route, navigation }: NativeStackScreenProps<CompendiumCategoryParams, 'ItemDetails'>) => {
    const theme = useTheme();
    const { id, category } = route.params;
    const mode = route.params.mode;
    const context: any =
        mode == CompendiumCategoryMode.group ? React.useContext(GroupContext) :
            mode ==  CompendiumCategoryMode.encounter ? React.useContext(EncounterContext) :
                mode == CompendiumCategoryMode.power ? React.useContext(PowerTrackerContext) : null;
    console.log(CompendiumCategory[category],mode, CompendiumCategoryMode[mode], context, mode ==  CompendiumCategoryMode.encounter);
    let details:any = {};
    if (category == CompendiumCategory.bestiary) details = require('../../data/monster/data.json');
    if (category == CompendiumCategory.weapons) details = require('../../data/weapons/data.json');
    if (category == CompendiumCategory.trap) details = require('../../data/trap/data.json');
    if (category == CompendiumCategory.theme) details = require('../../data/theme/data.json');
    if (category == CompendiumCategory.ritual) details = require('../../data/ritual/data.json');
    if (category == CompendiumCategory.race) details = require('../../data/race/data.json');
    if (category == CompendiumCategory.power) details = require('../../data/power/data.json');
    if (category == CompendiumCategory.paragonpower) details = require('../../data/paragonpower/data.json');
    if (category == CompendiumCategory.themepower) details = require('../../data/themepower/data.json');
    if (category == CompendiumCategory.epicdestinypower) details = require('../../data/epicdestinypower/data.json');
    if (category == CompendiumCategory.poison) details = require('../../data/poison/data.json');
    if (category == CompendiumCategory.paragonpath) details = require('../../data/paragonpath/data.json');
    if (category == CompendiumCategory.item) details = require('../../data/item/data.json');
    if (category == CompendiumCategory.implement) details = require('../../data/implement/data.json');
    if (category == CompendiumCategory.glossary) details = require('../../data/glossary/data.json');
    if (category == CompendiumCategory.feat) details = require('../../data/feat/data.json');
    if (category == CompendiumCategory.epicdestiny) details = require('../../data/epicdestiny/data.json');
    if (category == CompendiumCategory.disease) details = require('../../data/disease/data.json');
    if (category == CompendiumCategory.deity) details = require('../../data/deity/data.json');
    if (category == CompendiumCategory.companion) details = require('../../data/companion/data.json');
    if (category == CompendiumCategory.class) details = require('../../data/class/data.json');
    if (category == CompendiumCategory.background) details = require('../../data/background/data.json');
    if (category == CompendiumCategory.armor) details = require('../../data/armor/data.json');
    const { width } = useWindowDimensions();
    const source = {
        html: details[id]
    }
    // console.log(source);
    const customHTMLElementModels = {
        span: defaultHTMLElementModels.span.extend({
            contentModel: HTMLContentModel.block,
        }),
    };

    React.useEffect(() => {

        navigation.setOptions({
            headerRight: () => (
                <>
                    {context &&
                        <IconButton
                            icon='check'
                            onPress={create} />}
                </>
            ),
        });
    }, [navigation, context]);

    const create = async () => {
        if (context != null && category == CompendiumCategory.bestiary) {
            let entity = createEnemy(id);
            context.addEntity(entity);
            showMessage({
                message: `Monster was added`,
                type: "info",
                backgroundColor: theme.colors.primary
            });
        }
        if (context != null && category == CompendiumCategory.power) {
            let power = createPower(id)
            context.addPower(power);
            showMessage({
                message: `Power was added`,
                type: "info",
                backgroundColor: theme.colors.primary
            });
        }
    }
    return (
        <CustomThemeProvider>
            <ScrollView style={{ paddingHorizontal: 10, backgroundColor: "#f8f8f8" }}>
                <RenderHtml
                    contentWidth={width}
                    source={source}
                    // @ts-ignore
                    classesStyles={classesStyles}
                    tagsStyles={tagsStyles}
                    customHTMLElementModels={customHTMLElementModels}
                />
            </ScrollView>
        </CustomThemeProvider>
    )
}


