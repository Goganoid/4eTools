import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import BigList from 'react-native-big-list';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  ActivityIndicator,
  Button,
  Divider,
  IconButton,
  Searchbar,
  Text,
  useTheme,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import capitalize from '../../helpers/capitalize';
import limitLength from '../../helpers/limitLength';
import { useCompendiumListContext } from './CompendiumListContext';

export const CompendiumListContent = ({ navigation }: any) => {
  const {
    itemDisplayConfig,
    loading,
    openDetails,
    viewData,
    searchQuery,
    setSearchQuery,
  } = useCompendiumListContext();
  const theme = useTheme();
  const styles = StyleSheet.create({
    searchbar_input: {
      fontSize: 12,
      minHeight: 50,
    },
    searchbar: {
      padding: 0,
    },
    dropdowns: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: '100%',
      justifyContent: 'center',
    },
    dropdown: {
      minHeight: 10,
      backgroundColor: theme.colors.onPrimary,
    },
    dropdown_text: {
      fontSize: 12,
      color: theme.colors.onSurface,
    },
    dropdown_container_style: {
      elevation: 1000,
      backgroundColor: theme.colors.onPrimary,
    },
    dropdown_container: {
      marginTop: 5,
      flex: 1,
      marginHorizontal: '1%',
      flexBasis: '30%',
    },
    module_item: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    bold_text: {
      fontWeight: 'bold',
    },
    stat: {
      flexBasis: '50%',
      paddingVertical: 3,
      flex: 1,
      // paddingHorizontal: 10,
    },
    stats: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    icon: {
      padding: 0,
      margin: 0,
    },
    element: {
      height: 90,
      padding: 10,
      marginVertical: 5,
      zIndex: 1,
    },
  });
  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <>
        <TouchableOpacity onPress={() => openDetails(item.id)}>
          <View style={styles.element} key={index}>
            <Text variant="titleMedium">{item[itemDisplayConfig.name]}</Text>
            <View style={styles.stats}>
              {itemDisplayConfig.stats.map((stat, index) => {
                const label =
                  typeof stat == 'string' ? capitalize(stat) : stat.label;
                let value =
                  typeof stat == 'string' ? item[stat] : item[stat.value];
                if (Array.isArray(value)) {
                  value = value.sort((a, b) =>
                    a.localeCompare(b, undefined, { numeric: true }),
                  );
                  value = `${value[0]}-${value[value.length - 1]}`;
                } else if (typeof value == 'string') {
                  value = limitLength(value, 30);
                } else {
                  console.log(
                    `Strange value ${value} in ${item} detected while rendering item in CompendiumListViewer`,
                  );
                }
                return (
                  <Text style={styles.stat} key={index}>
                    <Text style={styles.bold_text}>{label}: </Text>
                    {value}
                  </Text>
                );
              })}
            </View>
          </View>
        </TouchableOpacity>
        <Divider />
      </>
    );
  };
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 3,
        }}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{
            ...styles.searchbar,
            backgroundColor: theme.colors.onSecondary,
            flex: 1,
            paddingRight: 5,
          }}
          inputStyle={styles.searchbar_input}
          icon={({ size, color }) => (
            <Icon name="search" size={16} color={theme.colors.onSurface} />
          )}
        />
        <IconButton
          icon="filter"
          iconColor={theme.colors.onSurface}
          size={20}
          onPress={() => navigation.toggleDrawer()}
        />
      </View>

      {loading ? (
        <ActivityIndicator animating={true} />
      ) : (
        <BigList data={viewData} itemHeight={105} renderItem={renderItem} />
      )}
    </>
  );
};
