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

  state = {
    controls: {
      placeName: null,
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
        this.state.controls.image.value
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
            value: image,
            valid: true
          }
        }
      }
    })
  }

  render() {
    let submitButton = <Button title="Share the Place!" onPress={this.placeAddedHandler} disabled={!this.state.controls.location.valid} />
    ;
    
    if(this.props.isLoading) {
      submitButton = <ActivityIndicator/>;
    }

    return (
      <ScrollView>
        <View style={styles.container}>
          <HeadingText><MainText>Share a Place with us!</MainText></HeadingText>
          <PickImage onImagePick={this.imagePickedHandler}/>
          <PickLocation onLocationPick={this.locationPickedHandler} />
          <PlaceInput placeName={this.state.placeName} onChangeText={this.placeNameChangedHandler} />
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

const  mapStateToProps = state => {
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