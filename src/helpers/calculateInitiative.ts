import { Entity } from "../types/entityTypes";

const caclulateInitiative = (entity: Entity) => {
    return entity.initiativeRoll + entity.stats.initiative;
}
export default caclulateInitiative;