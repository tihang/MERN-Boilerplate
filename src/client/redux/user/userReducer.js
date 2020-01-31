import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE } from './userTypes';

const initialState = {
  token: localStorage.getItem('auth-token'),
  loading: false,
  loggedIn: !!localStorage.getItem('auth-token'),
  sessionData: {},
  error: ''
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
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
        loading: false,
        loggedIn: true,
      };

    case USER_LOGIN_FAILURE:
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
