import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthStore'
// !refactor!!
const PublicRoute = ({ component: Component, ...rest }) => (
  <AuthContext.Consumer>
    {({ isAuthenticated }) => (
      <Route render={
        props => !isAuthenticated() 
        ?  <Component {...props}/> 
        :  <Redirect to="/" />
      } {...rest} />
    )}
  </AuthContext.Consumer>
)

export default PublicRoute