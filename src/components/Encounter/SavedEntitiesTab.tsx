import React from 'react';
import { List } from 'react-native-paper';
import { IconButton } from 'react-native-paper';
import { Entity } from '../../types/entityTypes';
export function SavedEntitiesTab(isHeroTab: boolean,
    stored_entities: any,
    setName: (name:string) => void,
    setType: (type: any) => void,
    setId: (id: string) => void,
    setStats: (stats: any) => void,
    setImageUri:(uri:string) => void,
    removeEntity:(entity:Entity)=>void) {

    const loadEntity = (entity_id:string)=>{
        const entity = stored_entities[entity_id];
        setName(entity.name);
        setType(entity.type);
        setId(entity.uuid);
        setImageUri(entity.image_uri);
        const newStats = {
            hp: entity.stats.hp.toString(),
            ac: entity.stats.ac.toString(),
            fort: entity.stats.fort.toString(),
            ref: entity.stats.ref.toString(),
            will: entity.stats.will.toString(),
            initiative: entity.stats.initiative.toString(),
        };
        setStats(newStats);
    }

    const content = () => {
        return (
            <>
                {Object.keys(stored_entities).length == 0 && <List.Item title={`No saved  ${isHeroTab ? "Heroes" : "Entities"}`} />}
                {Object.keys(stored_entities).map((entity_id, index) => {
                    return <List.Item
                        title={stored_entities[entity_id].name}
                        description={stored_entities[entity_id].type}
                        key={index}
                        onPress={() => {loadEntity(entity_id)}}
                        right={() =>
                            <IconButton
                                icon={'close'}
                                onPress={() => {removeEntity(stored_entities[entity_id]);
                        }} />}
                    />;
                })}
            </>
        )
    }
    return <List.Accordion
        title={`Saved ${isHeroTab ? "Heroes" : "Entities"}`}
        left={props => <List.Icon {...props} icon="folder" />}>
        {stored_entities == null
            ? <List.Item title='Loading...' />
            : content()
        }
    </List.Accordion>;
}
