import React, { useState } from 'react';
import { NavLink, useHistory, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useAlert } from 'react-alert';
import Icon from '../assets/icons/main.png';

import { userLogout } from '../redux/index';

function Nav({ loggedIn, logout }) {
  const [navToggle, setNavToggle] = useState(false);

  const history = useHistory();
  const alert = useAlert();

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
      <li><i onClick={toggle} role="button" tabIndex={0} onKeyDown={toggle} className={navToggle ? 'fas fa-times' : 'fas fa-bars'} /></li>
      <div className={navToggle ? 'nav-links' : 'nav-links hidden'}>
        <li>
          <NavLink onClick={toggle} activeClassName="current" exact to="/">Home</NavLink>
        </li>
        <li>
          <NavLink onClick={toggle} activeClassName="current" exact to="/dashboard">Dashboard</NavLink>
        </li>
        <li>
          <NavLink onClick={() => { toggle(); logout(); alert.success('Logged out'); history.push('/login-register'); }} activeClassName="current" exact to="/login-register">Logout</NavLink>
        </li>
      </div>
    </ul>

  );

  return (
    <nav className="nav-container">
      <div className="nav-contents">
        {/* Show user NavLinks based on their login status */}
        {loggedIn ? userNavLinks() : guestNavLinks()}
      </div>
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

const mapDispatchToProps = (dispatch, ownProps) => ({
  logout: () => dispatch(userLogout(ownProps))
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));
