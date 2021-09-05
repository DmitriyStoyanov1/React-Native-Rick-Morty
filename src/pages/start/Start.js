import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Header, Image} from 'react-native-elements';

import {ImageBackground} from 'react-native';

import List from '../../components/menu/List';

export const StartPage = ({navigation}) => {
  const [dropdown, setDropdown] = useState(false);

  const loadScene = page => {
    navigation.navigate(page);
  };

  const menuToggle = () => {
    setDropdown(!dropdown);
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
            source={require('../../assets/logo.png')}
            style={{
              width: 200,
              height: 100,
              resizeMode: 'contain',
            }}
          />
        }
        rightComponent={{icon: 'home', color: '#fff'}}
      />
      <ImageBackground
        style={styles.imgBackground}
        resizeMode="contain"
        source={require('../../assets/rick_morty.png')}>
        {dropdown && <List loadScene={loadScene} />}
      </ImageBackground>
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
