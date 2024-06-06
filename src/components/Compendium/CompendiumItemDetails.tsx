import React from 'react';
import { ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { IconButton, useTheme } from 'react-native-paper';
import RenderHtml, {
  defaultHTMLElementModels,
  HTMLContentModel,
  MixedStyleRecord,
} from 'react-native-render-html';
// import { EncounterContext } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createEnemy, createPower } from '../../helpers/entities';
import { GroupContext } from '../../context/GroupContext';
import { EncounterContext } from '../../context/EncounterContext';
import { PowerTrackerContext } from '../../Navigators/PowerTrackerStack';
import { CustomThemeProvider } from '../shared/ThemeProvider';
import { CategoryMode, Category } from '../../types/entityTypes';
import { CompendiumCategoryParams } from '../../types/navigatorTypes';
import { ModalContainer } from '../shared/ModalContainer';

const defaultDescription = '<h1 class=player>Description not found</h1>';

export const CompendiumItemDetails = ({
  route,
  navigation,
}: NativeStackScreenProps<CompendiumCategoryParams, 'ItemDetails'>) => {
  const theme = useTheme();
  const { id, category } = route.params;
  const mode = route.params.mode;

  const headStyle = {
    fontSize: 20,
    padding: 0,
  };

  const classesStyles = {
    mihead: { ...headStyle },
    thHead: { ...headStyle },
    player: { ...headStyle },
    trap: headStyle,
    milevel: {
      fontSize: 14,
    },
    miflavor: {
      backgroundColor: theme.colors.surface,
      lineHeight: 25,
    },
    alt: {
      lineHeight: 20,
      backgroundColor: theme.colors.surface,
    },
    indent: {
      marginLeft: 30,
      marginVertical: 0,
    },
    tbod: {
      marginLeft: 30,
      marginVertical: 0,
    },
    powerstat: {
      marginLeft: 30,
      marginVertical: 0,
    },
    indent1: {
      marginLeft: 30,
      marginVertical: 0,
    },
    mic4: {
      width: 0,
    },
    trapblocktitle: {
      fontWeight: 'bold',
    },
    monster: headStyle,
    flavor: {
      lineHeight: 25,
    },
    flavorIndent: {
      marginLeft: 30,
      marginVertical: 0,
    },
  };
  const tagsStyles: MixedStyleRecord = {
    body: {
      color: theme.colors.onSurface,
    },
    p: {
      paddingHorizontal: 5,
      color: theme.colors.onSurface,
    },
    h1: {
      color: theme.colors.onSurface,
      fontSize: 20,
    },
    h3: {
      fontSize: 15,
    },
    td: {
      color: theme.colors.onSurface,
      backgroundColor: theme.dark ? theme.colors.surfaceVariant : '#e0e0e0',
    },
    table: {
      padding: 5,
      fontSize: 10,
    },
  };
  if (category == undefined)
    throw 'Category is undefined in CompendiumItemDetails';
  if (mode == undefined) throw 'Mode is undefined in CompendiumItemDetails';

  const context: any =
    mode == CategoryMode.group
      ? React.useContext(GroupContext)
      : mode == CategoryMode.encounter
      ? React.useContext(EncounterContext)
      : mode == CategoryMode.power
      ? React.useContext(PowerTrackerContext)
      : null;
  let details: any = {};
  if (category == Category.bestiary)
    details = require('../../data/monster/data.json');
  if (category == Category.weapons)
    details = require('../../data/weapons/data.json');
  if (category == Category.trap) details = require('../../data/trap/data.json');
  if (category == Category.theme)
    details = require('../../data/theme/data.json');
  if (category == Category.ritual)
    details = require('../../data/ritual/data.json');
  if (category == Category.race) details = require('../../data/race/data.json');
  if (category == Category.power)
    details = require('../../data/power/data.json');
  if (category == Category.paragonpower)
    details = require('../../data/paragonpower/data.json');
  if (category == Category.themepower)
    details = require('../../data/themepower/data.json');
  if (category == Category.epicdestinypower)
    details = require('../../data/epicdestinypower/data.json');
  if (category == Category.poison)
    details = require('../../data/poison/data.json');
  if (category == Category.paragonpath)
    details = require('../../data/paragonpath/data.json');
  if (category == Category.item) details = require('../../data/item/data.json');
  if (category == Category.implement)
    details = require('../../data/implement/data.json');
  if (category == Category.glossary)
    details = require('../../data/glossary/data.json');
  if (category == Category.feat) details = require('../../data/feat/data.json');
  if (category == Category.epicdestiny)
    details = require('../../data/epicdestiny/data.json');
  if (category == Category.disease)
    details = require('../../data/disease/data.json');
  if (category == Category.deity)
    details = require('../../data/deity/data.json');
  if (category == Category.companion)
    details = require('../../data/companion/data.json');
  if (category == Category.class)
    details = require('../../data/class/data.json');
  if (category == Category.background)
    details = require('../../data/background/data.json');
  if (category == Category.armor)
    details = require('../../data/armor/data.json');
  const { width } = useWindowDimensions();
  if (details[id] == undefined)
    console.log('Description not found falling back to defaultDescription');
  const source = {
    html: details[id] ?? defaultDescription,
  };
  const customHTMLElementModels = {
    span: defaultHTMLElementModels.span.extend({
      contentModel: HTMLContentModel.block,
    }),
  };

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>{context && <IconButton icon="check" onPress={create} />}</>
      ),
    });
  }, [navigation, context]);

  const create = async () => {
    if (context != null && category == Category.bestiary) {
      let entity = createEnemy(id);
      context.addEntity(entity);
      showMessage({
        message: `Monster was added`,
        type: 'info',
        backgroundColor: theme.colors.onPrimary,
      });
    }
    if (context != null && category == Category.power) {
      let power = createPower(id);
      context.addPower(power);
      showMessage({
        message: `Power was added`,
        type: 'info',
        backgroundColor: theme.colors.onPrimary,
      });
    }
  };

  const view = (
    <ScrollView style={{ paddingHorizontal: 10 }}>
      <RenderHtml
        contentWidth={width}
        source={source}
        // @ts-ignore
        classesStyles={classesStyles}
        tagsStyles={tagsStyles}
        customHTMLElementModels={customHTMLElementModels}
      />
    </ScrollView>
  );

  return (
    <CustomThemeProvider>
      {mode == CategoryMode.modal ? (
        <ModalContainer navigation={navigation}>{view}</ModalContainer>
      ) : (
        view
      )}
    </CustomThemeProvider>
  );
};
