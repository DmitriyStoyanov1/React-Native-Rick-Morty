import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Header, Image} from 'react-native-elements';

import List from './components/menu/List';

const Layout = () => {
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const menuToggle = () => {
    setIsDropdownActive(dropdown => !dropdown);
  };

  return (
    <View style={styles.container}>
      <Header
        leftContainerStyle={styles.center}
        rightContainerStyle={styles.center}
        containerStyle={styles.header}
        backgroundColor={'#42275a'}
        leftComponent={{
          icon: 'menu',
          onPress: menuToggle,
          color: '#fff',
          iconStyle: {color: '#fff'},
        }}
        centerComponent={
          <Image
            source={require('./assets/logo.png')}
            style={{
              width: 200,
              height: 100,
              resizeMode: 'contain',
            }}
          />
        }
        rightComponent={{icon: 'home', color: '#fff'}}
      />
      {isDropdownActive && <List />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#bdaecc',
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

  // sectionContainer: {
  //   marginTop: 32,
  //   paddingHorizontal: 24,
  // },
  // sectionTitle: {
  //   fontSize: 24,
  //   fontWeight: '600',
  // },
  // sectionDescription: {
  //   marginTop: 8,
  //   fontSize: 18,
  //   fontWeight: '400',
  // },
  // highlight: {
  //   fontWeight: '700',
  // },
});

export default Layout;
