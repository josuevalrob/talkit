import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthStore'

const TeacherRoute = ({ component: Component, ...rest }) => (
  <AuthContext.Consumer>
    {({ isTeacher }) => (
      <Route render={
        props => isTeacher() 
        ? <Component {...props}/>
        : <Redirect to="/" />
      } {...rest} />
    )}
  </AuthContext.Consumer>
)

export default TeacherRoute