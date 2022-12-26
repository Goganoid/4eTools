import React, { useContext } from 'react';
import { DeviceEventEmitter, ScrollView, useWindowDimensions } from 'react-native';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { IconButton, useTheme } from 'react-native-paper';
import RenderHtml from 'react-native-render-html';
import { monsters_details } from '../../data/monsters';
import { createEnemy } from '../../helpers/entities';
import { EncounterContext } from '../../Navigators/MainDrawer';
import { GroupContext } from '../../Navigators/GroupStackNavigator';
import { CustomThemeProvider } from '../shared/ThemeProvider';
const classesStyles = {
    monster: {
        fontSize: 20,
        lineHeight: 30,
        backgroundColor: "#BBF"
    },
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
        color: "black"
    },
    td: {
        color: "black"
    }
}

export const EnemyDetails = ({ route, navigation }) => {
    const mode = route?.params.mode ?? null;
    const context = mode == 'group' ? React.useContext(GroupContext) :
        mode == 'encounter' ? React.useContext(EncounterContext) : null;
    const theme = useTheme();
    const showAddButton = route.params?.showAddButton ?? false;
    const { id } = route.params;
    const { width } = useWindowDimensions();
    const monster_source = {
        html: monsters_details[id]
    }

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
        let entity = createEnemy(id);
        context.addEntity(entity);
        showMessage({
            message: `Monster was added`,
            type: "info",
            backgroundColor: theme.colors.primary
        });
    }

    return (
        <CustomThemeProvider>
            <ScrollView>
                <RenderHtml
                    contentWidth={width}
                    source={monster_source}
                    classesStyles={classesStyles}
                    tagsStyles={tagsStyles}
                />
            </ScrollView>
            {/* <FlashMessage position={"bottom"} /> */}
        </CustomThemeProvider>
    )
}
