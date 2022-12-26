import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import {
    IconButton, RadioButton,
    Text,
    TextInput,
    useTheme
} from 'react-native-paper';
import { v4 as uuid } from 'uuid';
import { createCustomPower, createEntity } from '../../helpers/entities';

import { GroupContext } from '../../Navigators/GroupStackNavigator';
import { CustomThemeProvider } from '../shared/ThemeProvider';
import { SavedPowerTab } from './SavedPowerTab';
import { PowerTrackerContext } from '../../Navigators/PowerTrackerStack';
import DropDownPicker from 'react-native-dropdown-picker';
import { filters } from '../../data/power/data';


const powerItems =
    [
        { value: "At-Will Attack", label: "At-Will Attack" },
        { value: "At-Will Feature", label: "At-Will Feature" },
        { value: "At-Will Utility", label: "At-Will Utility" },
        { value: "Enc. Attack", label: "Enc. Attack" },
        { value: "Enc. Feature", label: "Enc. Feature" },
        { value: "Enc. Utility", label: "Enc. Utility" },
        { value: "Daily Attack", label: "Daily Attack" },
        { value: "Daily Feature", label: "Daily Feature" },
        { value: "Daily Utility", label: "Daily Utility" }
    ]
const actionItems = [
    { label: "No Action", value: "No Action" },
    { label: "Minor", value: "Minor" },
    { label: "Standard", value: "Standard" },
    { label: "Move", value: "Move" },
    { label: "Imm. Interrupt", value: "Imm. Interrupt" },
    { label: "Imm. Reaction", value: "Imm. Reaction" },
    { label: "Free", value: "Free" },
    { label: "Opportunity", value: "Opportunity" }
]
const levelItems = filters.level.items.map(item => { return { label: item, value: item } })

export const AddCustomPower = ({ navigation, route }) => {
    const context = React.useContext(PowerTrackerContext);
    const theme = useTheme();
    const [name, setName] = useState("")
    const [powerType, setPowerType] = useState(null);
    const [actionType, setActionType] = useState(null);
    const [notes, setNotes] = useState("");
    const [level, setLevel] = useState("");

    const [powerTypeOpen, setPowerTypeOpen] = useState(false);
    const [actionTypeOpen, setActionTypeOpen] = useState(false);
    const [levelOpen, setLevelOpen] = useState(false);
    const onPowerOpen = () => {
        setActionTypeOpen(false);
        setLevelOpen(false);
    }
    const onActionOpen = () => {
        setPowerTypeOpen(false);
        setLevelOpen(false);
    }
    const onLevelOpen = () => {
        setPowerTypeOpen(false);
        setActionTypeOpen(false);
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => context && <>
                <IconButton icon="check" onPress={create} />
            </>,
        });
    }, [navigation, context, powerType, actionType, notes, name]);

    const showValidationError = (message) => {
        showMessage({
            message: message,
            type: 'warning',
            backgroundColor: theme.colors.error,
        });
    }

    const validate = () => {
        if (name.length == 0) {
            showValidationError('Name is required!')
            return false;
        }
        if (level == null) {
            showValidationError('Level is required')
            return false;
        }
        if (powerType == null) {
            showValidationError('Power type is not set!')
            return false;
        }
        if (actionType == null) {
            showValidationError('Power action type is not set!')
            return false;
        }
        return true;
    };
    const create = async () => {

        if (!validate()) return;

        let power = createCustomPower({
            name,
            level,
            type: powerType,
            action: actionType,
            notes
        })
        console.log("Adding power");
        console.log("power ", power);
        context.addPower(power);
        showMessage({
            message: `Power was added`,
            type: 'info',
            backgroundColor: theme.colors.primary,
        });
    };

    return (
        <CustomThemeProvider>
            <View>
                <View style={styles.add_entity_view}>
                    <TextInput
                        mode="outlined"
                        label={'Name'}
                        value={name}
                        onChangeText={value => setName(value)}
                    />
                    <View style={{ flexDirection: "row" }}>
                        <DropDownPicker
                            placeholder="Power type"
                            open={powerTypeOpen}
                            setOpen={setPowerTypeOpen}
                            value={powerType}
                            items={powerItems}
                            setValue={(value) => setPowerType(value)}
                            onOpen={() => onPowerOpen()}
                            containerStyle={{ flex: 1, padding: 5 }}
                            textStyle={styles.dropdown_text}
                        />
                        <DropDownPicker
                            placeholder="Action type"
                            open={actionTypeOpen}
                            setOpen={setActionTypeOpen}
                            value={actionType}
                            items={actionItems}
                            setValue={(value) => setActionType(value)}
                            onOpen={() => onActionOpen()}
                            containerStyle={{ flex: 1, padding: 5 }}
                            textStyle={styles.dropdown_text}
                        />
                        <DropDownPicker
                            placeholder="Level"
                            open={levelOpen}
                            setOpen={setLevelOpen}
                            value={level}
                            items={levelItems}
                            setValue={(value) => setLevel(value)}
                            onOpen={() => onLevelOpen()}
                            containerStyle={{ flex: 1, padding: 5 }}
                            textStyle={styles.dropdown_text}
                        />
                    </View>
                    <TextInput
                        mode="outlined"
                        label={'Notes'}
                        value={notes}
                        onChangeText={value => setNotes(value)}
                    />
                </View>
            </View>
            {/* <FlashMessage position={'bottom'} /> */}
        </CustomThemeProvider>
    );
};

export const styles = StyleSheet.create({
    dropdown_text: {
        fontSize: 12,
    },
    radio_item: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    add_entity_view: {
        padding: 15,
    },
    stats: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    stat_input: {
        flexGrow: 0,
        flexShrink: 0,
        marginHorizontal: '2.5%',
        marginVertical: 10,
        flexBasis: '30%',
    },
});
