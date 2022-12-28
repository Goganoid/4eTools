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
  return <View style={styles.stats}>
    <Stat statName={"HP"} statValue={entity.stats.hp} onChange={(value: number) => setStat(entity, "hp", value)} textStyle={{ fontSize: 15 }}></Stat>
    <View style={styles.def_stats}>
      <Stat style={styles.def_stat}  statName={"AC"} statValue={entity.stats.ac} onChange={(value: number) =>
        setStat(entity, "ac", value)} textStyle={styles.textStyle}></Stat>
      <Stat style={styles.def_stat} statName={"FOR"} statValue={entity.stats.fort} onChange={(value: number) =>
        setStat(entity, "fort", value)} textStyle={styles.textStyle}></Stat>
      <Stat style={styles.def_stat} statName={"REF"} statValue={entity.stats.ref} onChange={(value: number) =>
        setStat(entity, "ref", value)} textStyle={styles.textStyle}></Stat>
      <Stat style={styles.def_stat} statName={"WILL"} statValue={entity.stats.will} onChange={(value: number) =>
        setStat(entity, "will", value)} textStyle={styles.textStyle}></Stat>
      {/* <Text style={styles.def_stat}><Text style={styles.bold_text}>AC: </Text>{entity.stats.ac}</Text>
      <Text style={styles.def_stat}><Text style={styles.bold_text}>FOR: </Text>{entity.stats.fort}</Text>
      <Text style={styles.def_stat}><Text style={styles.bold_text}>REF: </Text>{entity.stats.ref}</Text>
      <Text style={styles.def_stat}><Text style={styles.bold_text}>WILL: </Text>{entity.stats.will}</Text> */}
    </View>
  </View>;
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize:13,
  },
  bold_text: {
    fontWeight: "bold"
  },
  def_stats: {
    marginTop: 3,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent:"space-between"
  },
  def_stat: {
    marginHorizontal: 1,
    marginVertical: 5,
  },
  stats: {
    marginTop: 10,
  },

});



