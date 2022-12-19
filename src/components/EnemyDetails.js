import React from 'react';
import { DeviceEventEmitter, ScrollView, useWindowDimensions } from 'react-native';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { IconButton, useTheme } from 'react-native-paper';
import RenderHtml from 'react-native-render-html';
import { monsters_details } from '../data/monsters';
import { createEnemy } from '../helpers/entities';
import { CustomThemeProvider } from './ThemeProvider';
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
                    {showAddButton
                        ? <IconButton
                            icon='check'
                            onPress={create} />
                        : null}
                </>
            ),
        });
    }, [navigation]);
    const create = async () => {
        let entity = createEnemy(id);
        DeviceEventEmitter.emit("event.addEntity", entity);
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
            <FlashMessage position={"bottom"} />
        </CustomThemeProvider>
    )
}
