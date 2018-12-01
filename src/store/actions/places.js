import { SET_PLACES, REMOVE_PLACE } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';

export const addPlace = (placeName, location, image) => {
  return dispatch => {
    dispatch(uiStartLoading());
    fetch("https://us-central1-rn-course-1538831387650.cloudfunctions.net/storeImage", {
      method: "post",
      body: JSON.stringify({
        image: image.base64
      })
    })
    .catch(err => {
      console.log(err);
      dispatch(uiStopLoading());
    })
    .then(res => res.json())
    .then(parsedRes => {
      const placeData = {
        name: placeName,
        location: location, 
        image: parsedRes.imageUrl
      }
      return fetch("https://rn-course-1538831387650.firebaseio.com/places.json", {
        method: "post",
        body: JSON.stringify(placeData)
      })
    })
    .catch(err => console.log(err))
    .then(res => res.json())
    .then(parsedRes => {
      console.log(parsedRes);
      dispatch(uiStopLoading());
    })
  };
};

export const getPlaces = () => {
  return dispatch => {
    fetch("https://rn-course-1538831387650.firebaseio.com/places.json")
    .catch(err => {
      alert("Something went wrong");
      console.log(err)
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
  }
}

export const setPlaces = (places) => {
  return {
    type: SET_PLACES,
    places: places
  }
}

export const deletePlace = (key) => {
  return dispatch =>  {
    dispatch(removePlace(key))
    fetch("https://rn-course-1538831387650.firebaseio.com/places/" + key + ".json", {
      method: "DELETE",
    })
    .catch(err => {
      alert("Something went wrong");
      console.log(err)
    })
    .then(res => res.json())
    .then(parsedRes => {
      console.log("Done!")
    })
  }
}

export const removePlace = key => {
  return {
     type: REMOVE_PLACE,
     key: key
  }
}