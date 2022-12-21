import { monsters_listing } from "../data/monsters";
import { v4 as uuid } from 'uuid';
import { roll20 } from "./roll20";


export function createEntity(type, name, stats,custom_id=null) {
    return {
        uuid: custom_id ?? uuid(),
        name: name,
        type: type,
        stats: stats,
        initiativeRoll:roll20()
    }
}

export function createEnemy(monster_listing_id) {
    let monster_data = {...monsters_listing[monster_listing_id]};
    let entity = createEntity("enemy", monster_data.name, monster_data.stats);
    // rename property
    delete Object.assign(monster_data, { ["monster_id"]: monster_data["id"] })["id"];
    return {
        ...entity,
        ...monster_data,
    }
}