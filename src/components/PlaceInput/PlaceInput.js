import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';

import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';

const placeInput = props => (
      <View style={styles.inputContainer} >
        <DefaultInput placeholder="Place Name" 
        value={props.placeName} 
        onChangeText={props.onChangeText}/>
      </View >
);

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

export default placeInput;