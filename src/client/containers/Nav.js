import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userLogout } from '../redux/index';

function Nav({ loading, loggedIn, logout }) {
  // Links for non authenticated users
  const guestLinks = () => (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );

  // Links for authenticated users
  const userLinks = () => (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <button type="button" onClick={logout}>Logout</button>
        </li>
      </ul>
    </nav>
  );

  return (
    <div className="nav-container">
      {/* Show user links based on their login status */}
      {loggedIn ? userLinks() : guestLinks()}
      <h2>{`Loading: ${loading}`}</h2>
      <h2>{`Logged IN : ${loggedIn}`}</h2>
    </div>
  );
}

// PropTypes validation
Nav.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};


const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
  loading: state.user.loading,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(userLogout())
});


export default connect(mapStateToProps, mapDispatchToProps)(Nav);
