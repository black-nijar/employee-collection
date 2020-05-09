import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { login } from '../actions/auth'

const Login = ({ login , isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password  } = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    login(email,password)
  };
  if (isAuthenticated) {
    return <Redirect to='/employee'/>
  }
  return (
    <div>
      <form className='form-group' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <label htmlFor='userEmail'>Email Id :</label>
          <input
            className='form-control'
            placeholder='Email Id'
            type='email'
            value={email}
            name='email'
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='userPassword'>Password :</label>
          <input
            className='form-control'
            placeholder='Password'
            type='password'
            value={password}
            name='password'
            onChange={e => onChange(e)}
          />
        </div>
        <button className='btn btn-primary' type='submit'>Login</button>
      </form>
      <p>Create a new account <Link to='/register'>Register</Link></p>
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(Login)
