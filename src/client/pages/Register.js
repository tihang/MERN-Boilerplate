import React, { useState, useEffect } from 'react';
import EmailValidator from 'email-validator';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userRegister } from '../redux/index';
import LoadingSubmitButton from '../components/LoadingSubmitButton';

function Register({ isLoading, register }) {
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

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

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
        errors.fullName = value.length > 5 ? '' : 'Full name must be 5 characters long';
        break;

      case 'password':
        errors.password = value.length > 7 ? '' : 'Password must be 8 characters long';
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

    // Proceed with registration if no errors
    if (errors.email === '' && errors.fullName === '' && errors.password === '') {
      const userData = {
        email: userInfo.email,
        fullName: userInfo.fullName,
        password: userInfo.password
      };
      register(userData);
    }
  };

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
  isLoading: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isLoading: state.user.loading
});

const mapDispatchToProps = dispatch => ({
  register: userData => dispatch(userRegister(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
