import React, { useState } from 'react'
import { connect } from 'react-redux';
import { addEmployee } from '../actions/employee';
import EmployeeList from './EmployeeList';

const AddEmployee = ({ addEmployee }) => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: ''
  });
  const { name, email, gender } = formData;
  
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    //console.log('formData', formData)
    addEmployee(name, email, gender);
    setFormData({
      name: '',
      email: '',
      gender: ''
    })
  }
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6'>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <h2 className=''>Create Employee Detail</h2>
            <div className='form-group'>
              <label htmlFor='name'>Name :</label>
              <input
                className='form-control'
                type='text'
                placeholder='Enter name'
                name='name'
                value={name}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='email'>Email Id :</label>
              <input
                className='form-control'
                type='email'
                value={email}
                placeholder='Enter Email Id'
                name='email'
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='gender'>Gender :</label>{' '}
              <select name='gender' value={gender} onChange={e => onChange(e)}>
                <option value='0'>Select</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
                <option value='Others'>Others</option>
              </select>
            </div>
            <button className='btn btn-primary my-1' type='submit'>
              Add Employee
            </button>
          </form>
        </div>
        <EmployeeList/>
      </div>
    </div>
  )
}

export default connect(null, { addEmployee })(AddEmployee)