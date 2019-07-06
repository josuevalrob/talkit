import React from 'react';
import FormField from '../misc/FormField';
import AuthService from './../../services/AuthServices';
import { Redirect } from 'react-router-dom'
import { withAuthConsumer } from '../../contexts/AuthStore';
import validations from './validations'

class Login extends React.Component {
  state = {   
    user: { //* definimos los inputs que vamos a usar. 
      email: '',
      password: ''
    },    
    errors: {}, // * definimos los errores como objetos. 
    touch: {}, // * definimos los touch como objetos. 
    isAuthenticated: false
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      user: { //* actualizamos el input de usuario. 
        ...this.state.user,
        [name]: value
      },
      errors: { //* creamos los errores en el objeto errors. 
        ...this.state.errors,
        [name]: validations[name] && validations[name](value)
      }
    })
  }

  handleBlur = (event) => {
    const { name } = event.target;
    this.setState({
      touch: { 
        ...this.state.touch,
        [name]: true
      }
    })
  }
  //* Revisamos que no existan errores. 
  isValid = () => !Object.keys(this.state.user).some(attr => this.state.errors[attr])

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isValid()) {
      AuthService.authenticate(this.state.user)
        .then(
          (user) => {
            this.setState({ isAuthenticated: true }, () => { //Calback
              this.props.onUserChange(user); //* actualizamos el context
            })
          },
          (error) => {
            const { message, errors } = error.response.data;
            this.setState({
              wrongCredentials: true,
              errors: {
                ...this.state.errors,
                ...errors,
                password: !errors && message
              }
            })
          }
        )
    }
  }

  getValidationClassName = (attr) => {
    const { errors, touch } = this.state
    console.log(errors)
    if (!touch[attr]){
      return ''
    } else if (errors[attr]){ 
      return 'is-invalid'
    }
    return 'is-valid'
  }

  render() {
    const {user, errors, touch, isAuthenticated } = this.state
    const hasErrors = Object.values(errors).some(el => el === true) 

    if (isAuthenticated) return <Redirect to="/"/>

    return (
      <form className="login" onSubmit={this.handleSubmit}>
        { this.state.wrongCredentials 
        && (<div className="alert alert-danger" role="alert">
            wrong credentials
          </div>)}

        <FormField
          label="email"
          name="email"
          onBlur={this.handleBlur}
          value={user.email}
          onChange={this.handleChange}
          touch={touch.email}
          error={errors.email}
          inputType="text"
          validationClassName={this.getValidationClassName('email')} />
        
        <FormField
          label="password"
          name="password"
          onBlur={this.handleBlur}
          value={user.password}
          onChange={this.handleChange}
          touch={touch.password}
          error={errors.password}
          inputType="password"
          validationClassName={this.getValidationClassName('password')} />

        <button type="submit"
          className={`btn ${hasErrors ? 'btn-danger' : 'btn-success'}`}
          disabled={hasErrors}>Submit</button>
      </form>
    )
  }
}


export default withAuthConsumer(Login)
