import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link , Redirect } from 'react-router-dom'
import { register } from '../actions/auth'
import { setAlert } from '../actions/alert'

const Register = ({ register, setAlert, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })
  const { name, email, password, password2 } = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
        setAlert('Password do not match', 'danger')
    } else {
      register({ name, email, password })
    }
  }
  if (isAuthenticated) {
    return <Redirect to='/employee'/>
  }
  return (
    <div>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <label htmlFor='userName'>Name :</label>
          <input
            className='form-control'
            placeholder='Name'
            type='text'
            value={name}
            name='name'
            onChange={e => onChange(e)}
          />
        </div>
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
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='userPassword2'>Confirm Password :</label>
          <input
            className='form-control'
            type='password'
            placeholder='Confirm Password'
            value={password2}
            name='password2'
            onChange={e => onChange(e)}
            minLength='6'
          />
        </div>
        <button className='btn btn-primary' type='submit'>Register</button>
      </form>
      <p>Already have an account ? <Link to='/login'>Sign In</Link></p>
    </div>
  )
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { register, setAlert })(Register)
