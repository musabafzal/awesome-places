import React, { Component } from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker';

class PickImage extends Component {
  componentWillMount() {
    this.reset()
  }

  reset = () => {
    this.setState({
      pickedImage: null
    })
  }

  pickedImageHandler = () => {
    ImagePicker.showImagePicker({
      title: "Pick an Image",
      maxHeight: 600,
      maxWidth: 800 
    }, res => {
      if(res.didCancel) {
        console.log("User cancelled!");
      } else if(res.error) {
        console.log("Error", res.error);
      } else {
        this.setState({
          pickedImage: {
            uri: res.uri
          }
        })
        this.props.onImagePick({uri: res.uri, base64: res.data});
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image source={this.state.pickedImage} style={styles.imagePreview} />
        </View>
        <View style={styles.button}>
          <Button title="Pick Image" onPress={this.pickedImageHandler}/>
        </View>
      </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center"
  },
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