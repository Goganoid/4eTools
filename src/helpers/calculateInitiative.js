export default caclulateInitiative = (entity) => {
    console.log(`${entity.name} parsing initiative result ${parseInt(entity.stats.initiative) || 0}`);
    return (parseInt(entity.initiativeRoll) || 0) + (parseInt(entity.stats.initiative) || 0);
}