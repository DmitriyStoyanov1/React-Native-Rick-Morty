import {StyleSheet, View, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import React from 'react';

export function FilterItem({
  paramName,
  filterItemName,
  onFilterChange,
  paramItemName,
}) {
  return (
    <View style={styles.dropDown}>
      <Text style={styles.category}>{paramItemName}:</Text>
      <Picker
        selectedValue={filterItemName}
        onValueChange={(itemValue, itemIndex) =>
          onFilterChange(paramItemName, itemValue)
        }>
        {paramName &&
          paramName.map(({label, value}, index) => (
            <Picker.Item key={index} label={label} value={value} />
          ))}
      </Picker>
    </View>
  );
}

// params,
//   FilterItemName,
//   onFilterChange,
//   paramItemName,

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
