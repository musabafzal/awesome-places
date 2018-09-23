import React, { Component } from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';

import imagePlaceHolder from '../../assets/abu.jpg';

class PickImage extends Component {
  render() {
    return (
      <View>
        <View style={styles.placeholder}>
          <Image source={imagePlaceHolder} style={styles.imagePreview} />
        </View>
        <View style={styles.button}>
          <Button title="Pick Image" />
        </View>
      </View>
      );
  }
}

const styles = StyleSheet.create({
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "80%",
    height: 150,
  },
  button: {
    margin: 8
  },
  imagePreview: {
    height: "100%",
    width: "100%"
  }
});

export default PickImage;