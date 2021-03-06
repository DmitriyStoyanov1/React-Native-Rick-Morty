import {StyleSheet, View, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import React from 'react';

export function FilterItem({label, options = [], value, onChange}) {
  const handleFilterChange = React.useCallback(
    selectValue => {
      onChange(label, selectValue);
    },
    [label, onChange],
  );

  return (
    <View style={styles.dropDown}>
      <Text style={styles.category}>{label}:</Text>

      <Picker selectedValue={value} onValueChange={handleFilterChange}>
        {options.map(({label: optionLabel, value}, index) => (
          <Picker.Item
            style={styles.fontSize}
            key={index}
            label={optionLabel}
            value={value}
          />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  dropDown: {
    backgroundColor: '#fff',
    flexGrow: 1,
    borderWidth: 1,
    borderRadius: 5,
  },
  category: {
    fontSize: 20,
    paddingLeft: 15,
  },
  fontSize: {
    fontSize: 15,
  },
});
