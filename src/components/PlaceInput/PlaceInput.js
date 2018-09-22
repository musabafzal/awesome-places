import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';

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
        <TextInput
          style={styles.placeInput}
          placeholder="An awesome place"
          value={this.state.placeName}
          onChangeText={this.placeNameChangedHandler} />
        <Button
          style={styles.placeButton}
          onPress={() => (this.props.press(this.state.placeName))}
          title="Add" />
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