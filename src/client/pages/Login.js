import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, NavLink } from 'react-router-dom';
import { userLogin } from '../redux';
import LoadingSubmitButton from '../components/LoadingSubmitButton';

function Login({ isLoading, login, loggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (loggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="login-page">
      <h5>Don&apos;t have an account?</h5>
      <NavLink to="/register">
        <button type="button" className="form-btn">
          Register Now!
        </button>
      </NavLink>
      <h6>Or Log In</h6>
      <form
        className="form-component"
        onSubmit={(e) => {
          e.preventDefault();
          const loginData = { email, password };
          login(loginData);
        }}
      >
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
        <p className="agreement-notice">
          By clicking &apos;Log In&apos; you agree to our Privacy Notice and Terms & Conditions.
        </p>
        <LoadingSubmitButton isLoading={isLoading} displayText="Log In" />
      </form>
    </div>
  );
}

Login.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired
};

const mapStatetoProps = state => ({
  isLoading: state.user.loading,
  loggedIn: state.user.loggedIn
});

const mapDispatchToProps = dispatch => ({
  login: loginData => dispatch(userLogin(loginData))
});

export default connect(mapStatetoProps, mapDispatchToProps)(Login);
