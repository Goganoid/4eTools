
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { IconButton } from 'react-native-paper';
import { CompendiumItemDetails } from '../components/Compendium/CompendiumItemDetails';
import { AddCustomPower } from '../components/PowerTracker/AddCustomPower';
import { CustomPowerDetails } from '../components/PowerTracker/CustomPowerDetails';
import PowerTracker from '../components/PowerTracker/PowerTracker';
import { savePowerTracker } from '../data/storage';
import { configListingTitle } from '../helpers/configListingTitle';
import { CompendiumListStack } from './CompendiumListStack';
import { Category, CategoryMode, Tracker } from '../types/entityTypes';
import { PowerTrackerParams } from '../types/navigatorTypes';



export interface TrackerSetters{
    setTracker:(tracker:Tracker)=>void,
    setPowers:(powers:Array<any>)=>void,
    setChecked:(power:any, checked:boolean)=>void,
    setAttacks:(attacks:Array<any>)=>void,
    setDamageTypes:(damageTypes:Array<any>)=>void,
    addPower:(power:any)=>void,
    removePower:(power:any)=>void,
    addAttack:(attack:any)=>void,
    removeAttack:(attack:any)=>void,
    addDamageType:(damageType:any)=>void,
    removeDamageType:(damageType:any)=>void,
    setHp:(hp:number)=>void,
    setMaxHp:(maxHp:number)=>void,
    setSurges:(surges:number)=>void,
    setMaxSurges:(maxSurges:number)=>void,
}


const Stack = createNativeStackNavigator<PowerTrackerParams>();


export const PowerTrackerContext = React.createContext<null| TrackerSetters & Tracker> (null);

export const PowerTrackerStack = () => {
    const initialContextState : Tracker = {
        attacks: [],
        damageTypes: [],
        powers: [],
        surges: 0,
        maxSurges:6,
        hp: 0,
        maxHp: 30,
    }

    const [tracker, setTracker] = React.useState(initialContextState);
    const setTrackerAndSave = (newTrackerState:Tracker) => {
        console.log("Setting tracker and saving ")
        savePowerTracker(newTrackerState);
        setTracker(newTrackerState);
    }

    const add = (propName:string, item:any) => {
        setTrackerAndSave({...tracker,[propName]:[...(tracker as any)[propName],item]})
    }
    const remove = (propName:string, item:any) => {
        console.log("Removing item ", item);
        console.log("From ", tracker);
        console.log("Filter result, ", (tracker as any)[propName].filter((i:any) => {
            console.log(`Comparing ${i.id}==${item.id} Result:${i.id!==item.id}`)
            return i.id != item.id
        }));
        setTrackerAndSave({
            ...tracker,
            [propName]: (tracker as any)[propName].filter((i:any) => i.id != item.id )
        })
    }

    const setPowers = (powers:Array<any>) => setTrackerAndSave({ ...tracker, powers });
    const addPower = (power:any) => {
        if (power.power_id) {
            if (tracker.powers.find(otherPower => otherPower.power_id == power.power_id)) return;
        }
        add('powers', power)
    };
    const removePower = (power:any) => remove('powers', power);
    const setAttacks = (attacks:Array<any>) => setTrackerAndSave({ ...tracker, attacks });
    const addAttack = (attack:any) => add('attacks', attack);
    const removeAttack = (attack:any) => remove('attacks', attack);
    const setDamageTypes = (damageTypes:Array<any>) => setTrackerAndSave({ ...tracker, damageTypes });
    const addDamageType = (damageType:any) => add('damageTypes', damageType);
    const removeDamageType = (damageType:any) => remove('damageTypes', damageType);
    const setChecked = (power:any, checked:boolean) => setTrackerAndSave({
        ...tracker,
        powers: tracker.powers.map(p => {
            if (p.id == power.id) {
                p.checked = checked;
            }
            return p;
        })
    })
    const setHp = (hp:number) => setTrackerAndSave({ ...tracker, hp });
    const setMaxHp = (maxHp:number) => setTrackerAndSave({ ...tracker, maxHp });
    const setSurges = (surges:number) => setTrackerAndSave({ ...tracker, surges });
    const setMaxSurges = (maxSurges:number) => setTrackerAndSave({ ...tracker, maxSurges });
    const trackerContextSetters = {
        setTracker:setTrackerAndSave,
        setPowers,
        setChecked,
        setAttacks,
        setDamageTypes,
        addPower,
        removePower,
        addAttack,
        removeAttack,
        addDamageType,
        removeDamageType,
        setHp,
        setMaxHp,
        setSurges,
        setMaxSurges,
    }

    return (
        <PowerTrackerContext.Provider value={{ ...tracker, ...trackerContextSetters }} >
            <Stack.Navigator initialRouteName="PowerTracker" screenOptions={{
            }}>
                <Stack.Screen
                    // @ts-ignore
                    name="PowerTracker" component={PowerTracker}
                    options={{
                        title:"Power Tracker"
                    }} />
                <Stack.Group screenOptions={{presentation:'containedTransparentModal',headerShown:false}}>
                    <Stack.Screen
                        // @ts-ignore
                        name="PowerDetails" component={CompendiumItemDetails}
                        initialParams={{ category: Category.power, mode:CategoryMode.modal }}
                        options={{
                            title:"Power Details"
                        }}
                    />
                    <Stack.Screen
                        name="CustomPowerDetails"
                        // @ts-ignore
                        component={CustomPowerDetails}
                        options={{
                            title: "Power Details",
                        }}
                    />
                </Stack.Group>
                <Stack.Screen
                    name="AddCustomPower"
                    // @ts-ignore
                    component={AddCustomPower}
                    options={{
                        title: 'Add Power',
                        headerRight: () => <>
                            <IconButton icon="check" />
                        </>,
                    }} />
                <Stack.Screen name="AddPower"
                     // @ts-ignore
                    component={CompendiumListStack}
                    initialParams={{ category: Category.power, mode: CategoryMode.power }}
                    options={({ route }) => { return configListingTitle(route, 'Add Power') }}
                />
            </Stack.Navigator>
        </PowerTrackerContext.Provider>
    )
}
