import {
  RESET_ERROR_AND_SUCCESS,
  USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS,
  USER_REGSITER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAILURE,
} from './userTypes';

const initialState = {
  loading: false,
  token: localStorage.getItem('auth-token'),
  loggedIn: !!localStorage.getItem('auth-token'),
  sessionData: {},
  success: '',
  error: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_ERROR_AND_SUCCESS:
      return {
        ...state,
        error: '',
        success: ''
      };

    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      };

    case USER_LOGIN_SUCCESS:
      localStorage.setItem('auth-token', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        success: action.payload.email,
        loading: false,
        loggedIn: true,
      };

    case USER_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case USER_LOGOUT_REQUEST:
      return {
        ...state,
        loading: true
      };

    case USER_LOGOUT_SUCCESS:
      localStorage.removeItem('auth-token');
      return {
        ...state,
        loading: false,
        token: null,
        loggedIn: false,
        sessionData: {}
      };

    case USER_REGSITER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.message
      };

    case USER_REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export default userReducer;
