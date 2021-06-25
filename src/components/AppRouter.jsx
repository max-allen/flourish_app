import React from 'react'
import { useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import {
  Login,
  Home
} from '../pages'

export const AppRouter = () => {
  const store = useSelector(({ users: { results } = {} }) => ({ results }))
  const { results } = store

  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
      </Switch>
      { !results && <Redirect to='/login' /> }
    </Router>
  )
}
