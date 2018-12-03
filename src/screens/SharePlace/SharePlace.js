import React, { Component } from 'react';
import { Text, View, Button, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
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

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  componentWillMount() {
    this.reset()
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
    if (val.trim() != "") {
      this.setState(prevState => {
        return {
          controls: {
            ...prevState.controls,
            placeName: {
              value: val,
              valid: true
            }
          },
        }
      }
      );
    }
  }

  placeAddedHandler = () => {
    this.props.onAddPlace(
      this.state.controls.placeName.value,
      this.state.controls.location,
      this.state.controls.image.value
    );
    this.reset()
    this.imagePicker.reset()
    this.locationPicker.reset()
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
            value: image,
            valid: true
          }
        }
      }
    })
  }

  reset = () => {
    this.setState(prevState => {
      return {
        controls: {
          placeName: {
            value: "",
            valid: false
          },
          location: {
            latitude: null,
            longitude: null,
            valid: false
          },
          image: {
            value: null,
            valid: false
          }
        }
      }
    })
  }

  render() {
    let submitButton = <Button title="Share the Place!" onPress={this.placeAddedHandler} disabled={!this.state.controls.location.valid || !this.state.controls.placeName.valid || !this.state.controls.image.valid} />
      ;

    if (this.props.isLoading) {
      submitButton = <ActivityIndicator />;
    }

    return (
      <ScrollView>
        <View style={styles.container}>
          <HeadingText><MainText>Share a Place with us!</MainText></HeadingText>
          <PickImage onImagePick={this.imagePickedHandler} ref={ref => (this.imagePicker = ref)} />
          <PickLocation onLocationPick={this.locationPickedHandler} ref={ref => (this.locationPicker = ref)} />
          <PlaceInput placeName={this.state.controls.placeName.value} onChangeText={this.placeNameChangedHandler} />
          <View style={styles.button}>{submitButton}</View>
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

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SharePlaceScreen);