import React, { Component } from 'react';
import { View, Button, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { addPlace } from '../../store/actions/index';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';

class SharePlaceScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: "orange"
  }

  state = {
    controls: {
      placeName: null,
      location: {
        latitude: null,
        longitude: null,
        valid: false
      },
      image: {
        uri: null,
        valid: false
      }
    }
  }

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

  placeNameChangedHandler = val => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          placeName: val,
        },
      }
    }
    );
  }

  placeAddedHandler = () => {
    if (this.state.controls.placeName.trim() !== "") {
      this.props.onAddPlace(
        this.state.controls.placeName,
        this.state.controls.location,
        this.state.controls.image
      );
    }
  }

  locationPickedHandler = location => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          location: {
            latitude: location.latitude,
            longitude: location.longitude,
            valid: true
          }
        }
      }
    })
  }

  imagePickedHandler = (image) => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          image: {
            uri: image.uri,
            valid: true
          }
        }
      }
    })
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <HeadingText><MainText>Share a Place with us!</MainText></HeadingText>
          <PickImage onImagePick={this.imagePickedHandler}/>
          <PickLocation onLocationPick={this.locationPickedHandler} />
          <PlaceInput placeName={this.state.placeName} onChangeText={this.placeNameChangedHandler} />
          <Button title="Share the Place!" onPress={this.placeAddedHandler} disabled={!this.state.controls.location.valid} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  }
})
const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image))
  }
}

export default connect(null, mapDispatchToProps)(SharePlaceScreen);