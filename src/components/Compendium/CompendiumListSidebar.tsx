import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Checkbox, Text, useTheme } from 'react-native-paper';
import { useCompendiumListContext } from './CompendiumListContext';
import { Dropdown } from 'react-native-element-dropdown';

export const CompendiumListSidebar = () => {
  const { textSearchEnabled, setTextSearchEnabled, filters, setFilters } =
    useCompendiumListContext();
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
      flexDirection: 'column',
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
      // flex: 1,
      marginHorizontal: '1%',
      // flexBasis: '30%',
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
  const onDropdownOpen = (filterKey: string) => {
    let newFilters = { ...filters };
    Object.keys(filters).forEach(key => {
      if (key != filterKey) {
        newFilters[key].open = false;
      }
    });
    setFilters(newFilters);
  };
  const setValueOrUnselect = (
    newValue: string,
    currentValue: string,
    setValue: (value: any) => void,
  ) => {
    if (currentValue == newValue) {
      setValue(null);
    } else {
      setValue(newValue);
    }
  };

  const setProp = (key: string, propName: string, propValue: any) => {
    let newFilters = { ...filters };
    newFilters[key][propName] = propValue;
    setFilters(newFilters);
  };
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 15,
          paddingVertical: 8,
        }}>
        <Text variant="bodyLarge">Enable full text search</Text>
        <Checkbox
          status={textSearchEnabled ? 'checked' : 'unchecked'}
          onPress={() => {
            setTextSearchEnabled(!textSearchEnabled);
          }}
        />
      </View>
      <View style={{ ...styles.dropdowns }}>
        {Object.keys(filters).map((key, index) => {
          const filter = filters[key];

          const setOpen = (open: boolean) => setProp(key, 'open', open);
          const setItems = (items: Array<any>) => setProp(key, 'items', items);
          const setValue = (value: string) => setProp(key, 'value', value);
          const zIndexInverse = (index + 1) * 1000;
          return (
            <DropDownPicker
              key={key}
              placeholder={filter.placeholder}
              open={filter.open}
              value={filter.value}
              items={filter.items}
              // @ts-ignore
              setOpen={setOpen}
              // @ts-ignore
              setValue={(value: () => any) =>
                setValueOrUnselect(value(), filter.value, setValue)
              }
              // @ts-ignore
              setItems={setItems}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdown_container_style}
              containerStyle={styles.dropdown_container}
              textStyle={styles.dropdown_text}
              zIndex={filter.open ? 9999 : 1000}
              zIndexInverse={zIndexInverse}
              onOpen={() => onDropdownOpen(key)}
              autoScroll={true}
              searchable={filter.filterType == 'search'}
              searchContainerStyle={{
                minHeight: 20,
                padding: 2,
              }}
              maxHeight={300}
              searchTextInputStyle={{
                fontSize: 10,
                padding: 2,
              }}
            />
          );
        })}
      </View>
    </View>
  );
};
