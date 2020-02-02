import React, { useState, useEffect } from 'react';
import EmailValidator from 'email-validator';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useAlert } from 'react-alert';
import { Redirect } from 'react-router-dom';
import { userRegister, resetErrorandSuccess } from '../redux/index';
import LoadingSubmitButton from '../components/LoadingSubmitButton';

function Register({
  error, resetErrAndScss, isLoading, register, success, loggedIn
}) {
  // Local state form form variable and validation
  const [userInfo, setUserInfo] = useState({
    email: '',
    fullName: '',
    password: '',
    errors: {
      email: '',
      fullName: '',
      password: ''
    }
  });

  // Showing alert message and clearing it from redux store after 4 seconds
  const alert = useAlert();
  // Reset error message from store
  useEffect(() => {
    if (error.length > 0) {
      alert.error(error);
    }
    return () => {
      resetErrAndScss();
    };
  }, [error]);

  // Reset success message from store
  useEffect(() => {
    if (success.length > 0) {
      alert.success(success);
    }
    return () => {
      resetErrAndScss();
    };
  }, [success]);

  // Form Validation and set it to local state
  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const { errors } = userInfo;

    switch (name) {
      case 'email':
        errors.email = EmailValidator.validate(value) ? '' : 'Invalid Email';
        break;

      case 'fullName':
        errors.fullName = value.length > 5 ? '' : 'Full name must be 6 characters long';
        break;

      case 'password':
        errors.password = value.length > 5 ? '' : 'Password must be 6 characters long';
        break;

      default:
        break;
    }

    setUserInfo({
      ...userInfo,
      errors
    });
  };

  // Handle registration submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors } = userInfo;
    if (errors.email === '' && errors.fullName === '' && errors.password === '') {
      const userData = {
        email: userInfo.email,
        fullName: userInfo.fullName,
        password: userInfo.password
      };
      register(userData);
    }
  };

  // Redirects if user is logged in
  if (loggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="register-page">
      <form className="form-component" onSubmit={handleSubmit}>
        <p className="notice">Please fill out your information.</p>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onBlur={handleChange}
          onChange={e => setUserInfo({ ...userInfo, email: e.target.value })}
        />
        <p className="form-input-error">{userInfo.errors.email}</p>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          onBlur={handleChange}
          onChange={e => setUserInfo({ ...userInfo, fullName: e.target.value })}
        />
        <p className="form-input-error">{userInfo.errors.fullName}</p>

        <input
          type="password"
          name="password"
          placeholder="Password"
          onBlur={handleChange}
          onChange={e => setUserInfo({ ...userInfo, password: e.target.value })}
        />
        <p className="form-input-error">{userInfo.errors.password}</p>

        <p className="agreement-notice">
          By clicking &apos;Register&apos; you agree to our Privacy Notice and Terms & Conditions.
        </p>

        <LoadingSubmitButton isLoading={isLoading} displayText="Register" />
      </form>
    </div>
  );
}

Register.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  resetErrAndScss: PropTypes.func.isRequired,
  success: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
  isLoading: state.user.loading,
  error: state.user.error,
  success: state.user.success
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  resetErrAndScss: () => dispatch(resetErrorandSuccess()),
  register: userData => dispatch(userRegister(userData, ownProps))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
