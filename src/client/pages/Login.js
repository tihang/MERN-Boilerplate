import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userLogin } from '../redux';

function Login({ login, isLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="login-page">
      <h1>Login</h1>
      <form
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
        <button type="submit">Login</button>
      </form>
      <h3>{`Is logged in: ${isLoggedIn}`}</h3>
    </div>
  );
}

Login.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired
};

const mapStatetoProps = state => ({
  isLoggedIn: state.user.loggedIn
});

const mapDispatchToProps = dispatch => ({
  login: loginData => dispatch(userLogin(loginData))
});

export default connect(mapStatetoProps, mapDispatchToProps)(Login);
