import { monsters_listing } from "../data/monsters";
import { listing as power_listing } from "../data/power/data";
import { v4 as uuid } from 'uuid';
import { roll20 } from "./roll20";
import { forFade } from "react-navigation-stack/lib/typescript/src/vendor/TransitionConfigs/HeaderStyleInterpolators";
import { EntityType, Stats } from "../Navigators/entityTypes";

type CreateEntityProps = {
    type: EntityType,
    name: string,
    stats: Stats,
    custom_id?:string|null
} 

export function createEntity({ type, name, stats, custom_id = null }:CreateEntityProps) {
    return {
        uuid: custom_id ?? uuid(),
        name: name,
        type: type,
        stats: stats,
        initiativeRoll: roll20(),
        conditions: [],
    }
}

export function createEnemy(monster_listing_id:string) {
    let monster_data : any = { ...(monsters_listing as any)[monster_listing_id] };
    let entity = createEntity({
        type:EntityType.Enemy,
        name:monster_data.name,
        stats:monster_data.stats
    });
    // rename property
    delete Object.assign(monster_data, { ["monster_id"]: monster_data["id"] })["id"];
    return {
        ...entity,
        ...monster_data,
    }
}

type CreateCutomPowerProps = {
    name: string,
    level: string,
    type: string,
    action: string,
    notes: string
};

export function createCustomPower({name,level,type,action,notes=''}:CreateCutomPowerProps) {
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

export function createPower(power_id:string) {
    const power =(power_listing as any)[power_id];
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