import React from 'react';
import reactDom from 'react-dom';
import { ScrollView, useWindowDimensions } from 'react-native';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { IconButton, useTheme } from 'react-native-paper';
import RenderHtml, { defaultHTMLElementModels, HTMLContentModel } from 'react-native-render-html';
// import { EncounterContext } from '../../App';
import { EncounterContext } from '../../Navigators/MainDrawer';
import { createEnemy, createPower } from '../../helpers/entities';
import { GroupContext } from '../../Navigators/GroupStackNavigator';
import { PowerTrackerContext } from '../../Navigators/PowerTrackerStack';
import { CustomThemeProvider } from '../ThemeProvider';
const headStyle = {
    fontSize: 20,
    padding: 0,
    // lineHeight: 30,
    backgroundColor: "#BBF"
};

const classesStyles = {
    mihead: { ...headStyle },
    thHead: { ...headStyle },
    player: { ...headStyle },
    trap: headStyle,
    encounterpower: {
        backgroundColor: "#F44"
    },
    atwillpower: {
        backgroundColor: "#4F4"
    },
    flavor: {
        backgroundColor: "#CCC"
    },
    dailypower: {
        backgroundColor: "#888"
    },
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
    alt: {
        lineHeight: 20,
        backgroundColor: "#CCC"
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

export const CompendiumItemDetails = ({ route, navigation }) => {
    const theme = useTheme();
    const { id, category } = route.params;
    const mode = route?.params.mode ?? null;
    const context =
        mode == 'group' ? React.useContext(GroupContext) :
            mode == 'encounter' ? React.useContext(EncounterContext) :
                mode == 'power' ? React.useContext(PowerTrackerContext) : null;
    let details = {};
    if (category == 'monster') details = require('../../data/monster/data.json');
    if (category == 'weapons') details = require('../../data/weapons/data.json');
    if (category == 'trap') details = require('../../data/trap/data.json');
    if (category == 'theme') details = require('../../data/theme/data.json');
    if (category == 'ritual') details = require('../../data/ritual/data.json');
    if (category == 'race') details = require('../../data/race/data.json');
    if (category == 'power') details = require('../../data/power/data.json');
    if (category == 'paragonpower') details = require('../../data/paragonpower/data.json');
    if (category == 'themepower') details = require('../../data/themepower/data.json');
    if (category == 'epicdestinypower') details = require('../../data/epicdestinypower/data.json');
    if (category == 'poison') details = require('../../data/poison/data.json');
    if (category == 'paragonpath') details = require('../../data/paragonpath/data.json');
    if (category == 'item') details = require('../../data/item/data.json');
    if (category == 'implement') details = require('../../data/implement/data.json');
    if (category == 'glossary') details = require('../../data/glossary/data.json');
    if (category == 'feat') details = require('../../data/feat/data.json');
    if (category == 'epicdestiny') details = require('../../data/epicdestiny/data.json');
    if (category == 'disease') details = require('../../data/disease/data.json');
    if (category == 'deity') details = require('../../data/deity/data.json');
    if (category == 'companion') details = require('../../data/companion/data.json');
    if (category == 'class') details = require('../../data/class/data.json');
    if (category == 'background') details = require('../../data/background/data.json');
    if (category == 'armor') details = require('../../data/armor/data.json');
    const { width } = useWindowDimensions();
    const source = {
        html: details[id]
    }
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
        if (context != null && category == 'monster') {
            let entity = createEnemy(id);
            context.addEntity(entity);
            showMessage({
                message: `Monster was added`,
                type: "info",
                backgroundColor: theme.colors.primary
            });
        }
        if (context != null && category == 'power') {
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
                    classesStyles={classesStyles}
                    tagsStyles={tagsStyles}
                    customHTMLElementModels={customHTMLElementModels}
                />
            </ScrollView>
            <FlashMessage position={"bottom"} />
        </CustomThemeProvider>
    )
}


