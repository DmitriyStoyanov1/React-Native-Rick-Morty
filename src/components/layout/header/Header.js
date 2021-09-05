import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export function Header() {
  return (
    <View style={styles.container}>
      <Text>NavBar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    backgroundColor: '#42275a',
    shadowOffset: {width: 10, height: 10},
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    // boxShadow: '0px -3px 8px 2px'
  },
});

export default Header;
