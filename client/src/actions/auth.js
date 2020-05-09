import axios from 'axios';
import { setAlert } from './alert'
import setAuthToken from '../components/SetAuthtoken';
import { USER_LOADED, ERROR, REGISTER_USER, LOGOUT, LOGIN_SUCCESS } from './actionTypes';


//Load User

export const loadUser = () => async dispatch => {
  if(localStorage.token) {
    setAuthToken(localStorage.token);
  } 
  try {
    const res = await axios.get('http://localhost:5000/user/login');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: ERROR
    })
  }
}

// Register User
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({name, email, password });
  try {
    const res = await axios.post('http://localhost:5000/user/register', body, config);

    dispatch({
      type: REGISTER_USER,
      payload: res.data
    });

    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors;

    if(errors) {
      console.log(errors)
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: ERROR
    })
  }
};

// Login User

export const login = ( email, password ) => async dispatch => {

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({email, password});
  try {
    const res = await axios.post('http://localhost:5000/user/login', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

   // dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors

    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    // dispatch({
    //   type: ERROR
    // })
  }
};

// Logout

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
}