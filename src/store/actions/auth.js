import { AsyncStorage } from "react-native";

import { uiStartLoading, uiStopLoading } from "./ui";
import startMainTabs from '../../screens/MainTabs/startMainTabs';
import { AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from "./actionTypes";

import App from "../../../App";

export const tryAuth = (authData, authMode) => {
  return dispatch => {
    dispatch(uiStartLoading())
    let url = null
    if (authMode == "signup") {
      url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCo8TFk96QN35uCduvNUNKGMAoJLgqg_B8";
    } else {
      url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCo8TFk96QN35uCduvNUNKGMAoJLgqg_B8";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .catch(err => {
        console.log(err)
        alert("Auth failed")
        dispatch(uiStopLoading())
      })
      .then(res => res.json())
      .then(parsedRes => {
        dispatch(uiStopLoading())
        console.log(parsedRes)
        if (parsedRes.error) {
          alert("Auth failed")
        } else {
          dispatch(authStoreToken(parsedRes.idToken, parsedRes.expiresIn, parsedRes.refreshToken))
          startMainTabs()
        }
      })
  }
}

export const authStoreToken = (token, expiresIn, refreshToken) => {
  return dispatch => {
    dispatch(authSetToken(token));
    const now = new Date();
    const expiryDate = new Date(now.getTime() + expiresIn * 1000);
    dispatch(authSetToken(token, expiryDate))
    AsyncStorage.setItem("ap:auth:token", token);
    AsyncStorage.setItem("ap:auth:expiryDate", expiryDate.toString());
    AsyncStorage.setItem("ap:auth:refreshToken", refreshToken)
  }
}

export const authSetToken = (token, expiryDate) => {
  return {
    type: AUTH_SET_TOKEN,
    idToken: token,
    expiryDate: expiryDate
  }
}

export const authGetToken = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {
      const token = getState().auth.idToken;
      const expiryDate = getState().auth.expiryDate;
      if (!token || ( new Date(expiryDate) <= new Date())) {
        let fetchedToken;
        AsyncStorage.getItem("ap:auth:token")
          .catch(err => reject())
          .then(tokenFromStorage => {
            if (!tokenFromStorage) {
              reject()
              return;
            }
            fetchedToken = tokenFromStorage;
            return AsyncStorage.getItem("ap:auth:expiryDate")
          })
          .then(expiryDate => {
            const now = new Date();
            const parsedExpiryDate = Date.parse(expiryDate);
            if (parsedExpiryDate > now) {
              dispatch(authSetToken(fetchedToken));
              resolve(fetchedToken)  
            } else {
              reject()
            }
          })
      } else {
        resolve(token);
      }
    })
    return promise
      .catch(err => {
        console.log("lol")
      return AsyncStorage.getItem("ap:auth:refreshToken")
        .then(refreshToken => {
          console.log(refreshToken)
          return fetch("https://securetoken.googleapis.com/v1/token?key=AIzaSyCo8TFk96QN35uCduvNUNKGMAoJLgqg_B8", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "grant_type=refresh_token&refresh_token=" + refreshToken
          })
        })
        .then(res => res.json())
        .then(parsedRes => {
          console.log(parsedRes)
          if (parsedRes.id_token) {
            console.log("refresh")
            dispatch(authStoreToken(parsedRes.id_token, parsedRes.expires_in, parsedRes.refresh_token))
            return parsedRes.id_token;
          } else {
            dispatch(authClearStorage());
          }
        })
    })
    .then(token => {
      if(!token) {
        throw new Error();
      } else {
        console.log("lolbro")
        return token;
      }
    })
  }
}

export const authAutoSignIn = () => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        startMainTabs();
      })
      .catch(err => console.log("Failed to fetch token"));
  }
}

export const authClearStorage = () => {
  return dispatch => {
    AsyncStorage.removeItem("ap:auth:token");
    AsyncStorage.removeItem("ap:auth:expiryDate")    
    return AsyncStorage.removeItem("ap:auth:refreshToken");
  }
}

export const authLogout = () => {
  return dispatch => {
    dispatch(authClearStorage())
      .then(() => {
        App()
        dispatch(authRemoveToken())
      });
  }
}

export const authRemoveToken = () => {
  return {
    type: AUTH_REMOVE_TOKEN
  }
}