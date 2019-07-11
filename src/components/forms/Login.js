import React, { useState } from 'react'
// import FormField from '../misc/FormField';
import authService from './../../services/AuthServices';
import { Redirect } from 'react-router-dom'
import { withAuthConsumer } from '../../contexts/AuthStore';
import validations from './validations'
// * Material design
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


const Login = (props) => {
  const classes = props.classes
  const [state, setState] = useState({   
    user: { //* definimos los inputs que vamos a usar. 
      email: '',
      password: ''
    },    
    errors: {}, // * definimos los errores como objetos. 
    touch: {}, // * definimos los touch como objetos. 
    isAuthenticated: false
  })
// ! codigo repetitivo
  const handleChange = name => event => {
    setState({
      ...state,
      user: {
        ...state.user,
        [name]: event.target.value
      },
      errors: {
        ...state.errors,
        [name]: validations[name] && validations[name](event.target.value)
      }
    })
  }

// ! codigo repetitivo
  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid()) {
      authService.authenticate(state.user)
        .then(
          (user) => {
            debugger
            setState({ isAuthenticated: true })
            props.onUserChange(user); //* actualizamos el context
          },
          (error) => {
            debugger
            const { message, errors } = error.response.data;
            setState({
              wrongCredentials: true,
              errors: {
                ...state.errors,
                ...errors,
                password: !errors && message
              }
            })
          }
        )
    }
  }

  const {errors, isAuthenticated } = state
  // const hasErrors = Object.values(errors).some(el => el === true) 

  const isValid = () => !Object.keys(state.user).some(attr => state.errors[attr])

  if (isAuthenticated) return <Redirect to="/"/>

  return (
    <form id="register-form" onSubmit={handleSubmit}>
      { state.wrongCredentials 
      && (<div className="alert alert-danger" role="alert">
          wrong credentials
        </div>)}

      <TextField
        onChange={handleChange('email')}
        value={state.user.email}
        error={errors.email ? true : false }
        variant="outlined"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email" />

      <TextField
        onChange={handleChange('password')}
        value={state.user.password}
        error={errors.password ? true : false }
        variant="outlined"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"/>
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me" />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        // disabled={hasErrors} 
        className={classes.submit}>
        Sign In
      </Button>      
    </form>
  )
}


export default withAuthConsumer(Login)
