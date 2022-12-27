import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useContext, useEffect } from 'react'
import { EncounterContext } from '../context/EncounterContext'
import { getCurrentEncounter } from '../data/storage'
import { Encounter } from '../types/entityTypes'
import { MainDrawerParamList } from '../types/navigatorTypes'
import { EncounterStack } from './EncounterStack'

export const EncounterStackWrapper = ({ route }: NativeStackScreenProps<MainDrawerParamList, 'EncounterStack'>) => {
    const context = useContext(EncounterContext)!;
    useEffect(() => {
        if (context.loading) {
            console.log("Loading entities first time");
            getCurrentEncounter().then(value => {
                console.log("Loaded:", value);
                let newEncounter: Encounter = {
                    entities: value.entities ?? [],
                    loading:false
                }
                context.setEncounter(newEncounter);
            });
        }
    },[])
  return (
      <EncounterStack route={route} />
  )
}
