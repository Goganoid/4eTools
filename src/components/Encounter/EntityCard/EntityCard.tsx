import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Dialog, Divider, IconButton, Portal, RadioButton, Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { EncounterContext } from '../../../context/EncounterContext';
import { GroupContext } from '../../../context/GroupContext';
import { Entity, EntityType } from '../../../types/entityTypes';
import { EncounterMode, EncounterStackParamList, GroupStackParamList } from '../../../types/navigatorTypes';
import { Conditions, AddConditionDialog } from './Conditions'
import { InitiativeDisplay } from './InitiativeDisplay';
import { Stats } from './Stats';



type Props = {
  navigation: (NativeStackNavigationProp<EncounterStackParamList, 'Encounter'>
    | NativeStackNavigationProp<GroupStackParamList, "EntitiesList">),
  entity: Entity,
  setStat: (entity: Entity, propName: string, value: any) => void,
  setConditions: (entity: Entity, conditions: Array<string>) => void,
  mode: EncounterMode,
  showInitiative?: boolean,
  highlight: boolean
}


export const EntityCard = ({ navigation, entity, setStat, setConditions,
  highlight = false,
  mode,
  showInitiative = true }: Props) => {
  const context = mode == EncounterMode.group ? React.useContext(GroupContext) :
    mode == EncounterMode.encounter ? React.useContext(EncounterContext) : null;
  if (context == null) throw "Context in EntityCard is null";
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
  const removeCondition = (id: string) => {
    setConditions(entity, entity.conditions.filter(condition => condition != id));
  }
  function EntityInformationButton() {
    if (entity.monster_id == null && entity.image_uri == null) return null;
    const onPress: (event: any) => void =
      entity.monster_id != null
        ? // @ts-ignore
        () => navigation.navigate("Details", { id: entity.monster_id })
        : // @ts-ignore
        () => navigation.navigate("CustomEntityDetails", { entity: entity });
    return <IconButton
      style={{ marginVertical: 0, marginHorizontal: 0, padding: 0 }}
      icon="information-outline"
      size={20}
      onPress={onPress} />;
  }
  const EntityTitle =
    <View style={styles.title}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text variant="titleLarge">{entity.name}</Text>
        <IconButton icon='delete' style={styles.icon} size={20}
          onPress={() => context.removeEntity(entity.uuid)} />
      </View>
      <Text variant="bodySmall">{entity.group_role}</Text>
    </View>;
   
  const EntityIcon =
    <View>
      <Icon
        size={30}
        name={entity.type == EntityType.Enemy ? 'emoticon-devil-outline' : 'emoticon-outline'}
        color={(theme.colors as any).text}
        style={styles.entity_icon} />
    </View>;
  return (
    <>
      <View style={[styles.entity_card, highlight && { borderWidth: 1.5, borderColor: theme.colors.onPrimaryContainer }]}>
        <View style={styles.background}>
          <View style={styles.entity_card_left_side}>
            {EntityIcon}
            {showInitiative && <InitiativeDisplay entity={entity} setStat={setStat} />}
          </View>
          <View style={styles.entity_card_right_side}>
            <View style={styles.nameSection}>
              {EntityTitle}
              <EntityInformationButton />
            </View>
            <Divider />
            <Stats entity={entity} setStat={setStat} />
            <Conditions
              entity={entity}
              removeCondition={removeCondition}
              navigation={navigation}
              showDialog={showDialog} />
          </View>
        </View>
      </View>
      <Portal>
        <AddConditionDialog
          addCondition={addCondition}
          hideDialog={hideDialog}
          newCondition={newCondition}
          setNewCondition={setNewCondition}
          visible={visible}
        />
      </Portal>
    </>
  )


}
export const styles = StyleSheet.create({
  radio_item: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  condition: {
    marginHorizontal: 3,
    marginVertical: 3,
    height: 35,
  },
  conditions: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center"
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



