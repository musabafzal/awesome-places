import React, { Component } from 'react';
import { View, Keyboard, TouchableWithoutFeedback, Dimensions, StyleSheet, ImageBackground, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';

import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import backgroundImage from '../../assets/background.jpg';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import validate from '../../utility/validation';
import { tryAuth } from '../../store/actions/auth';

class AuthScreen extends Component {
  state = {
    viewMode: Dimensions.get('window').height > 500 ? "potrait" : "landscape",
    authMode: 'signup',
    controls: {
      email: {
        value: "",
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false
      },
      password: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 6
        },
        touched: false
      },
      confirmPassword: {
        value: "",
        valid: false,
        validationRules: {
          equalTo: 'password'
        },
        touched: false
      }
    }
  }

  constructor(props) {
    super(props);
    Dimensions.addEventListener("change", this.updateStyles)
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles)
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === 'login' ? 'signup' : 'login'
      }
    })
  }

  updateStyles = (dims) => {
    this.setState({
      viewMode: dims.window.height > 500 ? "potrait" : "landscape"
    })
  }

  loginHandler = () => {
    const authData = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value
    };
    this.props.onLogin(authData);
    startMainTabs();
  }

  updateInputState = (key, value) => {
    let connectedValue = {}
    if (this.state.controls[key].validationRules.equalTo) {
      let equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      }
    }
    if (key === "password") {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      }
    }
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid:
              key === "password" ?
                validate(prevState.controls.confirmPassword.value,
                  prevState.controls.confirmPassword.validationRules,
                  connectedValue
                ) :
                prevState.controls.confirmPassword.valid
          },
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(value, prevState.controls[key].validationRules, connectedValue),
            touched: true
          },
        }
      }
    })
  }

  render() {
    let headingText = null;
    let confirmPasswordControl = null;

    if (this.state.viewMode === "potrait") {
      headingText = (
        <MainText>
          <HeadingText>Please Log In</HeadingText>
        </MainText>
      );
    }
    if (this.state.authMode === "signup") {
      confirmPasswordControl = (
        <View style={this.state.viewMode === "potrait" ? styles.potraitPasswordWrapper : styles.landscapePasswordWrapper} >
          <DefaultInput
            placeholder="Confirm Password"
            style={styles.input}
            value={this.state.controls.confirmPassword.value}
            onChangeText={(val) => this.updateInputState('confirmPassword', val)}
            valid={this.state.controls.confirmPassword.valid}
            touched={this.state.controls.confirmPassword.touched}
            secureTextEntry
          />
        </View>
      )
    }
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          {headingText}
          <ButtonWithBackground
            color="#29aaf4"
            title="Switch to Login"
            onPress={this.switchAuthModeHandler}
          >
            Switch to {this.state.authMode === 'login' ? "Sign Up" : "Login"}
          </ButtonWithBackground>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inputContainer}>
              <DefaultInput
                placeholder="Your E-Mail Address"
                style={styles.input}
                value={this.state.controls.email.value}
                onChangeText={(val) => this.updateInputState('email', val)}
                valid={this.state.controls.email.valid}
                touched={this.state.controls.email.touched}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
              />
              <View style={this.state.viewMode === "potrait" || this.state.authMode === "login" ? styles.potraitPasswordContainer : styles.landscapePasswordContainer} >
                <View style={this.state.viewMode === "potrait" || this.state.authMode === "login" ? styles.potraitPasswordWrapper : styles.landscapePasswordWrapper} >
                  <DefaultInput
                    placeholder="Password"
                    style={styles.input}
                    value={this.state.controls.password.value}
                    onChangeText={(val) => this.updateInputState('password', val)}
                    valid={this.state.controls.password.valid}
                    touched={this.state.controls.password.touched}
                    secureTextEntry
                  />
                </View>
                {confirmPasswordControl}
              </View>
            </View>
          </TouchableWithoutFeedback>
          <ButtonWithBackground color="#29aaf4" title="Submit" onPress={this.loginHandler} disabled={!this.state.controls.confirmPassword.valid && this.state.authMode === "signup" || !this.state.controls.email.valid || !this.state.controls.password.valid} />
        </KeyboardAvoidingView>
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

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (authData) => dispatch(tryAuth(authData))
  };
};

export default connect(null, mapDispatchToProps)(AuthScreen);