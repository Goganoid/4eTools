export interface Power {
    checked: boolean,
    id: string,
    name: string,
    level: string,
    type: string,
    action: string,
    notes: string,
    power_id?: string
}
export interface Tracker {
    attacks: Array<any>,
    damageTypes: Array<any>,
    powers: Array<any>,
    surges: number,
    maxSurges: number,
    hp: number,
    maxHp: number,
}

export enum EntityType {
    Hero = "hero",
    Enemy = "enemy"
}

export type Stats = {
    hp: number,
    initiative: number,
    ac: number,
    fort: number,
    ref: number,
    will: number
}

export interface Entity {
    uuid: string,
    name: string,
    type: EntityType,
    stats: Stats,
    initiativeRoll: number,
    conditions: Array<string>,
    monster_id?: string,
    combat_role?: string,
    group_role?: string,
    size?: string,
    race?: string,
}

export interface Encounter {
    id: string,
    name: string,
    entities: Array<Entity>
}

export enum CompendiumCategory {
    bestiary,
    weapons,
    trap,
    theme,
    ritual,
    race,
    power,
    paragonpower,
    epicdestinypower,
    themepower,
    poison,
    paragonpath,
    item,
    implement,
    glossary,
    feat,
    epicdestiny,
    disease,
    deity,
    campaign,
    class,
    companion,
    background,
    armor
}
export enum CompendiumCategoryMode {
    encounter,
    group,
    power,
    compendium
}

export interface GroupEntity {
    id: string,
    name: string,
    entities: Array<Entity>,
}