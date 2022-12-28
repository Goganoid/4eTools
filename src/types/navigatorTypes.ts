import { About } from './../components/About/About';
import { CategoryMode, Category, Entity } from "./entityTypes";
import { Power } from "./entityTypes";

export enum EncounterMode{
    group,
    encounter
}
type CompendiumParams = { category?: Category, mode?: CategoryMode };
type ItemDetailsParams = { id: string, category?: Category, mode?: CategoryMode|null }
type AddCardParams = { isHeroTab: boolean, mode: EncounterMode };

export type MainDrawerParamList = {
    EncounterStack: {mode:EncounterMode, groupId?:string};
    Groups: undefined;
    Compendium: undefined;
    Tracker: undefined;
    About: undefined;
};
export type PowerTrackerParams ={
    PowerTracker: undefined;
    PowerDetails: ItemDetailsParams;
    AddCustomPower: undefined;
    CustomPowerDetails: {power:Power};
    AddPower:CompendiumParams | undefined;
}
export type CompendiumListParams = {
    CompendiumMainPage: undefined,
    CompendiumList: CompendiumParams | undefined ,
};

export type GroupStackParamList = {
    EntitiesList: {groupId: string};
    Details: ItemDetailsParams;
    ConditionDetails: ItemDetailsParams;
    AddCardCustom: AddCardParams;
    AddHero: AddCardParams;
    AddMonster:{category:Category, mode:CategoryMode};
};
  
export type EncounterStackParamList = {
    Encounter: {mode:EncounterMode, groupId?:string};
    Details: ItemDetailsParams;
    ConditionDetails: ItemDetailsParams;
    CustomEntityDetails: { entity: Entity };
    AddCardCustom: AddCardParams;
    AddHero: AddCardParams;
    AddMonster:{category:Category, mode:CategoryMode};
};
  
export type GroupsStackParamList = {
    GroupsTable: undefined,
    Group: { groupId: string, mode:EncounterMode },
};
export type CompendiumCategoryParams = {
    Listing: CompendiumParams,
    ItemDetails:ItemDetailsParams
}