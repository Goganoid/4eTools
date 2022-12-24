import { monsters_listing } from "../data/monsters";
import { listing as power_listing } from "../data/power/data";
import { v4 as uuid } from 'uuid';
import { roll20 } from "./roll20";
import { forFade } from "react-navigation-stack/lib/typescript/src/vendor/TransitionConfigs/HeaderStyleInterpolators";


export function createEntity(type, name, stats, custom_id = null) {
    return {
        uuid: custom_id ?? uuid(),
        name: name,
        type: type,
        stats: stats,
        initiativeRoll: roll20(),
        conditions: [],
    }
}

export function createEnemy(monster_listing_id) {
    let monster_data = { ...monsters_listing[monster_listing_id] };
    let entity = createEntity("enemy", monster_data.name, monster_data.stats);
    // rename property
    delete Object.assign(monster_data, { ["monster_id"]: monster_data["id"] })["id"];
    return {
        ...entity,
        ...monster_data,
    }
}

export function createCustomPower({name,level,type,action,notes=''}) {
    return {
        checked:false,
        id: uuid(),
        name,
        level,
        type,
        action,
        notes
    }
}

export function createPower(power_id) {
    const power = power_listing[power_id];
    return {
        checked:false,
        id: uuid(),
        power_id: power_id,
        name: power.name,
        level: power.level,
        type: power.type,
        action: power.action,
    }
}