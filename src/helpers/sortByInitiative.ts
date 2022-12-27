import { Entity } from '../types/entityTypes';
import calculateInitiative from './calculateInitiative';

export function sortByInitiative(entities:Array<Entity>) {
    return entities.sort((entityA, entityB) => calculateInitiative(entityB) - calculateInitiative(entityA));
}
