import React from 'react';
import {ScrollView, StyleSheet, View } from 'react-native';
import { Badge, Chip, Dialog, RadioButton, useTheme,Text,Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Entity } from '../../../types/entityTypes';

export const conditions: any = {
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


type ConditionProps = {
  entity: Entity;
  removeCondition: (id: string) => void;
  navigation: any;
  showDialog: () => void;
};
export function Conditions({ entity, removeCondition, navigation, showDialog }: ConditionProps) {
  const theme = useTheme();
  return <View style={styles.conditions}>
    {entity.conditions.map(condition_id => <Chip
      key={condition_id}
      compact={true}
      style={styles.condition}
      onClose={() => {
        removeCondition(condition_id);
      }}
      onPress={() => {
        // @ts-ignore
        navigation.navigate("ConditionDetails", { id: condition_id as string });
      }}
    >{conditions[condition_id as string]}</Chip>
    )}
    <View style={{ ...styles.condition, alignItems: "center", justifyContent: "center" }}>
      <Badge style={{
        backgroundColor: theme.colors.primary,
      }}
        onPress={showDialog}
      >
        {/* @ts-ignore */}
        <Icon name='plus' />
      </Badge>
    </View>
  </View>;
}


type AddConditionDialogProps = {
  visible: boolean,
  hideDialog: () => void,
  setNewCondition: (condition: any) => void,
  newCondition: any,
  addCondition: () => void
}

export function AddConditionDialog({visible,hideDialog,setNewCondition,newCondition,addCondition}:AddConditionDialogProps) {
  return <Dialog visible={visible} onDismiss={hideDialog}>
    <Dialog.Title>New Condition</Dialog.Title>
    <Dialog.ScrollArea>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }} style={{ height: "60%" }}>
        <RadioButton.Group onValueChange={(newValue: any) => setNewCondition(newValue)} value={newCondition!}>
          {Object.keys(conditions).map(key => <View style={styles.radio_item} key={key}>
            <RadioButton value={key} />
            <Text>{conditions[key]}</Text>
          </View>
          )}
        </RadioButton.Group>
      </ScrollView>
    </Dialog.ScrollArea>
    <Dialog.Actions>
      <Button onPress={hideDialog}>Cancel</Button>
      <Button onPress={addCondition}>Add</Button>
    </Dialog.Actions>
  </Dialog>;
}


const styles = StyleSheet.create({
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
  }
});
