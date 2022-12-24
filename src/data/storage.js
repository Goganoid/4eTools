import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";


const stored_entities_key = "stored_entities";
const stored_heroes_key = "stored_heroes";
const encounter_key = "encounter";
const saved_groups_key = "saved_groups";
const tracker_key = "tracker";

export const saveEntity = async (entity, isHero = false) => {
    const key = isHero ? stored_heroes_key : stored_entities_key
    try {
        const stored_entities = await AsyncStorage.getItem(key);
        entity_string = JSON.stringify({
            [entity.uuid]: entity,
        });
        console.log("Stringified entity", entity_string)
        if (stored_entities == null) {
            console.log("Creating new item")
            await AsyncStorage.setItem(key, entity_string);
        }
        else {
            console.log("Merging")
            await AsyncStorage.mergeItem(key, entity_string);
        }
    }
    catch (e) {
        Alert.alert(e)
    }
}
export const updateEntity = async (entity, isHero = false) => {
    const key = isHero ? stored_heroes_key : stored_entities_key
    try {
        const stored_entities = await AsyncStorage.getItem(key);
        console.log("Updating entity")
        let entities = await getSavedEntities(isHero);
        if (entities[entity.uuid] == undefined) {
            Alert.alert("can't update entity that does not exist");
            return;
        }
        entities[entity.uuid] = entity;
        await AsyncStorage.setItem(key, JSON.stringify(entities));
    }
    catch (e) {
        Alert.alert("Error while updating entity")
    }
}
export const getSavedEntities = async (isHero = false) => {
    const key = isHero ? stored_heroes_key : stored_entities_key
    try {
        console.log("Call to getStoredEntities");
        const entities = await AsyncStorage.getItem(key);
        console.log("Stored Entities: ", entities);
        if (entities == null) return {};
        return JSON.parse(entities);
    }
    catch (e) {
        Alert.alert("erorr")
    }
}

export const saveCurrentEncounter = async ({ entities, id, name }) => {
    try {
        console.log("Storing encounter in storeEncounterEntities ");
        const encounter = await AsyncStorage.getItem(encounter_key);
        let entities_string = JSON.stringify({
            id,
            name,
            entities: [...entities]
        });
        console.log("Stringified entities", entities_string);
        await AsyncStorage.setItem(encounter_key, entities_string);
    }
    catch (e) {
        Alert.alert("Error while storing encounter");
        console.log("Error")
        console.log(e);
    }
}
export const getCurrentEncounter = async () => {
    try {
        console.log("Call to getCurrentEncounter");
        const entities = await AsyncStorage.getItem(encounter_key);
        if (entities == null) return [];
        console.log("Entities from storage", entities);
        console.log("Parsed Entities from storage", JSON.parse(entities).entities);
        console.log("Will return that", Object.values(JSON.parse(entities).entities));
        return JSON.parse(entities);
    }
    catch (e) {
        Alert.alert("Error while loading encounter");
    }
}

export const saveGroup = async ({ entities, id, name }) => {
    try {
        const savedGroups = AsyncStorage.getItem(saved_groups_key)
        console.log("Saving group ", entities, id, name);
        const encounter_string = JSON.stringify({
            [id]: {
                id,
                name,
                entities: [...entities]
            }
        });
        console.log("Stringified encounter", encounter_string)
        if (savedGroups == null) {
            console.log("Creating new item")
            await AsyncStorage.setItem(saved_groups_key, encounter_string);
        }
        else {
            console.log("Merging")
            await AsyncStorage.mergeItem(saved_groups_key, encounter_string);
        }
    }
    catch (e) {
        Alert.alert("Error while saving group");
        console.log(e);
    }
}
export const saveGroups = async (groups) => {
    try {
        const savedGroups = AsyncStorage.getItem(saved_groups_key)
        console.log("Saving groups ", groups);
        const groups_string = JSON.stringify(groups);
        console.log("Stringified groups", groups_string)
        await AsyncStorage.setItem(saved_groups_key, groups_string);
    }
    catch (e) {
        Alert.alert("Error while saving group");
        console.log(e);
    }
}
export const getSavedGroups = async () => {
    try {
        console.log("getSavedGroups");
        const encounters = await AsyncStorage.getItem(saved_groups_key);
        if (encounters == null) return {};
        return JSON.parse(encounters);
    }
    catch (e) {
        Alert.alert("erorr")
    }
}

export const updateGroup = async (group) => {
    try {
        const stored_groups = await AsyncStorage.getItem(saved_groups_key);
        console.log("Updating group")
        let groups = await getSavedEntities(isHero);
        if (groups[group.id] == undefined) {
            Alert.alert("can't update group that does not exist");
            return;
        }
        groups[group.id] = group;
        await AsyncStorage.setItem(saved_groups_key, JSON.stringify(groups));
    }
    catch (e) {
        Alert.alert("Error while updating entity")
    }
}

export const savePowerTracker = async (tracker) => {
    try {
        console.log("Storing encounter in savePowerTracker ");
        const savedTracker = await AsyncStorage.getItem(tracker_key);
        let trackerString = JSON.stringify(tracker);
        console.log("Stringified tracker", trackerString);
        await AsyncStorage.setItem(tracker_key, trackerString);
    }
    catch (e) {
        Alert.alert("Error while storing tracker");
        console.log("Error")
        console.log(e);
    }
}
export const getSavedTracker = async () => {
    try {
        console.log("Call to getSavedTracker");
        const savedTracker = await AsyncStorage.getItem(tracker_key);
        if (savedTracker == null) return null;
        console.log("Entities from storage", savedTracker);
        return JSON.parse(savedTracker);
    }
    catch (e) {
        Alert.alert("Error while loading encounter");
        console.log(e);
    }
}
