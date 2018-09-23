import React, { Component } from 'react';
import { View, Text, Button, Image, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { addPlace } from '../../store/actions/index';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import PickImage from '../../components/PickImage/PickImage';

class SharePlaceScreen extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = event => {
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
          side: "left"
        })
      }
    }
  }

  placeAddedHandler = placeName => {
    this.props.onAddPlace(placeName);
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <HeadingText><MainText>Share a Place with us!</MainText></HeadingText>
          <PickImage />
          <View style={styles.placeholder}><Text>Map</Text></View>
          <View style={styles.button}>
            <Button title="Locate Me" />
          </View>
          <PlaceInput  />
          <Button title="Share the Place!" />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
})
const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName) => dispatch(addPlace(placeName))
  }
}

export default connect(null, mapDispatchToProps)(SharePlaceScreen);