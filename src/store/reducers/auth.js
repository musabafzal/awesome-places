import { AUTH_SET_TOKEN } from "../actions/actionTypes";

const initialState = {
  idToken: null
}

const reducer = (state = initialState, action) => {
  switch (action.type){
    case AUTH_SET_TOKEN:
      return {
        ...state,
        idToken: action.idToken
      }
    default:
      return state;
  }
}

export default reducer;