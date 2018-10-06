import React, { Component } from 'react';
import { View, Dimensions, Button, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

class PickLocation extends Component {
  state = {
    focusedLoaction: {
      latitude: 37.79000352,
      longitude: -112.4013726,
      latitudeDelta: 0.0122,
      longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0122
    }
  }

  render() {
    return (
      <View style={styles.container}>
          <MapView 
          provider={PROVIDER_GOOGLE}
          initialRegion={this.state.focusedLoaction}
          style={styles.map}
          />
          <View style={styles.button}>
            <Button title="Locate Me" />
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