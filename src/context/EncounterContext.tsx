import React, { ReactElement } from 'react'
import { saveCurrentEncounter } from '../data/storage';
import { sortByInitiative } from '../helpers/sortByInitiative';
import { Encounter, Entity, Loading } from '../types/entityTypes';


export interface EncounterContextSetters {
    setEncounter: (encounter: Encounter) => void,
    setEntities: (entities: Array<Entity>) => void,
    addEntity: (entity: Entity) => void,
    addEntities: (entities: Array<Entity>) => void,
    removeEntity: (entityId: string) => void,
}
export const EncounterContext = React.createContext<null | Encounter & EncounterContextSetters & Loading>(null);

export const EncounterContextProvider = ({children}:{children:ReactElement}) => {
    const initialContextState: Encounter = {
        entities: [],
        loading: true
    }
    const [encounter, setEncounter] = React.useState<Encounter>(initialContextState);
    const setEncounterAndSave = (newEncounter: Encounter) => {
        saveCurrentEncounter(newEncounter);
        setEncounter(newEncounter);
    }
    const setLoading = (loading: boolean) => setEncounter({ ...encounter, loading: loading })
    const setEntities = (entities: Array<Entity>) => setEncounterAndSave({ ...encounter, entities: sortByInitiative(entities) });
    const addEntity = (entity: Entity) => setEncounterAndSave({
        ...encounter,
        entities: sortByInitiative([...encounter.entities, entity])
    });
    const addEntities = (entities: Array<Entity>) => setEncounterAndSave({
        ...encounter,
        entities: sortByInitiative([...encounter.entities, ...entities])
    });
    const removeEntity = (entityId: string) => setEncounterAndSave({
        ...encounter,
        entities: encounter.entities.filter(entity => entity.uuid != entityId)
    });

    const encounterContextSetters = {
        setEncounter,
        setEntities,
        addEntity,
        addEntities,
        removeEntity,
    }
    return (
        <EncounterContext.Provider value={{ ...encounter, ...encounterContextSetters,setLoading }}>
            {children}
        </EncounterContext.Provider>
  )
}
