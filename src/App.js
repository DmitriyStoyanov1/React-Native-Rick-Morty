import React from 'react';
import {StyleSheet, View} from 'react-native';
import MainStack from './routes';

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
});

export default App;
