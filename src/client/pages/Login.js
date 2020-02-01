import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { userLogin } from '../redux';

function Login({ isLoading, login, loggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (loggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="login-page">
      <h5>Don&apos;t have an account? Register with us.</h5>
      <button type="button" className="form-btn">
        Register Now!
      </button>
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
        <button className="form-btn" type="submit">
          {isLoading ? (
            <ReactLoading type="spin" color="#00c9a7" height="15%" width="15%" />
          ) : (
            'Log In'
          )}
        </button>
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
