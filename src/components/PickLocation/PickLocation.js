import React, { Component } from 'react';
import { View, Dimensions, Button, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

class PickLocation extends Component {
  componentWillMount() {
    this.reset()
  }

  reset = () => {
    this.setState({
      focusedLoaction: {
        latitude: 37.7900352,
        longitude: -122.4013726,
        latitudeDelta: 0.0122,
        longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0122
      },
      locationChosen: true      
    })
  }

  pickLocationHandler = event => {
    const coords = event.nativeEvent.coordinate;
    this.map.animateToRegion({
      ...this.state.focusedLoaction,
      latitude: coords.latitude,
      longitude: coords.longitude
    })
    this.setState(prevState => {
      return {
        focusedLoaction: {
          ...prevState.focusedLoaction,
          latitude: coords.latitude,
          longitude: coords.longitude
        }
      }
    });
    this.props.onLocationPick({
      latitude: coords.latitude,
      longitude: coords.longitude
    })
  }

  getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      const coordsEvent = {
        nativeEvent: {
          coordinate: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          }
        }
      }
      this.pickLocationHandler(coordsEvent);
    },
      err => {
        console.log(err);
      }
    );
  }

  render() {
    let marker = null;

    if (this.state.locationChosen) {
      marker = <MapView.Marker coordinate={this.state.focusedLoaction} />
    }

    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          initialRegion={this.state.focusedLoaction}
          region={!this.state.locationChosen ? this.state.focusedLoaction : null}
          onPress={this.pickLocationHandler}
          style={styles.map}
          ref={ref => this.map = ref}
        >
          {marker}
        </MapView>
        <View style={styles.button}>
          <Button title="Locate Me" onPress={this.getLocationHandler}/>
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
  map: {
    width: "100%",
    height: 250
  },
  button: {
    margin: 8
  }

});

export default PickLocation;