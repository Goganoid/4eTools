import React from 'react';
import { List } from 'react-native-paper';

export function SavedPowerTab(isHeroTab, stored_entities, setName, setType, setId, setStats) {
    return <List.Accordion
        title={`Saved ${isHeroTab ? "Heroes" : "Entities"}`}
        left={props => <List.Icon {...props} icon="folder" />}>
        {Object.keys(stored_entities).map((entity_id, index) => {
            return <List.Item
                title={stored_entities[entity_id].name}
                description={stored_entities[entity_id].type}
                key={index}
                onPress={() => {
                    const entity = stored_entities[entity_id];
                    setName(entity.name);
                    setType(entity.type);
                    setId(entity.uuid);
                    console.log(entity.stats);
                    const newStats = {
                        hp: entity.stats.hp.toString(),
                        ac: entity.stats.ac.toString(),
                        fort: entity.stats.fort.toString(),
                        ref: entity.stats.ref.toString(),
                        will: entity.stats.will.toString(),
                        initiative: entity.stats.initiative.toString(),
                    };
                    setStats(newStats);
                }} />;
        }
        )}
    </List.Accordion>;
}