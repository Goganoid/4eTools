import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Entity } from '../../../types/entityTypes';
import { Stat } from './Stat';

type StatsProps = {
  entity: Entity;
  setStat: (entity: Entity, propName: string, value: any) => void;
};
export function Stats({ entity, setStat }: StatsProps) {
  return <View style={styles.def_stats}>
    <Stat statName={"HP"} statValue={entity.stats.hp} onChange={(value: number) => setStat(entity, "hp", value)}></Stat>
    <Text style={styles.def_stat}><Text style={styles.bold_text}>AC:</Text>{entity.stats.ac}</Text>
    <Text style={styles.def_stat}><Text style={styles.bold_text}>FOR:</Text>{entity.stats.fort}</Text>
    <Text style={styles.def_stat}><Text style={styles.bold_text}>REF:</Text>{entity.stats.ref}</Text>
    <Text style={styles.def_stat}><Text style={styles.bold_text}>WILL:</Text>{entity.stats.will}</Text>
  </View>;
}

const styles = StyleSheet.create({
  bold_text: {
    fontWeight: "bold"
  },
  def_stats: {
    marginTop: 20,
    justifyContent: "space-around",
    flexDirection: "row",
    alignSelf: 'stretch',
  },
  def_stat: {
    paddingHorizontal: 5
  }
});



