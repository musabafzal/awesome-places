import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';

import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';

class PlaceInput extends Component {
  state = {
    placeName: '',
  }

  placeNameChangedHandler = (val) => {
    this.setState({ placeName: val })
  }

  render() {
    return (
      <View style={styles.inputContainer} >
        <DefaultInput placeholder="Place Name" 
        value={this.state.placeName} 
        onChangeText={this.placeNameChangedHandler}/>
      </View >
    )
  }
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  placeInput: {
    width: '70%'
  },
  placeButton: {
    width: '30%'
  }
});

export default PlaceInput;