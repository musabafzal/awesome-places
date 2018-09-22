import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import PlaceInput from '../../components/PlaceList/PlaceList'
import { addPlace } from '../../store/actions/index';

class SharePlaceScreen extends Component {
  render () {
    return (
      <View>
        <PlaceInput onPlaceAdded={}/>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName) => dispatch(addPlace(placeName))
  }
}

export default connect(null, mapDispatchToProps)(SharePlaceScreen);