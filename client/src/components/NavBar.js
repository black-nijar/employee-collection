import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";


const NavBar = ({ auth: { isAuthenticated }, logout }) => {
  const authLinks = (
    <ul className='nav'>

      <Link to="/" onClick={logout}>
        <span className='logout'>Logout</span>
      </Link>
    </ul>
  );

  const guestLinks = (
    <ul className='nav'>
      <Link to='/register'>
        <h5>Register</h5>
      </Link>
      <Link to='/login'>
        <h5>Login</h5>
      </Link>
    </ul>
  );

  return (
    <div>
      <nav className="navbar bg-dark">
        <Link to="/" className="navbar-brand">
          <h5>Welcome</h5>
        </Link>
        {
          <Fragment> {isAuthenticated ? authLinks : guestLinks}</Fragment>
        }
      </nav>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps, { logout })(NavBar);