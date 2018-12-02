import { AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from "../actions/actionTypes";

const initialState = {
  idToken: null,
  expiryDate: null
}

const reducer = (state = initialState, action) => {
  switch (action.type){
    case AUTH_SET_TOKEN:
      return {
        ...state,
        idToken: action.idToken,
        expiryDate: action.expiryDate
      }
    case AUTH_REMOVE_TOKEN:
      return {
        ...state,
        idToken: null,
        expiryDate: null
      }
    default:
      return state;
  }
}

export default reducer;