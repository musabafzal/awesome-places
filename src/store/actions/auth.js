import { uiStartLoading, uiStopLoading } from "./ui";
import startMainTabs from '../../screens/MainTabs/startMainTabs';
import { AUTH_SET_TOKEN } from "./actionTypes";

export const tryAuth = (authData, authMode) => {
  return dispatch => {
    dispatch(uiStartLoading())
    let url = null
    if(authMode == "signup") {
      url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCo8TFk96QN35uCduvNUNKGMAoJLgqg_B8";
    } else {
      url ="https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCo8TFk96QN35uCduvNUNKGMAoJLgqg_B8";
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
      if(parsedRes.error) {
        alert("Auth failed")
      } else {
        dispatch(authSetToken(parsedRes.idToken))
        startMainTabs()
      }
    })
  }
}

export const authSetToken = (token) => {
  return {
    type: AUTH_SET_TOKEN,
    idToken: token
  }
}