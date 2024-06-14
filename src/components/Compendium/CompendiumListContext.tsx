import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type FC,
  type PropsWithChildren,
} from 'react';
import { Category } from '../../types/entityTypes';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompendiumCategoryParams } from '../../types/navigatorTypes';
import { cloneDeep, debounce } from 'lodash';
import { genSearchRegex } from '../../helpers/genSearchRegex';
import { Setter } from '../../types/setter';
import { useDeepCompareEffect } from '../../helpers/useDeepCompareEffect';

export type ICompendiumListContext = Setter<'loading', boolean> &
  Setter<'listing', Array<any>> &
  Setter<'filters', any> &
  Setter<'searchQuery', any> &
  Setter<'categoryData', Record<string, string>> &
  Setter<'itemDisplayConfig', DisplayConfig> &
  Setter<'textSearchEnabled', boolean> &
  Setter<'viewData', any[]> & {
    openDetails: (id: string) => void;
  };

export interface DisplayConfig {
  name: string;
  stats: Array<string | { value: string; label: string }>;
}

export interface CompendiumData {
  listing: any;
  filters: any;
  itemDisplayConfig: DisplayConfig;
  data: any;
}

interface Filter {
  filterType: string;
  items: { label: string; value: string }[];
  selected: { label: string; value: string };
  placeholder: string;
}

const CompendiumListContext = createContext<ICompendiumListContext | null>(
  null,
);
CompendiumListContext.displayName = 'CompendiumListContext';

interface CompendiumListContextProps
  extends NativeStackScreenProps<CompendiumCategoryParams, 'Listing'> {
  category: Category;
  children: ReactNode;
}

const CompendiumListContextProvider: FC<CompendiumListContextProps> = ({
  children,
  category,
  navigation,
  route,
}) => {
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState<Array<any>>([]);
  const [categoryData, setCategoryData] = useState<Record<string, string>>({});
  const [itemDisplayConfig, setItemDisplayConfig] = useState<DisplayConfig>(
    {} as DisplayConfig,
  );
  const [textSearchEnabled, setTextSearchEnabled] = useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const [filters, setFilters] = useState<any>({});

  const [viewData, setViewData] = useState<any[]>([]);
  const filterListing = (
    listing: any[],
    filters: any,
    searchQuery: string,
    textSearchEnabled: boolean,
  ) => {
    setLoading(true);
    try {
      const result = Object.values(listing).filter(item => {
        for (let filterKey in filters) {
          const filter = filters[filterKey];
          const itemProp = item[filterKey];
          const isString = typeof itemProp == 'string';
          const isArray = Array.isArray(itemProp);
          if (filter.value != null) {
            if (filter.searchMethod == 'include') {
              if (
                isString &&
                !item[filterKey]
                  .toLowerCase()
                  .includes(filter.value.toLowerCase())
              )
                return false;
              if (isArray)
                return item[filterKey].some((value: string) =>
                  value.toLowerCase().includes(filter.value.toLowerCase()),
                );
            } else if (filter.searchMethod == 'equal') {
              if (isString && item[filterKey] != filter.value) return false;
              if (isArray)
                return item[filterKey].some(
                  (value: string) => value == filter.value,
                );
            }
          }
        }
        if (textSearchEnabled && searchQuery) {
          const query = genSearchRegex(searchQuery);
          const description = categoryData[item.id];
          if (description && query) {
            const matches = query.regexp.test(description);
            return !!matches;
          }
        }
        if (!item.name.toLowerCase().includes(searchQuery.toLowerCase()))
          return false;
        return true;
      });
      setViewData(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFilterListing = useCallback(debounce(filterListing, 100), []);

  const filterValues = useMemo(
    () => Object.values(filters).map((filter: any) => filter.value),
    [filters],
  );

  useDeepCompareEffect(() => {
    debouncedFilterListing(listing, filters, searchQuery, textSearchEnabled);
  }, [filterValues, searchQuery, textSearchEnabled]);

  const configure = (data: CompendiumData) => {
    setListing(data.listing);
    setCategoryData(data.data);
    setItemDisplayConfig(data.itemDisplayConfig);
    let categoryDataFilters = cloneDeep(data.filters);
    for (const key in categoryDataFilters) {
      categoryDataFilters[key].value = null;
      for (let i = 0; i < categoryDataFilters[key].items.length; i++) {
        const itemValue = categoryDataFilters[key].items[i];
        categoryDataFilters[key].items[i] = {
          label: itemValue,
          value: itemValue,
        };
      }
    }
    setFilters(categoryDataFilters);
    setLoading(false);
  };

  useEffect(() => {
    if (category == Category.bestiary)
      import(`../../data/monster/data.js`).then(data =>
        configure(data as CompendiumData),
      );
    if (category == Category.weapons)
      import(`../../data/weapons/data.js`).then(data =>
        configure(data as CompendiumData),
      );
    if (category == Category.trap)
      import(`../../data/trap/data.js`).then(data =>
        configure(data as CompendiumData),
      );
    if (category == Category.theme)
      import(`../../data/theme/data.js`).then(data =>
        configure(data as CompendiumData),
      );
    if (category == Category.ritual)
      import(`../../data/ritual/data.js`).then(data =>
        configure(data as CompendiumData),
      );
    if (category == Category.race)
      import(`../../data/race/data.js`).then(data =>
        configure(data as CompendiumData),
      );
    if (category == Category.power)
      import(`../../data/power/data.js`).then(data =>
        configure(data as CompendiumData),
      );
    if (category == Category.paragonpower)
      import(`../../data/paragonpower/data.js`).then(data =>
        configure(data as CompendiumData),
      );
    if (category == Category.themepower)
      import(`../../data/themepower/data.js`).then(data =>
        configure(data as CompendiumData),
      );
    if (category == Category.epicdestinypower)
      import(`../../data/epicdestinypower/data.js`).then(data =>
        configure(data as CompendiumData),
      );
    if (category == Category.poison)
      import(`../../data/poison/data.js`).then(data =>
        configure(data as CompendiumData),
      );
    if (category == Category.paragonpath)
      import(`../../data/paragonpath/data.js`).then(data =>
        configure(data as CompendiumData),
      );
    if (category == Category.item)
      import(`../../data/item/data.js`).then(data =>
        configure(data as CompendiumData),
      );
    if (category == Category.implement)
      import(`../../data/implement/data.js`).then(data =>
        configure(data as CompendiumData),
      );
    if (category == Category.glossary)
      import(`../../data/glossary/data.js`).then(data =>
        configure(data as CompendiumData),
      );
    if (category == Category.feat)
      import(`../../data/feat/data.js`).then(data =>
        configure(data as CompendiumData),
      );
    if (category == Category.epicdestiny)
      import(`../../data/epicdestiny/data.js`).then(data =>
        configure(data as CompendiumData),
      );
    if (category == Category.disease)
      import(`../../data/disease/data.js`).then(data =>
        configure(data as CompendiumData),
      );
    if (category == Category.deity)
      import(`../../data/deity/data.js`).then(data =>
        configure(data as CompendiumData),
      );
    if (category == Category.companion)
      import(`../../data/companion/data.js`).then(data =>
        configure(data as CompendiumData),
      );
    if (category == Category.class)
      import(`../../data/class/data.js`).then(data =>
        configure(data as unknown as CompendiumData),
      );
    if (category == Category.background)
      import(`../../data/background/data.js`).then(data =>
        configure(data as CompendiumData),
      );
    if (category == Category.armor)
      import(`../../data/armor/data.js`).then(data =>
        configure(data as CompendiumData),
      );
  }, []);

  const openDetails = (id: string) => {
    navigation.navigate('ItemDetails', {
      id: id,
      category: category,
      mode: route.params.mode,
    });
  };

  const value = useMemo(
    () => ({
      loading,
      setLoading,
      listing,
      setListing,
      categoryData,
      setCategoryData,
      itemDisplayConfig,
      setItemDisplayConfig,
      textSearchEnabled,
      setTextSearchEnabled,
      searchQuery,
      setSearchQuery,
      filters,
      setFilters,
      viewData,
      setViewData,
      openDetails,
    }),
    [
      loading,
      listing,
      categoryData,
      itemDisplayConfig,
      textSearchEnabled,
      searchQuery,
      filters,
      viewData,
    ],
  );

  return (
    <CompendiumListContext.Provider value={value}>
      {children}
    </CompendiumListContext.Provider>
  );
};

const useCompendiumListContext = () => {
  const context = useContext(CompendiumListContext);
  if (context === null) {
    throw new Error(
      `useCompendiumListContext is used outside of ${CompendiumListContext.displayName}`,
    );
  }
  return context;
};

export { CompendiumListContextProvider, useCompendiumListContext };
