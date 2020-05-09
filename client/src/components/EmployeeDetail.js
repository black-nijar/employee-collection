import React from 'react'
import AddEmployee from './AddEmployee'

const EmployeeDetail = () => {
  return (
    <div>
      <div className='row'>
        <AddEmployee/>
        <EmployeeDetail/>
      </div>
    </div>
  )
}

export default EmployeeDetail
