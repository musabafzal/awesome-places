import { SET_PLACES, REMOVE_PLACE } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';
import { authGetToken } from './auth';

export const addPlace = (placeName, location, image) => {
  return (dispatch, getState) => {
    let authToken;
    dispatch(uiStartLoading());
    dispatch(authGetToken())
    .then(idToken => {
      authToken = idToken;
      return fetch("https://us-central1-rn-course-1538831387650.cloudfunctions.net/storeImage?auth=" + idToken, {
        method: "post",
        body: JSON.stringify({
          image: image.base64
        }),
        headers: {
          "Authorization": "Bearer " + idToken
        }
      })
    })
    .catch(() => {
      alert("No valid token found")
      dispatch(uiStopLoading());
    })
    .then(res => res.json())
    .then(parsedRes => {
      const placeData = {
        name: placeName,
        location: location, 
        image: parsedRes.imageUrl
      }
      return fetch("https://rn-course-1538831387650.firebaseio.com/places.json?auth=" + authToken, {
        method: "post",
        body: JSON.stringify(placeData)
      })
    })
    .then(res => res.json())
    .then(parsedRes => {
      console.log(parsedRes);
      dispatch(uiStopLoading());
    })
    .catch(err => {
      console.log(err);
      alert("Something went wrong");
      dispatch(uiStopLoading());      
    })
  };
};

export const getPlaces = () => {
  return (dispatch, getState) => {
    dispatch(authGetToken())
      .then(token => {
        return fetch("https://rn-course-1538831387650.firebaseio.com/places.json?auth=" + token)
      })
      .catch(() => {
        alert("No valid token found")
      })
      .then(res => res.json())
      .then(parsedRes => {
        const places = [];
        for(let key in parsedRes) {
          places.push({
            ...parsedRes[key],
            image: {
              uri: parsedRes[key].image
            },
            key: key
          })
        }
        dispatch(setPlaces(places));
      })
      .catch(err => {
        alert("Something went wrong");
        console.log(err)
      })
  }
}

export const setPlaces = (places) => {
  return {
    type: SET_PLACES,
    places: places
  }
}

export const deletePlace = (key) => {
  return (dispatch, getState) => {
    dispatch(removePlace(key))
    dispatch(authGetToken())
      .then(token => {
        return fetch("https://rn-course-1538831387650.firebaseio.com/places/" + key + ".json?auth=" + token, {
          method: "DELETE",
        })
      })
      .then(res => res.json())
      .then(parsedRes => {
        console.log("Done!")
      })
      .catch(err => {
        alert("Something went wrong");
        console.log(err)
      })
  }
}

export const removePlace = key => {
  return {
     type: REMOVE_PLACE,
     key: key
  }
}