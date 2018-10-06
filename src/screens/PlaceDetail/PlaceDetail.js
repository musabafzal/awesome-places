import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, Platform, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import Icon from 'react-native-vector-icons/Ionicons';
import { deletePlace } from '../../store/actions/index';

class PlaceDetailScreen extends Component {

  state = {
    viewMode: "potrait"
  }

  constructor(props) {
    super(props);
    Dimensions.addEventListener("change", this.updateStyles)
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles)
  }

  updateStyles = (dims) => {
    this.setState({
      viewMode: dims.window.height > 500 ? "potrait" : "landscape"
    })
  }

  placeDeleteHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.key);
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={[
        styles.container,
        this.state.viewMode === "potrait"
          ? styles.potraitContainer
          : styles.landscapeContainer
      ]}>
        <View style={styles.placeDetailContainer}>
          <View style={styles.subContainer}>
            <Image source={this.props.selectedPlace.image} style={styles.placeImage} />
          </View>
          <View style={styles.subContainer}>
            <MapView
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                ...this.props.selectedPlace.location,
                latitudeDelta: 0.0122,
                longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0122
              }}
              style={styles.map}
            >
              <MapView.Marker coordinate={this.props.selectedPlace.location} />
            </MapView>
          </View>
        </View>
        <View style={styles.subContainer}>
          <View>
            <Text style={styles.placeName}>
              {this.props.selectedPlace.name}
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={this.placeDeleteHandler}>
              <View style={styles.deleteButton} >
                <Icon size={30} name={Platform.OS === 'android' ? "md-trash" : "ios-trash"} color="red" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 22,
    flex: 1
  },
  potraitContainer: {
    flexDirection: "column"
  },
  landscapeContainer: {
    flexDirection: "row"
  },
  placeImage: {
    width: "100%",
    height: "100%"
  },
  placeName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28
  },
  placeDetailContainer: {
    flex: 2
  },
  deleteButton: {
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  subContainer: {
    flex: 1
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: (key) => dispatch(deletePlace(key))
  }
}

export default connect(null, mapDispatchToProps)(PlaceDetailScreen);