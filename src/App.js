import React from 'react';
import {StyleSheet, View} from 'react-native';
import MainStack from './navigate';

const App = () => {
  return (
    <View style={styles.container}>
      <MainStack />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#bdaecc',
    flex: 1,
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  header: {
    elevation: 10,
    shadowOffset: {width: 10, height: 10},
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
