// import {
//   Card,
//   CardActions,
//   CardContent,
//   CardMedia,
//   Button,
//   Typography,
//   makeStyles,
// } from '@material-ui/core';
import {StyleSheet, View, Button, Image, Text} from 'react-native';
import React from 'react';

export function CharacterCard({id, name, image, onPress}) {
  return (
    <View style={styles.item}>
      <Image source={{uri: image}} style={styles.media} />
      <Text>{name}</Text>
      <Text>Some additional description</Text>
      <Button
        title="Open"
        size="small"
        color="primary"
        onPress={() => onPress(id)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  media: {
    height: 140,
  },
  item: {
    backgroundColor: '#f9c2ff',
    height: 150,
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
});
