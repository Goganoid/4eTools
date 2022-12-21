import React from 'react';
import { DeviceEventEmitter, Image, StyleSheet, View } from 'react-native';
import { Divider, IconButton, Text } from 'react-native-paper';
import { Stat } from './Stat';
import { useTheme } from 'react-native-paper';
import { EncounterContext } from '../App';
import { GroupContext } from '../Navigators/GroupStackNavigator';
// import { EncounterContext } from '../Navigators/EncounterStackNavigator';
export const EntityCard = ({ navigation, route, entity, setStat,
  highlight = false,
  groupMode = false,
  showInitiative = true }) => {
  console.log("Group mode ", groupMode);
  const context = groupMode ? React.useContext(GroupContext) : React.useContext(EncounterContext);
  // const context = React.useContext(EncounterContext);
  const initiative = parseInt(entity.stats.initiative);
  const initiativeRoll = parseInt(entity.initiativeRoll);
  const theme = useTheme();
  return (
    <View style={[styles.entity_card, highlight ? { borderWidth: 1.5, borderColor: theme.colors.onPrimaryContainer } : null]}>
      <View style={{ ...styles.background }}>
        <View style={styles.entity_card_left_side}>
          <View>
            <Image source={entity.type == "enemy" ? require("../../img/enemy.png") : require("../../img/hero.png")} style={styles.entity_icon} />
          </View>
          {showInitiative
            ? (
              <>
                <Text style={styles.total_initiative}>{initiativeRoll + initiative}</Text>
                <Stat statName={"Initiative"}
                  statValue={entity.stats.initiative}
                  style={styles.rollDescription}
                  minimalistic={true}
                  onChange={(value) => setStat(entity, "initiative", value)}
                />
                 <Text style={styles.rollDescription} >({entity.initiativeRoll}{initiative >= 0 ? "+" : ""}{initiative})</Text>
              </>
            )
            : null
          }
        </View>
        <View style={styles.entity_card_right_side}>
          <View style={styles.nameSection}>
            <View style={styles.title}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text variant="titleLarge">{entity.name}</Text>
                <IconButton icon='delete' style={styles.icon} size={20}
                  onPress={() => context.removeEntity(entity.uuid)}
                />
              </View>
              <Text variant="bodySmall">{entity.group_role}</Text>
            </View>
            {entity.type == "enemy" && entity.monster_id != undefined ? <IconButton
              style={{ marginVertical: 0, marginHorizontal: 0, padding: 0 }}
              icon="information-outline"
              size={20}
              onPress={() => navigation.navigate("Details", { id: entity.monster_id })}
            /> : null}
          </View>
          <Divider />
          <View style={styles.def_stats}>
            <Stat statName={"HP"} statValue={entity.stats.hp} onChange={(value) => setStat(entity, "hp", value)}></Stat>
            <Text style={styles.def_stat}><Text style={styles.bold_text}>AC:</Text>{entity.stats.ac}</Text>
            <Text style={styles.def_stat}><Text style={styles.bold_text}>FOR:</Text>{entity.stats.fort}</Text>
            <Text style={styles.def_stat}><Text style={styles.bold_text}>REF:</Text>{entity.stats.ref}</Text>
            <Text style={styles.def_stat}><Text style={styles.bold_text}>WILL:</Text>{entity.stats.will}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  rollDescription: {
    color: "gray",
    fontSize: 8,
  },
  total_initiative: {
    fontSize: 20,
  },
  nameSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexGrow: 1,
    width: "100%"
  },
  title: {
    width: "70%"
  },
  background: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 20,
    alignSelf: 'stretch',
  },
  bold_text: {
    fontWeight: "bold"
  },
  entity_card: {
    flexDirection: "row",
    alignSelf: 'stretch',
    width: "100%",
  },
  entity_card_left_side: {
    flex: 0,
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 30,
  },
  entity_card_right_side: {
    flex: 1,
    paddingRight: 30,
    alignItems: "stretch",
    width: "100%"
  },
  icon: {
    padding: 0, margin: 0
  },
  entity_icon: {
    width: 30,
    height: 30,
    marginBottom: 15,
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