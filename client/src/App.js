import React from 'react'
import AddEmployee from './components/AddEmployee'
import { Provider } from 'react-redux'
import store from './store'
import EmployeeList from './components/EmployeeList'
import './App.css'

const App = () => {
  return (
    <Provider store={store}>
      <div className='container'>
        <div className='row'>
          <AddEmployee />
          <EmployeeList />
        </div>
      </div>
    </Provider>
  )
}

export default App