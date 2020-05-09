import axios from 'axios';
import { ADD_EMPLOYEE, ERROR, GET_EMPLOYEES, DELETE_EMPLOYEE } from './actionTypes';

export const getEmployees = () => async dispatch => {
  try {
    let res = await axios.get('http://localhost:5000/employee');
    console.log("res", res)
    dispatch({
      type: GET_EMPLOYEES,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: { msg: err, status: err },
    })
  }
}

export const addEmployee = (name, email, gender) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ name, email, gender })
  try {
    let res = await axios.post(`http://localhost:5000/employee`, body, config);
    dispatch({
      type: ADD_EMPLOYEE,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

export const deleteEmployee = (id) => async dispatch => {
  try {
    await axios.delete(`http://localhost:5000/employee/${id}`);
    dispatch({
      type: DELETE_EMPLOYEE,
      payload: id
    })
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}