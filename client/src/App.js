import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import './App.css'
import { loadUser } from './actions/auth'
import setAuthToken from './components/SetAuthtoken'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Alert from './components/Alert'
import NavBar from './components/NavBar'
import Landing from './components/Landing'
import PrivateRoute from './components/PrivateRoute'
import Login from './components/Login'
import Register from './components/Register'
import EmployeeDetail from './components/EmployeeDetail'
import AddEmployee from './components/AddEmployee'

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <NavBar />
          <Route exact path='/' component={Landing} />
          <div className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
                <PrivateRoute
                  exact path='/employee' component={AddEmployee}
                />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App