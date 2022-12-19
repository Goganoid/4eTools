import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";


const stored_entities_key = "stored_entities";
const stored_heroes_key = "stored_heroes";
const encounter_key = "encounter"

export const storeEntity = async (entity, isHero = false) => {
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
        let entities = await getStoredEntities(isHero);
        console.log("All entities in db", Object.keys(entities))
        if (entities[entity.uuid] == undefined) {
            Alert.alert("can't update entity that does not exist");
            return;
        }
        entities[entity.uuid] = entity;
        await AsyncStorage.setItem(key, JSON.stringify(entities));
    }
    catch (e) {
        Alert.alert(e)
    }
}
export const getStoredEntities = async (isHero = false) => {
    const key = isHero ? stored_heroes_key : stored_entities_key
    try {
        console.log("Call to getStoredEntities");
        const entities = await AsyncStorage.getItem(key);
        if (entities == null) return {};
        return JSON.parse(entities);
    }
    catch (e) {
        Alert.alert("erorr")
    }
}

export const storeEncounterEntities = async (entities) => {
    try {
        console.log("Storing encounter in storeEncounterEntities ");
        const encounter = await AsyncStorage.getItem(encounter_key);
        console.log("Going to print");
        console.log("To stringify encounter",{entities:[...entities]})
        let entities_string = JSON.stringify({entities:[...entities]});
        console.log("Stringified entities", entities_string);
        await AsyncStorage.setItem(encounter_key, entities_string);
    }
    catch (e) {
        Alert.alert("Error while storing encounter");
        console.log("Error")
        console.log(e);
        }
}
export const getEncounterEntities = async () => {
    try {
        console.log("Call to getEncounterEntities");
        const entities = await AsyncStorage.getItem(encounter_key);
        if (entities == null) return [];
        console.log("Entities from storage",entities);
        console.log("Parsed Entities from storage",JSON.parse(entities).entities);
        console.log("Will return that",Object.values(JSON.parse(entities).entities));
        return Object.values(JSON.parse(entities).entities);
    }
    catch (e) {
        Alert.alert("Error while loading encounter");
    }
}