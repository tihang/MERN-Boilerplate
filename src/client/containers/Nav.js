import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from '../assets/icons/main.png';

import { userLogout } from '../redux/index';

function Nav({ loggedIn, logout }) {
  const [navToggle, setNavToggle] = useState(false);

  const toggle = () => {
    setNavToggle(!navToggle);
  };

  // NavLinks for non authenticated users
  const guestNavLinks = () => (
    <ul>
      <li><NavLink activeClassName="current" exact to="/"><img src={Icon} alt="ICON" /></NavLink></li>
      <li><i onClick={toggle} role="button" tabIndex={0} onKeyDown={toggle} className={navToggle ? 'fas fa-times' : 'fas fa-bars'} /></li>
      <div className={navToggle ? 'nav-links' : 'nav-links hidden'}>
        <li>
          <NavLink onClick={toggle} activeClassName="current" exact to="/">Home</NavLink>
        </li>
        <li>
          <NavLink onClick={toggle} activeClassName="current" exact to="/login-register">Login/Register</NavLink>
        </li>
      </div>
    </ul>
  );

  // NavLinks for authenticated users
  const userNavLinks = () => (
    <ul>
      <li><NavLink activeClassName="current" exact to="/"><img src={Icon} alt="ICON" /></NavLink></li>
      <div className={navToggle ? 'nav-links' : 'nav-links hidden'}>
        <li><i onClick={toggle} role="button" tabIndex={0} onKeyDown={toggle} className={navToggle ? 'fas fa-times' : 'fas fa-bars'} /></li>
        <li>
          <NavLink onClick={toggle} activeClassName="current" exact to="/">Home</NavLink>
        </li>
        <li>
          <NavLink onClick={toggle} activeClassName="current" exact to="/dashboard">Dashboard</NavLink>
        </li>
        <li>
          <button type="button" onClick={logout}>Logout</button>
        </li>
      </div>
    </ul>

  );

  return (
    <nav className="nav-container">
      {/* Show user NavLinks based on their login status */}
      {loggedIn ? userNavLinks() : guestNavLinks()}
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
