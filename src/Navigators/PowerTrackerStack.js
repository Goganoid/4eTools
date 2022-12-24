
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { IconButton } from 'react-native-paper';
import { AddEntity } from '../components/Encounter/AddEntity';
import { Encounter } from '../components/Encounter/Encounter';
import { EnemyDetails } from '../components/Encounter/EnemyDetails';
import { CompendiumListStack } from './CompendiumListStack';
import { configMainScreenTitle } from '../helpers/configMainScreenTitle';
import PowerTracker from '../components/PlayerSheet/PowerTracker';
import { AddCustomPower } from '../components/PlayerSheet/AddCustomPower';
import { CompendiumItemDetails } from '../components/Compendium/CompendiumItemDetails';
import { CustomPowerDetails } from '../components/PlayerSheet/CustomPowerDetails';
import { savePowerTracker } from '../data/storage';
const Stack = createNativeStackNavigator();

export const PowerTrackerContext = React.createContext(null);

export const PowerTrackerStack = () => {

    const initialContextState = {
        attacks: [],
        damageTypes: [],
        powers: [],
    }

    const [tracker, setTracker] = React.useState(initialContextState);
    const setTrackerAndSave = (newTrackerState) => {
        console.log("Setting tracker and saving ")
        savePowerTracker(newTrackerState);
        // saveCurrentEncounter(newTrackerState);
        setTracker(newTrackerState);
    }

    const add = (propName, item) => {
        setTrackerAndSave({...tracker,[propName]:[...tracker[propName],item]})
    }
    const remove = (propName, item) => {
        console.log("Removing item ", item);
        console.log("From ", tracker);
        console.log("Filter result, ", tracker[propName].filter(i => {
            console.log(`Comparing ${i.id}==${item.id} Result:${i.id!==item.id}`)
            return i.id != item.id
        }));
        setTrackerAndSave({
            ...tracker,
            [propName]: tracker[propName].filter(i => i.id != item.id )
        })
    }

    const setPowers = (powers) => setTrackerAndSave({ ...tracker, powers });
    const addPower = (power) => add('powers', power);
    const removePower = (power) => remove('powers', power);
    const setAttacks = (attacks) => setTrackerAndSave({ ...tracker, attacks });
    const addAttack = (attack) => add('attacks', attack);
    const removeAttack = (attack) => remove('attacks', attack);
    const setDamageTypes = (damageTypes) => setTrackerAndSave({ ...tracker, damageTypes });
    const addDamageType = (damageType) => add('damageTypes', damageType);
    const removeDamageType = (damageType) => remove('damageTypes', damageType);
    const setChecked = (power, checked) => setTrackerAndSave({
        ...tracker,
        powers: tracker.powers.map(p => {
            if (p.id == power.id) {
                p.checked = checked;
            }
            return p;
        })
    })
    const trackerContextSetters = {
        setTracker,
        setPowers,
        setChecked,
        setAttacks,
        setDamageTypes,
        addPower,
        removePower,
        addAttack,
        removeAttack,
        addDamageType,
        removeDamageType
    }

    return (
        <PowerTrackerContext.Provider value={{ ...tracker, ...trackerContextSetters }} >
            <Stack.Navigator initialRouteName="PowerTracker">
                <Stack.Screen
                    name="PowerTracker" component={PowerTracker}
                    options={{
                        headerLeft: () => <IconButton icon="menu" style={{ padding: 0, margin: 0 }} />,
                    }} />
                <Stack.Screen
                    name="PowerDetails" component={CompendiumItemDetails}
                    initialParams={{category:"power"}}
                />
                <Stack.Screen
                    name="CustomPowerDetails" component={CustomPowerDetails}
                />
                <Stack.Screen
                    name="AddCustomPower"
                    component={AddCustomPower}
                    options={{
                        title: 'Add Power',
                        headerRight: () => <>
                            <IconButton icon="check" />
                        </>,
                    }} />
                <Stack.Screen name="AddPower"
                    component={CompendiumListStack}
                    initialParams={{ category: 'power', mode: 'power' }}
                    options={({ route }) => { return configMainScreenTitle(route, 'AddPower') }}
                />
            </Stack.Navigator>
        </PowerTrackerContext.Provider>
    )
}
