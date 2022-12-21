import calculateInitiative from '../helpers/calculateInitiative';

export function sortByInitiative(entities) {
    return entities.sort((entityA, entityB) => calculateInitiative(entityB) - calculateInitiative(entityA));
}
