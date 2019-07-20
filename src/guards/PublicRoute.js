import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthStore'
// !refactor!!
const PublicRoute = ({ component: Component, ...rest }) => (
  <AuthContext.Consumer>
    {({ isAuthenticated, isTeacher }) => (
      <Route render={
        props => !isAuthenticated() 
        ?  <Component {...props}/> 
        :  <Redirect to={isTeacher() ? '/dashboard' : '/search'} />
      } {...rest} />
    )}
  </AuthContext.Consumer>
)

export default PublicRoute