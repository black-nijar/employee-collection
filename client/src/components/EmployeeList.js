import React, { useEffect } from 'react'
import { getEmployees, deleteEmployee } from '../actions/employee'
import { connect } from 'react-redux';

const EmployeeList = ({ getEmployees, employees: { employees }, deleteEmployee }) => {
  useEffect(() => {
    getEmployees()
  }, [])
  console.log(employees)
  const empList = employees.length > 0 ? (
    employees.map(emp => {
      return (
        <div key={emp._id} className='card' style={{ marginBottom: '10px' }}>
          <div className='employee-detail'>
            <h5>Name {' '}:{emp.name}</h5>
            <h5>Email Id: {emp.email}</h5>
            <h5>Gender : {emp.gender}</h5>
          </div>
          <button className='btn btn-danger my-1' onClick={() => deleteEmployee(emp._id)}> Delete</button>
        </div>
      )
    })
  ) : <div className='text-center'>Add Employee</div>
  return (
    <div className='col-md-6'>
      <h2 className='text-center'> Employees</h2>
      {empList}
    </div>
  )
}
const mapStateToProps = state => ({
  employees: state.employees
})
export default connect(mapStateToProps, { getEmployees, deleteEmployee })(EmployeeList)