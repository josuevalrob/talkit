import React, { Component } from 'react'

const CURRENT_USER_KEY = 'current-user';
const AuthContext = React.createContext(); //* creamos el contexto

class AuthStore extends Component {
  state = {
    user: JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || '{}') //* sacamos al usuario del localstrage. 
  }

  handleUserChange = (user) => {
    this.setState({ user }); //* guardamos al usuario en el estado. 
    if (user) localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user)) //* Guardamos al usuario en el localStorage
    else localStorage.removeItem(CURRENT_USER_KEY) //* Si no viene el usuario, lo quitamos del estado. 
  }

  isAuthenticated = () => this.state.user.data && this.state.user.data.email ? true : false //! r u sure about this shit??

  isTeacher = () => this.state.user.data && this.state.user.data.role === 'teacher' ? true : false 

  isStudent = () => this.state.user.data && this.state.user.data.role === 'student' ? true : false

  render() {
    return (
      <AuthContext.Provider value={{ 
        //* pasamos los valores al context. 
        user: this.state.user,
        onUserChange: this.handleUserChange,
        isAuthenticated: this.isAuthenticated,
        isTeacher: this.isTeacher
      }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
const withAuthConsumer = (WrappedComponent) => {
  return (props) => {
    return (
      <AuthContext.Consumer>
        {(consumerProps) => (<WrappedComponent {...consumerProps} {...props} />)}
      </AuthContext.Consumer>
    )
  }
}



export { AuthStore, AuthContext, withAuthConsumer }