import React from 'react';
import { DeviceEventEmitter, Image, ScrollView, StyleSheet, View } from 'react-native';
import { Chip, Divider, IconButton, Text, Badge, Dialog, Portal, Provider, Paragraph, Button, RadioButton } from 'react-native-paper';
import { Stat } from './Stat';
import { useTheme } from 'react-native-paper';
import { EncounterContext } from '../../Navigators/MainDrawer';
import { GroupContext } from '../../Navigators/GroupStackNavigator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { EncounterStackParamList, EntityMode, GroupStackParamList } from '../../Navigators/navigatorTypes';
import { CompendiumCategory, Entity, EntityType } from '../../Navigators/entityTypes';


const conditions:any = {
  "glossary132": "Blinded",
  "glossary133": "Dazed",
  "glossary134": "Deafened",
  "glossary135": "Dominated",
  "glossary136": "Dying",
  "glossary405": "Grabbed",
  "glossary137": "Helpless",
  "glossary138": "Immobilized",
  "glossary139": "Marked",
  "glossary140": "Petrified",
  "glossary141": "Prone",
  "glossary506": "Removed",
  "glossary142": "Restrained",
  "glossary143": "Slowed",
  "glossary144": "Stunned",
  "glossary145": "Surprised",
  "glossary146": "Unconcius",
  "glossary147": "Weakened",
}

type Props = {
  navigation: (NativeStackNavigationProp<EncounterStackParamList, 'Encounter'>
  | NativeStackNavigationProp<GroupStackParamList, "EntitiesList">),
  entity: Entity,
  setStat: (entity: Entity, propName: string, value: any) => void,
  setConditions: (entity: Entity, conditions: Array<string>) => void,
  mode: EntityMode,
  showInitiative?: boolean,
  highlight:boolean
}


export const EntityCard = ({ navigation, entity, setStat, setConditions,
  highlight = false,
  mode,
  showInitiative = true }: Props) => {
  const context = mode == EntityMode.group ? React.useContext(GroupContext) :
    mode == EntityMode.encounter ? React.useContext(EncounterContext) : null;
  if (context == null) return null;
  console.log("Entity: ", entity);
  // const initiative = parseInt(entity.stats.initiative);
  // const initiativeRoll = parseInt(entity.initiativeRoll);
  const initiative = entity.stats.initiative;
  const initiativeRoll = entity.initiativeRoll;
  const theme = useTheme();


  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  const [newCondition, setNewCondition] = React.useState(null);

  const addCondition = () => {
    if (newCondition == null) return;
    if (entity.conditions.find(condition => condition == newCondition)) return;
    setConditions(entity, [...entity.conditions, newCondition]);
    setNewCondition(null);
    hideDialog();
  }
  const removeCondition = (id:string) => {
    setConditions(entity, entity.conditions.filter(condition=>condition!=id));
  }


  function EntityInformationButton() {
    console.log("MONSTER ID ", entity.monster_id);
    if(entity.monster_id!=null) return <IconButton
      style={{ marginVertical: 0, marginHorizontal: 0, padding: 0 }}
      icon="information-outline"
      size={20}
      // @ts-ignore
      onPress={() => navigation.navigate("Details", { id: entity.monster_id!, category:CompendiumCategory.bestiary,mode:null })} />;
  }
  return (
    <>
      <View style={[styles.entity_card, highlight ? { borderWidth: 1.5, borderColor: theme.colors.onPrimaryContainer } : null]}>
        <View style={{ ...styles.background }}>
          <View style={styles.entity_card_left_side}>
            <View>
              <Icon
                size={30}
                name={entity.type == EntityType.Enemy ? 'emoticon-devil-outline' : 'emoticon-outline'}
                color={(theme.colors as any).text}
                style={styles.entity_icon} />
            </View>
            {showInitiative
              ? (
                <>
                  <Text style={styles.total_initiative}>{initiativeRoll + initiative}</Text>
                  <Stat statName={"Initiative"}
                    statValue={entity.stats.initiative}
                    style={styles.rollDescription}
                    minimalistic={true}
                    onChange={(value:any) => setStat(entity, "initiative", value)}
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
              {entity.type == EntityType.Enemy && entity.monster_id != undefined ?
                EntityInformationButton() : null}
            </View>
            <Divider />
            <View style={styles.def_stats}>
              <Stat statName={"HP"} statValue={entity.stats.hp} onChange={(value:any) => setStat(entity, "hp", value)}></Stat>
              <Text style={styles.def_stat}><Text style={styles.bold_text}>AC:</Text>{entity.stats.ac}</Text>
              <Text style={styles.def_stat}><Text style={styles.bold_text}>FOR:</Text>{entity.stats.fort}</Text>
              <Text style={styles.def_stat}><Text style={styles.bold_text}>REF:</Text>{entity.stats.ref}</Text>
              <Text style={styles.def_stat}><Text style={styles.bold_text}>WILL:</Text>{entity.stats.will}</Text>
            </View>
            <View style={styles.conditions}>
              {entity.conditions.map(condition_id =>
                <Chip
                  key={condition_id}
                  compact={true}
                  style={styles.condition}
                  onClose={() => {
                    removeCondition(condition_id)
                  }}
                  onPress={() => {
                    // @ts-ignore
                    navigation.navigate("ConditionDetails",{id:condition_id as string, category:CompendiumCategory.glossary,mode:null})
                  }}
                >{conditions[condition_id as string]}</Chip>
              )}
              <View style={{ ...styles.condition, alignItems:"center", justifyContent:"center" }}>
                <Badge style={{
                  backgroundColor: theme.colors.primary,
                }}
                  onPress={showDialog}
                >
                  {/* @ts-ignore */}
                  <Icon name='plus' />
                </Badge>
              </View>
            </View>
          </View>
        </View>
      </View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>New Condition</Dialog.Title>
          <Dialog.ScrollArea>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }} style={{ height:"60%"}}>
              <RadioButton.Group onValueChange={(newValue:any) => setNewCondition(newValue)} value={newCondition!}>
                {
                  Object.keys(conditions).map(key => 
                    <View style={styles.radio_item} key={key}>
                      <RadioButton value={key} />
                      <Text>{conditions[key]}</Text>
                    </View>
                  )
                }
              </RadioButton.Group>
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={addCondition}>Add</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  )


}
const styles = StyleSheet.create({
  radio_item: {
    flexDirection: "row",
    alignItems: "center",
    marginTop:5,
  },
  condition: {
    marginHorizontal: 3,
    marginVertical:3,
    height:35,
  },
  conditions: {
    marginTop:10,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems:"center"
  },
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
    // width: 30,
    // height: 30,
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