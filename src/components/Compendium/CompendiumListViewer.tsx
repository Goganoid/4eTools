import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import BigList from "react-native-big-list";
import DropDownPicker from 'react-native-dropdown-picker';
import { ActivityIndicator, Divider, Searchbar, Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import capitalize from '../../helpers/capitalize';
import limitLength from '../../helpers/limitLength';
import { CompendiumCategoryParams } from '../../Navigators/CompendiumListStack';
import { CompendiumCategory, CompendiumCategoryMode } from '../../Navigators/CompendiumStackNavigator';
var clone = require('clone');

interface DisplayConfig{
    name: string,
    stats: Array<string|{value:string, label:string}>
}

export interface CompendiumData {
    listing: any,
    filters: any,
    itemDisplayConfig: DisplayConfig
    data: any,
}

export const CompendiumListViewer = ({ navigation, route }: NativeStackScreenProps<CompendiumCategoryParams, 'Listing'>) => {
    const category = route?.params.category;
    console.log("Category ", category);
    const theme = useTheme();

    const [loading, setLoading] = useState(true);
    const [listing, setListing] = useState<Array<any>>([]);
    const [itemDisplayConfig, setItemDisplayConfig] = useState<DisplayConfig>({} as DisplayConfig);
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = (query: string) => setSearchQuery(query);

    const [filters, setFilters] = useState<any>({})

    const renderItem = ({ item, index }:{item:any,index:number}) => {
        return (<>
            <TouchableOpacity onPress={() => navigation.navigate("ItemDetails", { id: item.id as string, category: category, mode:route.params.mode})}>
                <View style={styles.element} key={index}>
                    <Text variant='titleMedium' >{item[itemDisplayConfig.name]}</Text>
                    <View style={styles.stats}>
                        {
                            itemDisplayConfig.stats.map((stat, index) => {

                                const label = typeof stat == 'string' ? capitalize(stat) : stat.label;
                                let value = typeof stat == 'string' ? item[stat] : item[stat.value] ;
                                if (Array.isArray(value)) {
                                    value = value.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
                                    value = `${value[0]}-${value[value.length - 1]}`;
                                }
                                else if (typeof (value) == 'string') {
                                    value = limitLength(value, 30)
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
                        if (isArray) return item[filterKey].some((value:string) => value.toLowerCase().includes(filter.value.toLowerCase()));
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
                        if (isArray) return item[filterKey].some((value:string) => value == filter.value);
                    }

                }
            }
            if (!item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
            return true;
        }
        );

    const configure = (data: CompendiumData) => {
        console.log("Configuring using data ", Object.keys(data));
        setListing(data.listing);
        setItemDisplayConfig(data.itemDisplayConfig);
        let categoryDataFilters = clone(data.filters);
        for ( const key in categoryDataFilters) {
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

        if (category == CompendiumCategory.bestiary) import(`../../data/monster/data.js`).then(data => configure(data as CompendiumData));
        if (category == CompendiumCategory.weapons) import(`../../data/weapons/data.js`).then(data => configure(data as CompendiumData));
        if (category == CompendiumCategory.trap) import(`../../data/trap/data.js`).then(data => configure(data as CompendiumData));
        if (category == CompendiumCategory.theme) import(`../../data/theme/data.js`).then(data => configure(data as CompendiumData));
        if (category == CompendiumCategory.ritual) import(`../../data/ritual/data.js`).then(data => configure(data as CompendiumData));
        if (category == CompendiumCategory.race) import(`../../data/race/data.js`).then(data => configure(data as CompendiumData));
        if (category == CompendiumCategory.power) import(`../../data/power/data.js`).then(data => configure(data as CompendiumData));
        if (category == CompendiumCategory.paragonpower) import(`../../data/paragonpower/data.js`).then(data => configure(data as CompendiumData));
        if (category == CompendiumCategory.themepower) import(`../../data/themepower/data.js`).then(data => configure(data as CompendiumData));
        if (category == CompendiumCategory.epicdestinypower) import(`../../data/epicdestinypower/data.js`).then(data => configure(data as CompendiumData));
        if (category == CompendiumCategory.poison) import(`../../data/poison/data.js`).then(data => configure(data as CompendiumData));
        if (category == CompendiumCategory.paragonpath) import(`../../data/paragonpath/data.js`).then(data => configure(data as CompendiumData));
        if (category == CompendiumCategory.item) import(`../../data/item/data.js`).then(data => configure(data as CompendiumData));
        if (category == CompendiumCategory.implement) import(`../../data/implement/data.js`).then(data => configure(data as CompendiumData));
        if (category == CompendiumCategory.glossary) import(`../../data/glossary/data.js`).then(data => configure(data as CompendiumData));
        if (category == CompendiumCategory.feat) import(`../../data/feat/data.js`).then(data => configure(data as CompendiumData));
        if (category == CompendiumCategory.epicdestiny) import(`../../data/epicdestiny/data.js`).then(data => configure(data as CompendiumData));
        if (category == CompendiumCategory.disease) import(`../../data/disease/data.js`).then(data => configure(data as CompendiumData));
        if (category == CompendiumCategory.deity) import(`../../data/deity/data.js`).then(data => configure(data as CompendiumData));
        if (category == CompendiumCategory.companion) import(`../../data/companion/data.js`).then(data => configure(data as CompendiumData));
        if (category == CompendiumCategory.class) import(`../../data/class/data.js`).then(data => configure(data as unknown as CompendiumData));
        if (category == CompendiumCategory.background) import(`../../data/background/data.js`).then(data => configure(data as CompendiumData));
        if (category == CompendiumCategory.armor) import(`../../data/armor/data.js`).then(data => configure(data as CompendiumData));
    }, [])


    const onDropdownOpen = (filterKey:string) => {
        let newFilters = { ...filters };
        Object.keys(filters).forEach(key => {
            if (key != filterKey) {
                newFilters[key].open = false;
            }
        })
        setFilters(newFilters);
    }
    const setValueOrUnselect = (newValue:string, currentValue:string, setValue:(value:any)=>void) => {
        console.log("Setting value");
        console.log(`From ${currentValue} to ${newValue}`);
        if (currentValue == newValue) {
            setValue(null);
        }
        else {
            setValue(newValue);
        }
    }


    const setProp = (key:string, propName:string, propValue:any) => {
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
        <View style={{ ...styles.dropdowns, backgroundColor: theme.colors.onSecondary }}>

            {
                Object.keys(filters).map((key, index) => {
                    const filter = filters[key];

                    const setOpen = (open:boolean) => setProp(key, "open", open);
                    const setItems = (items:Array<any>) => setProp(key, "items", items);
                    const setValue = (value:string) => setProp(key, "value", value);
                    const zIndex = (Object.keys(filters).length - index) * 1000;
                    return <DropDownPicker
                        key={key}
                        placeholder={filter.placeholder}
                        open={filter.open}
                        value={filter.value}
                        items={filter.items}
                        // @ts-ignore
                        setOpen={setOpen}
                        // @ts-ignore
                        setValue={(value: () => any) => setValueOrUnselect(value(), filter.value, setValue)}
                        // @ts-ignore
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
                            padding: 2,
                        }}
                        maxHeight={300}
                        searchTextInputStyle={{
                            fontSize: 10,
                            padding: 2,
                        }}
                    />
                })
            }
        </View>
        {
            loading
                ? <ActivityIndicator animating={true} />
                :
                <BigList
                    data={viewData}
                    itemHeight={105}
                    renderItem={renderItem}
                />
        }
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