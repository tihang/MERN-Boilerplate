import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from '../assets/icons/main.png';

import { userLogout } from '../redux/index';

function Nav({ loggedIn, logout }) {
  // Links for non authenticated users
  const guestLinks = () => (
    <ul>
      <li><Link to="/"><img src={Icon} alt="ICON" /></Link></li>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/login-register">Login/Register</Link>
      </li>
    </ul>
  );

  // Links for authenticated users
  const userLinks = () => (
    <ul>
      <li><Link to="/"><img src={Icon} alt="ICON" /></Link></li>
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

  );

  return (
    <nav className="nav-container">
      {/* Show user links based on their login status */}
      {loggedIn ? userLinks() : guestLinks()}
    </nav>
  );
}

// PropTypes validation
Nav.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
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
