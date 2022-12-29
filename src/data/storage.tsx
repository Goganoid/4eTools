import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { MMKV } from 'react-native-mmkv'
import { Entity, GroupEntity, Tracker } from "../types/entityTypes";

const stored_entities_key = "stored_entities";
const stored_heroes_key = "stored_heroes";
const encounter_key = "encounter";
const saved_groups_key = "saved_groups";
const tracker_key = "tracker";

export const storage = new MMKV();

export const setSavedEntities = (entities: any, isHero = false) => {
    const key = isHero ? stored_heroes_key : stored_entities_key
    try {
        storage.set(key, JSON.stringify(entities));
    }
    catch (e) {
        Alert.alert("Error in setSavedEntities");
        console.log(e);
    }
}

export const saveEntity = (entity: Entity, isHero = false) => {
    const key = isHero ? stored_heroes_key : stored_entities_key
    const stored_entities = storage.getString(key);

    if (stored_entities == undefined) {
        console.log("Creating new item");
        const entity_string = JSON.stringify({
            [entity.uuid]: entity,
        });
        console.log("Stringified entity", entity_string)
        storage.set(key, entity_string);
    }
    else {
        console.log("Merging")
        let parsed_stored_entities = JSON.parse(stored_entities);
        storage.set(key, JSON.stringify({ ...parsed_stored_entities, [entity.uuid]: entity }));
    }
}

export const removeEntity = (entity: Entity, isHero = false) => {
    const key = isHero ? stored_heroes_key : stored_entities_key
    const stored_entities = storage.getString(key);
    if (stored_entities == undefined) {
        console.log("Nothing to remove");
    }
    else {
        let newEntities = JSON.parse(stored_entities);
        delete newEntities[entity.uuid];
        storage.set(key, JSON.stringify(newEntities));
    }
}

export const updateEntity = (entity: Entity, isHero = false) => {
    const key = isHero ? stored_heroes_key : stored_entities_key
    try {
        console.log("Updating entity")
        let entities = getSavedEntities(isHero);
        if (entities[entity.uuid] == undefined) {
            Alert.alert("can't update entity that does not exist");
            return;
        }
        entities[entity.uuid] = entity;
        storage.set(key, JSON.stringify(entities));
    }
    catch (e) {
        Alert.alert("Error while updating entity")
    }
}
export const getSavedEntities = (isHero = false) => {
    const key = isHero ? stored_heroes_key : stored_entities_key
    try {
        console.log("Call to getSavedEntities");

        const entities = storage.getString(key);
        if (entities == undefined) return {};
        return JSON.parse(entities);
    }
    catch (e) {
        Alert.alert("erorr")
    }
}

export const saveCurrentEncounter = ({ entities }: { entities: Array<Entity> }) => {
    console.log("Saving encounter in saveCurrentEntities ");

    var t0 = performance.now();
    let entities_string = JSON.stringify({
        entities: [...entities]
    });
    storage.set(encounter_key, entities_string);
    var t1 = performance.now();
    console.log("Saving encounter took ", (t1 - t0), " miliseconds");
}
export const getCurrentEncounter = () => {
    console.log("Call to getCurrentEncounter");
    // const entities = await AsyncStorage.getItem(encounter_key);
    const entities = storage.getString(encounter_key);
    if (entities == undefined) return [];
    console.log("Parsed Entities from storage", JSON.parse(entities).entities);
    return JSON.parse(entities);


}

export const saveGroup = ({ entities, id, name }: { entities: Array<Entity>, id: string, name: string }) => {

    const savedGroups = storage.getString(saved_groups_key)
    console.log("Saving group ", entities, id, name);

    const groupToSave = {
        [id]: {
            id,
            name,
            entities: [...entities]
        }
    }
    if (savedGroups == undefined) {
        const groupToSave_string = JSON.stringify(groupToSave);
        console.log("Stringified group", groupToSave_string)
        storage.set(saved_groups_key, groupToSave_string);
    }
    else {
        let parsedSavedGroups = JSON.parse(savedGroups);

        storage.set(saved_groups_key, JSON.stringify({
            ...parsedSavedGroups,
            ...groupToSave
        }));
    }

}
export const saveGroups = (groups: Array<GroupEntity>) => {
    console.log("Saving groups ", groups);
    const groups_string = JSON.stringify(groups);
    console.log("Stringified groups", groups_string)
    storage.set(saved_groups_key, groups_string);

}
export const getSavedGroups = ():Array<GroupEntity> => {
        console.log("getSavedGroups");
        const groups = storage.getString(saved_groups_key);
        if (groups == null) return [];
        return Object.values(JSON.parse(groups));
}

export const savePowerTracker = (tracker:Tracker) => {
        console.log("Storing encounter in savePowerTracker ");
        let trackerString = JSON.stringify(tracker);
        console.log("Stringified tracker", trackerString);
        storage.set(tracker_key, trackerString);
}
export const getSavedTracker = ():null|Tracker => {

        console.log("Call to getSavedTracker");
        const savedTracker = storage.getString(tracker_key);
        if (savedTracker == undefined) return null;
        console.log("Entities from storage", savedTracker);
        return JSON.parse(savedTracker);
   
}
