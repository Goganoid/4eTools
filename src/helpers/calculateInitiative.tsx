import { Entity } from "../Navigators/entityTypes";

const caclulateInitiative = (entity: Entity) => {
    // console.log(`${entity.name} parsing initiative result ${parseInt(entity.stats.initiative) || 0}`);
    return entity.initiativeRoll + entity.stats.initiative;
    // return (parseInt(entity.initiativeRoll) || 0) + (parseInt(entity.stats.initiative) || 0);
}
export default caclulateInitiative;