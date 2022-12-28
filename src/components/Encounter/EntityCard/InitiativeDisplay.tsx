import React from 'react';
import { Text } from 'react-native-paper';
import { Entity } from '../../../types/entityTypes';
import { Stat } from './Stat';
import { StyleSheet } from 'react-native';

type InitiativeDisplayProps = {
  entity: Entity;
  setStat: (entity: Entity, propName: string, value: any) => void;
};
export function InitiativeDisplay({ entity, setStat }: InitiativeDisplayProps) {
  const initiative = entity.stats.initiative;
  const initiativeRoll = entity.initiativeRoll;
  return <>
    <Text style={styles.total_initiative}>{initiativeRoll + initiative}</Text>
    <Stat statName={"Initiative"}
      statValue={entity.stats.initiative}
      // textStyle={styles.rollDescription}
      minimalistic={true}
      onChange={(value: any) => setStat(entity, "initiative", value)} />
    <Text style={styles.rollDescription}>({entity.initiativeRoll}{initiative >= 0 ? "+" : ""}{initiative})</Text>
  </>;
}

const styles = StyleSheet.create({
  rollDescription: {
    color: "gray",
    fontSize: 8,
  },
  total_initiative: {
    fontSize: 20,
  },
});



