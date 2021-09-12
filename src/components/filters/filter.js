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
      <View style={styles.categories}>{filters}</View>

      <View>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={onFilterAction}>
          <Text style={styles.textStyle}>FILTER</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  filters: {
    display: 'flex',
    alignItems: 'center',
  },
  categories: {
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    width: 200,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  buttonClose: {
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: '#2196F3',
  },
  textStyle: {
    textAlign: 'center',
    letterSpacing: 2,
    color: 'white',
    fontWeight: 'bold',
  },
});
