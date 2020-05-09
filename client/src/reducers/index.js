import { combineReducers } from 'redux'
import employeeReducer from './employeeReducer'
import authReducer from './authReducer'
import alertReducer from './alertReducer'

export default combineReducers({
  employees: employeeReducer,
  auth: authReducer,
  alert: alertReducer
})