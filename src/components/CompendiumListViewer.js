import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import BigList from "react-native-big-list";
import DropDownPicker from 'react-native-dropdown-picker';
import { ActivityIndicator, Divider, Searchbar, Text, useTheme, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { combat_roles, group_roles, maxLevel, monster_sizes, races } from '../data/monsterFilterSettings';
import capitalize from '../helpers/capitalize';
import limitLength from '../helpers/limitLength';
var clone = require('clone');

const routes = {
    'weapons': '../data/weapons/data.js'
}


export const CompendiumListViewer = ({ navigation, route }) => {
    const category = route?.params.category;
    console.log("Category ", category);
    const theme = useTheme();
    const showAddScreen = route.params?.showAddScreen ?? false;

    const [loading, setLoading] = useState(true);
    const [listing, setListing] = useState([]);
    const [itemDisplayConfig, setItemDisplayConfig] = useState({});
    const renderItem = ({ item, index }) => {
        return (<>
            <TouchableOpacity onPress={() => navigation.navigate("ItemDetails", { id: item.id, category: category })}>
                <View style={styles.element} key={index}>
                    <Text variant='titleMedium' >{item[itemDisplayConfig.name]}</Text>
                    <View style={styles.stats}>
                        {
                            itemDisplayConfig.stats.map((stat, index) => {
                                const label = stat.label ?? capitalize(stat);
                                let value = item[stat.value] ?? item[stat];
                                if (Array.isArray(value)) {
                                    value = value.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
                                    value = `${value[0]}-${value[value.length - 1]}`;
                                }
                                else if(typeof(value)=='string'){
                                    value = limitLength(value,30)
                                }
                                else {
                                    console.log(`Strange value ${value} in ${item}`);
                                }
                                return <Text style={styles.stat} key={index}><Text style={styles.bold_text}>{label}: </Text>{value}</Text>
                            })
                        }
                    </View>
                </View>
            </TouchableOpacity>
            <Divider />
        </>)
    }
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);

    const [filters, setFilters] = useState({})
    const viewData = Object.values(listing)
        .filter(item => {
            for (let filterKey in filters) {
                const filter = filters[filterKey];
                const itemProp = item[filterKey];
                const isString = typeof (itemProp) == 'string';
                const isArray = Array.isArray(itemProp);
                if (filter.value != null) {
                    if (filter.searchMethod == 'include') {
                        if (isString &&
                            !item[filterKey].toLowerCase().includes(filter.value.toLowerCase())) return false;
                        if (isArray) return item[filterKey].some(value => value.toLowerCase().includes(filter.value.toLowerCase()));
                    }
                    else if (filter.searchMethod == 'equal') {
                        if (item.name == "Communal Weapon") {
                            console.log(item.name);
                            console.log({
                                isString,
                                isArray,
                                check: item[filterKey] != filter.value
                            })
                        }
                        if (isString && item[filterKey] != filter.value) return false;
                        if (isArray) return item[filterKey].some(value => value == filter.value);
                    }

                }
            }
            if (!item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
            return true;
        }
        );

    const configure = (data) => {
        console.log("Configuring using data ", Object.keys(data));
        setListing(data.listing);
        setItemDisplayConfig(data.itemDisplayConfig);
        let categoryDataFilters = clone(data.filters);
        for (key in categoryDataFilters) {
            categoryDataFilters[key].open = false;
            categoryDataFilters[key].value = null;
            for (let i = 0; i < categoryDataFilters[key].items.length; i++) {
                const itemValue = categoryDataFilters[key].items[i];
                categoryDataFilters[key].items[i] = {
                    label: itemValue, value: itemValue,
                }
            }
        }
        setFilters(categoryDataFilters);
        setLoading(false);
    }

    useEffect(() => {

        if (category == 'weapons') import(`../data/weapons/data.js`).then(data => configure(Object.assign({}, data)));
        if (category == 'trap') import(`../data/trap/data.js`).then(data => configure(Object.assign({}, data)));
        if (category == 'theme') import(`../data/theme/data.js`).then(data => configure(Object.assign({}, data)));
        if (category == 'ritual') import(`../data/ritual/data.js`).then(data => configure(Object.assign({}, data)));
        if (category == 'race') import(`../data/race/data.js`).then(data => configure(Object.assign({}, data)));
        if (category == 'power') import(`../data/power/data.js`).then(data => configure(Object.assign({}, data)));
        if (category == 'paragonpower') import(`../data/paragonpower/data.js`).then(data => configure(Object.assign({}, data)));
        if (category == 'themepower') import(`../data/themepower/data.js`).then(data => configure(Object.assign({}, data)));
        if (category == 'epicdestinypower') import(`../data/epicdestinypower/data.js`).then(data => configure(Object.assign({}, data)));
        if (category == 'poison') import(`../data/poison/data.js`).then(data => configure(Object.assign({}, data)));
        if (category == 'paragonpath') import(`../data/paragonpath/data.js`).then(data => configure(Object.assign({}, data)));
        if (category == 'item') import(`../data/item/data.js`).then(data => configure(Object.assign({}, data)));
        if (category == 'implement') import(`../data/implement/data.js`).then(data => configure(Object.assign({}, data)));
        if (category == 'glossary') import(`../data/glossary/data.js`).then(data => configure(Object.assign({}, data)));
        if (category == 'feat') import(`../data/feat/data.js`).then(data => configure(Object.assign({}, data)));
        if (category == 'epicdestiny') import(`../data/epicdestiny/data.js`).then(data => configure(Object.assign({}, data)));
        if (category == 'disease') import(`../data/disease/data.js`).then(data => configure(Object.assign({}, data)));
        if (category == 'deity') import(`../data/deity/data.js`).then(data => configure(Object.assign({}, data)));
        if (category == 'companion') import(`../data/companion/data.js`).then(data => configure(Object.assign({}, data)));
        if (category == 'class') import(`../data/class/data.js`).then(data => configure(Object.assign({}, data)));
        if (category == 'background') import(`../data/background/data.js`).then(data => configure(Object.assign({}, data)));
        if (category == 'armor') import(`../data/armor/data.js`).then(data => configure(Object.assign({}, data)));
    }, [])


    const onDropdownOpen = (filterKey) => {
        let newFilters = { ...filters };
        Object.keys(filters).forEach(key => {
            if (key != filterKey) {
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


    const setProp = (key, propName, propValue) => {
        let newFilters = { ...filters };
        console.log(`Setting ${propName} from ${newFilters[key][propName]} to ${propValue} in ${key}`);
        newFilters[key][propName] = propValue;
        console.log("ERROR");
        console.log(newFilters);
        setFilters(newFilters);
        console.log("AFTER SET")
    }

    return (<>
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
                Object.keys(filters).map((key, index) => {
                    const filter = filters[key];
           
                        const setOpen = (open) => setProp(key, "open", open);
                        const setItems = (items) => setProp(key, "items", items);
                        const setValue = (value) => setProp(key, "value", value);
                        const zIndex = (Object.keys(filters).length - index) * 1000;
                        return <DropDownPicker
                            key={key}
                            placeholder={filter.placeholder}
                            open={filter.open}
                            value={filter.value}
                            items={filter.items}
                            setOpen={setOpen}
                            setValue={(value) => setValueOrUnselect(value(), filter.value, setValue)}
                            setItems={setItems}
                            style={styles.dropdown}
                            containerStyle={styles.dropdown_container}
                            textStyle={styles.dropdown_text}
                            zIndex={zIndex}
                            zIndexInverse={zIndex - 1000}
                            onOpen={() => onDropdownOpen(key)}
                            autoScroll={true}
                            searchable={filter.filterType == "search"}
                            searchContainerStyle={{
                                minHeight: 20,
                                padding:2,
                            }}
                            maxHeight={300}
                            searchTextInputStyle={{
                                fontSize: 10,
                                padding:2,
                            }}
                        />
                })
            }
        </View>
        {
            loading
                ? <ActivityIndicator animating={true} />
                :
                //  <Text>FWfet</Text>
                <BigList
                    data={viewData}
                    itemHeight={105}
                    renderItem={renderItem}
                />
        }


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
        flexBasis: "50%",
        paddingVertical: 3,
        flex: 1,
        // paddingHorizontal: 10,
    },
    stats: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
    },
    icon: {
        padding: 0, margin: 0
    },
    element: {
        height: 90,
        padding: 10,
        marginVertical: 5,
        zIndex: 1,

    }
})