import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/employee' />
  }
  return (
    <div className="landing">
      <div className="buttons">
        <Link to="/register" className="btn btn-primary">Sign Up</Link>
        <Link to="/login" className="btn btn-light">Login</Link>
      </div>
    </div>
  );
};


const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing);