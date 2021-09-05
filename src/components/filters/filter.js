import {StyleSheet, View, Pressable, Text} from 'react-native';
import React from 'react';
import {Picker} from '@react-native-picker/picker';

import {FilterItem} from './filterItem';

const GENDERS = [
  {label: 'All', value: 'all'},
  {label: 'Female', value: 'female'},
  {label: 'Male', value: 'male'},
  {label: 'Genderless', value: 'genderless'},
  {label: 'Unknown', value: 'unknown'},
];

const SPECIES = [
  {label: 'All', value: 'all'},
  {label: 'Human', value: 'human'},
  {label: 'Alien', value: 'alien'},
];

const STATUS = [
  {label: 'All', value: 'all'},
  {label: 'Alive', value: 'alive'},
  {label: 'Dead', value: 'dead'},
  {label: 'Unknown', value: 'unknown'},
];

const paramsArr = [GENDERS, SPECIES, STATUS];

const paramItemName = ['gender', 'species', 'status'];

export function Filter({filter, onFilterChange, onFilterAction}) {
  const {gender, species, status} = filter;

  const FilterItemName = [gender, species, status];

  console.log(FilterItemName, 'FilterItemName');

  return (
    <View style={styles.filters}>
      {/* <View style={styles.dropDown}>
        <Text style={styles.category}>Gender:</Text>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue, itemIndex) =>
            onFilterChange('gender', itemValue)
          }>
          {GENDERS.map(({label, value}, index) => (
            <Picker.Item key={index} label={label} value={value} />
          ))}
        </Picker>
      </View> */}
      {paramItemName.map((item, index) => {
        // console.log(paramsArr[index], 'paramsArr[index]');
        // console.log(FilterItemName[index], 'FilterItemName[index]');
        // console.log(onFilterChange, 'onFilterChange');
        // console.log(paramItemName[index], 'paramItemName[index]');
        return (
          <FilterItem
            paramName={paramsArr[index]}
            filterItemName={FilterItemName[index]}
            onFilterChange={onFilterChange}
            paramItemName={paramItemName[index]}
          />
        );
      })}

      {/* <View style={styles.dropDown}>
        <Text style={styles.category}>Species:</Text>
        <Picker
          selectedValue={species}
          // style={{height: 50, width: 150}}
          onValueChange={(itemValue, itemIndex) =>
            onFilterChange('species', itemValue)
          }>
          {SPECIES.map(({label, value}, index) => (
            <Picker.Item key={index} label={label} value={value} />
          ))}
        </Picker>
      </View>

      <View style={styles.dropDown}>
        <Text style={styles.category}>Status:</Text>
        <Picker
          selectedValue={status}
          onValueChange={(itemValue, itemIndex) =>
            onFilterChange('status', itemValue)
          }>
          {STATUS.map(({label, value}, index) => (
            <Picker.Item key={index} label={label} value={value} />
          ))}
        </Picker>
      </View> */}

      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => onFilterAction()}>
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
  formControl: {
    minWidth: 120,
  },
  textCenter: {
    textAlign: 'center',
  },
  dropDown: {
    flexGrow: 1,
    borderWidth: 1,
  },
  category: {
    fontSize: 20,
    paddingLeft: 15,
  },
});
