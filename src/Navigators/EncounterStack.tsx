import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useContext, useEffect } from 'react'
import { Text } from 'react-native-paper'
import { getCurrentEncounter } from '../data/storage'
import { EncounterStackNavigator } from './EncounterStackNavigator'
import { Encounter } from './entityTypes'
import { EncounterContext } from './MainDrawer'
import { MainDrawerParamList } from './navigatorTypes'

export const EncounterStack = ({ route }: NativeStackScreenProps<MainDrawerParamList, 'EncounterStack'>) => {
    const context = useContext(EncounterContext)!;
    console.log("Context loading state ", context?.loading)
    useEffect(() => {
        console.log("Call use effect")
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
      <EncounterStackNavigator route={route} />
  )
}
