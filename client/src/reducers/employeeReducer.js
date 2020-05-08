import { GET_EMPLOYEES, DELETE_EMPLOYEE } from "../actions/actionTypes";

const initState = {
  employees: [],
  loading: true,
  error: {}
};

export default function(state = initState, action) {
  const { payload, type } = action;
  switch (type) {
    case GET_EMPLOYEES: 
      return {
        ...state,
        employees: payload,
        loading: false
      };
    case DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter(emp => emp._id !== payload)
      }
    default:
      return state;
  }
}