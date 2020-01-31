import Axios from 'axios';
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE } from './userTypes';

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
