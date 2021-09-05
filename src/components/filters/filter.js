import {StyleSheet, View, Pressable, Text} from 'react-native';
import React from 'react';

import {FilterItem} from './filterItem';

export function Filter({
  filter,
  filterOptions,
  onFilterChange,
  onFilterAction,
}) {
  const filters = React.useMemo(() => {
    return Object.entries(filterOptions).map(([key, value], index) => {
      return (
        <FilterItem
          label={key}
          options={value}
          value={filter[key]}
          onChange={onFilterChange}
        />
      );
    });
  }, [filter, filterOptions, onFilterChange]);

  return (
    <View style={styles.filters}>
      {filters}

      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={onFilterAction}>
        <Text style={styles.textStyle}>FILTER</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  filters: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
