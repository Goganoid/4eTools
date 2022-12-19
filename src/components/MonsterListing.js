import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import BigList from "react-native-big-list";
import DropDownPicker from 'react-native-dropdown-picker';
import { Divider, Searchbar, Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { combat_roles, group_roles, maxLevel, monster_sizes, races } from '../data/monsterFilterSettings';
import { monsters_listing } from '../data/monsters';


const zip = (arr, ...arrs) => {
  return arr.map((val, i) => arrs.reduce((a, arr) => [...a, arr[i]], [val]));
}



export const MonsterListing = ({ navigation, route }) => {
  const theme = useTheme();
  const showAddScreen = route.params?.showAddScreen ?? false;
  console.log("Show add screen ", showAddScreen)
  const renderItem = ({ item, index }) => {
    return (<>
      <TouchableOpacity onPress={() => navigation.navigate("MonsterDetails", { id: item.id,showAddButton:showAddScreen })}>
        <View style={styles.element} key={index}>
          <Text variant='titleMedium' >{item.name}</Text>
          <View style={styles.stats}>
            <Text style={styles.stat}><Text style={styles.bold_text}>Level:</Text>{item.level}</Text>
            <Text style={styles.stat}><Text style={styles.bold_text}>Role:</Text>{item.group_role} {item.combat_role}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <Divider />
    </>)
  }
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);
  const [filters, setFilters] = useState({
    level:{
      placeholder:'Level',
      value: null,
      open: false,
      items: [...Array(maxLevel).keys()].map(key => { return { label: `${key + 1}`, value: `${key + 1}` } })
    },
    race:{
      placeholder:'Race',
      value: null,
      open: false,
      items: races.map(value => { return { label: value, value: value } })
    },
    size:{
      placeholder:'Size',
      value: null,
      open: false,
      items: monster_sizes.map(value => { return { label: value, value: value } })
    },
    combatRole:{
      placeholder:'Combat Role',
      value: null,
      open: false,
      items: combat_roles.map(value => { return { label: value, value: value } })
    },
    groupRole:{
      placeholder:'Group Role',
      value: null,
      open: false,
      items: group_roles.map(value => { return { label: value, value: value } })
    },
   

  })
  const viewData = Object.values(monsters_listing).filter(monster =>{

    if(filters.level.value!=null && monster.level!=filters.level.value) return false;
    if(filters.groupRole.value!=null && monster.group_role!=filters.groupRole.value) return false;
    if(filters.combatRole.value!=null && !monster.combat_role.includes(filters.combatRole.value)) return false;
    if(filters.race.value!=null && !monster.race.includes(filters.race.value)) return false;
    if(filters.size.value!=null && monster.size!=filters.size.value) return false;
    if(searchQuery.length!=0 && !monster.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  }
  );
    
  const onDropdownOpen = (filterKey) => {
    let newFilters = {...filters};
    Object.keys(filters).forEach(key => {
      if(key!=filterKey){
        newFilters[key].open = false;
      }
    })
    setFilters(newFilters);
  }
  const setValueOrUnselect = (newValue, currentValue, setValue) => {
    console.log("Setting value");
    console.log(`From ${currentValue} to ${newValue}`);
    if (currentValue == newValue) {
      setValue(null);
    }
    else {
      setValue(newValue);
    }
  }

  return (<>
    {/* <View  style={{backgroundColor:theme.colors.onSecondary,padding:"2.5%",zIndex:1000}}> */}
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
      style={{ ...styles.searchbar, backgroundColor: theme.colors.onSecondary }}
      inputStyle={styles.searchbar_input}
      icon={({ size, color }) => (
        <Icon name="search" size={16} color="#000" />
      )} />
    <View style={{ ...styles.dropdowns }}>

      {
        Object.keys(filters).map((key,index)=>{
          console.log(key);
          const filter = filters[key];
          const setProp = (propName,propValue)=>{
            let newFilters = {...filters};
            console.log(`Setting ${propName} from ${newFilters[key][propName]} to ${propValue}`);
            newFilters[key][propName] = propValue;
            setFilters(newFilters);
          }
          const setOpen = (open)=>setProp("open",open);
          const setItems = (items)=>setProp("items",items);
          const setValue = (value)=>setProp("value",value);
          const zIndex = (Object.keys(filters).length-index)*1000;
          return <DropDownPicker
          key={index}
          placeholder={filter.placeholder}
          open={filter.open}
          value={filter.value}
          items={filter.items}
          setOpen={setOpen}
          setValue={(value)=>setValueOrUnselect(value(),filter.value,setValue)}
          setItems={setItems}
          style={styles.dropdown}
          containerStyle={styles.dropdown_container}
          textStyle={styles.dropdown_text}
          zIndex={zIndex}
          zIndexInverse={zIndex-1000}
          onOpen={()=>onDropdownOpen(key)}
          autoScroll={true}
        />
        })
      }
    </View>

    <BigList
      data={viewData}
      itemHeight={65}
      renderItem={renderItem}
    />

    {/* </View> */}


  </>

  )
}

const styles = StyleSheet.create({
  searchbar_input: {
    fontSize: 12,
  },
  searchbar: {
    padding: 0,
    height: 40,

  },
  dropdowns: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "center"
  },
  dropdown: {
    minHeight: 10,
  },
  dropdown_text: {
    fontSize: 12,
  },
  dropdown_container: {
    marginTop: 5,
    flex: 1,
    marginHorizontal: "1%",
    flexBasis: "30%"
  },
  module_item: {
    flexDirection: "row",
    alignItems: "center"
  },
  bold_text: {
    fontWeight: "bold"
  },
  stat: {
    paddingHorizontal: 10
  },
  stats: {
    flexDirection: 'row',
    alignItems: "center",
  },
  icon: {
    padding: 0, margin: 0
  },
  element: {
    height: 50,
    padding: 10,
    marginVertical: 5,
    zIndex: 1
  }
})