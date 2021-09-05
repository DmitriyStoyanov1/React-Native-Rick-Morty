import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';

const list = [
  {
    title: 'Characters',
    name: 'Characters',
  },
  {
    title: 'Episodes',
    name: 'Episodes',
  },
  {
    title: 'Locations',
    name: 'Locations',
  },
];

const List = ({loadScene}) => {
  return (
    <View>
      {list.map((l, i) => (
        <ListItem
          Component={TouchableScale}
          friction={90}
          tension={100}
          activeScale={0.9}
          key={i}
          containerStyle={styles.listItem}
          onPress={() => loadScene(l.name)}>
          <ListItem.Content>
            <ListItem.Title style={{color: 'black', fontWeight: 'bold'}}>
              {l.title}
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron color="black" />
        </ListItem>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    borderWidth: 5,
    borderColor: '#42275a',
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 25,
  },
});

export default List;
