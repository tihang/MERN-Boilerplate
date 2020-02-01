import Axios from 'axios';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_REGSITER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE
} from './userTypes';

export const userLoginRequest = () => ({
  type: USER_LOGIN_REQUEST
});

export const userLoginSuccess = user => ({
  type: USER_LOGIN_SUCCESS,
  payload: user
});

export const userloginFailure = error => ({
  type: USER_LOGIN_FAILURE,
  payload: error
});

export const userLogoutRequest = () => ({
  type: USER_LOGOUT_REQUEST
});

export const userLogoutSuccess = () => ({
  type: USER_LOGOUT_SUCCESS
});

export const userRegisterRequest = () => ({
  type: USER_REGSITER_REQUEST
});

export const userRegisterSuccess = user => ({
  type: USER_REGISTER_SUCCESS,
  payload: user
});

export const userRegisterFailure = error => ({
  type: USER_REGISTER_FAILURE,
  payload: error
});

export const userLogin = loginData => (dispatch) => {
  dispatch(userLoginRequest());
  Axios.post('/api/user/login', { email: loginData.email, password: loginData.password })
    .then((res) => {
      const user = res.data;
      dispatch(userLoginSuccess(user));
    })
    .catch((error) => {
      const errorMsg = error.message;
      dispatch(userloginFailure(errorMsg));
    });
};

export const userRegister = registerData => (dispatch) => {
  dispatch(userRegisterRequest());
  Axios.post('/api/user/register', {
    email: registerData.email,
    name: registerData.fullName,
    password: registerData.password
  })
    .then((res) => {
      dispatch(userRegisterSuccess(res.data));
    })
    .catch((error) => {
      dispatch(userRegisterFailure(error.message));
    });
};

export const userLogout = () => (dispatch) => {
  dispatch(userLogoutRequest());
  setTimeout(() => {
    dispatch(userLogoutSuccess());
  }, 200);
};
