import { CompendiumCategoryMode, CompendiumCategory } from "./entityTypes";
import { Power } from "./entityTypes";

export enum EntityMode{
    group,
    encounter
}
  
type CompendiumParams = { category: CompendiumCategory, mode: CompendiumCategoryMode };
type ItemDetailsParams = { id: string, category: CompendiumCategory, mode: CompendiumCategoryMode|null }
type AddCardParams = { isHeroTab: boolean, mode: EntityMode };

export type MainDrawerParamList = {
    EncounterStack: undefined;
    Groups: undefined;
    Compendium: undefined;
    Tracker: undefined;
};
export type PowerTrackerParams ={
    PowerTracker: undefined;
    PowerDetails: ItemDetailsParams;
    AddCustomPower: undefined;
    CustomPowerDetails: {power:Power};
    AddPower:CompendiumParams;
}
export type CompendiumListParams = {
    CompendiumMainPage: undefined,
    CompendiumList: CompendiumParams ,
};

export type GroupStackParamList = {
    EntitiesList: {groupId: string};
    Details: ItemDetailsParams;
    ConditionDetails: ItemDetailsParams;
    AddCardCustom: AddCardParams;
    AddHero: AddCardParams;
    AddMonster:{category:CompendiumCategory, mode:CompendiumCategoryMode};
};
  
export type EncounterStackParamList = {
    Encounter: undefined;
    Details: ItemDetailsParams;
    ConditionDetails: ItemDetailsParams;
    AddCardCustom: AddCardParams;
    AddHero: AddCardParams;
    AddMonster:{category:CompendiumCategory, mode:CompendiumCategoryMode};
};
  
export type GroupsStackParamList = {
    GroupsTable: undefined,
    Group: { id: string },
};
export type CompendiumCategoryParams = {
    Listing: CompendiumParams,
    ItemDetails:ItemDetailsParams
}