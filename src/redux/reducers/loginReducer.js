// reducers/loginReducer.js

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,LOGOUT_SUCCESS } from '../actions/loginActions';

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  error: null,
  user:null
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        // error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        user:action.user
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
      case LOGOUT_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isLoggedIn: false,
          user:null
        };
    default:
      return state;
  }
};

export default loginReducer;
