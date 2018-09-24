import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, ImageBackground } from 'react-native';

import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import backgroundImage from '../../assets/background.jpg';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';

class AuthScreen extends Component {
  state = {
    viewMode: Dimensions.get('window').height > 500 ? "potrait" : "landscape"
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

  loginHandler = () => {
    startMainTabs();
  }

  render() {
    let headingText = null;
    if (this.state.viewMode === "potrait") {
      headingText = (
        <MainText>
          <HeadingText>Please Log In</HeadingText>
        </MainText>
      );
    }
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.container}>
          {headingText}
          <ButtonWithBackground color="#29aaf4" title="Switch to Login" />
          <View style={styles.inputContainer}>
            <DefaultInput placeholder="Your E-Mail Address" style={styles.input} />
            <View style={this.state.viewMode === "potrait" ? styles.potraitPasswordContainer : styles.landscapePasswordContainer} >
              <View style={this.state.viewMode === "potrait" ? styles.potraitPasswordWrapper : styles.landscapePasswordWrapper} >
                <DefaultInput placeholder="Password" style={styles.input} />
              </View>
              <View style={this.state.viewMode === "potrait" ? styles.potraitPasswordWrapper : styles.landscapePasswordWrapper} >
                <DefaultInput placeholder="Confirm Password" style={styles.input} />
              </View>
            </View>
          </View>
          <ButtonWithBackground color="#29aaf4" title="Submit" onPress={this.loginHandler} />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%"
  },
  input: {
    backgroundColor: "#eee",
    borderColor: "#bbb"
  },
  backgroundImage: {
    width: "100%",
    flex: 1
  },
  landscapePasswordContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  potraitPasswordContainer: {
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  landscapePasswordWrapper: {
    width: "49%"
  },
  potraitPasswordWrapper: {
    width: "100%"
  }
});

export default AuthScreen;