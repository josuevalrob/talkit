import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import FormField from '../misc/FormField';
import authService from '../../services/AuthServices'
import validations from './validations'
export default class Register extends Component {
  state = {
    user: {
      email: '',
      password: '',
      image: 'https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?ixid=2yJhcHBfaWQiOjEyMDd9&fm=jpg&w=200&fit=max',
      birthDate: '12/12/12', 
      name: 'Gestor'
    },
    errors: {},
    touch: {},
    isRegistered: false
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      },
      errors: {
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

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isValid()) {
      authService.register(this.state.user)
        .then(
          (user) => this.setState({ isRegistered: true }),
          (error) => {
            const { message, errors } = error.response.data;
            this.setState({
              errors: {
                ...this.state.errors,
                ...errors,
                email: !errors && message
              }
            })
          }
        )
    }
  }

  isValid = () => {
    return !Object.keys(this.state.user)
      .some(attr => this.state.errors[attr])
  }

  render() {
    const { isRegistered, errors, user, touch } =  this.state;
    if (isRegistered) {
      return (<Redirect to="/login" />)
    }


    return (
      <div className="box mx-auto">
        <div className="row">
          <div className="col-6">
            <h3>Sign up</h3>
            <form id="register-form" className="mt-4" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" className={`form-control ${touch.email && errors.email ? 'is-invalid' : ''}`} onChange={this.handleChange} onBlur={this.handleBlur} value={user.email} />
                <div className="invalid-feedback">{ errors.email }</div>
              </div>
              <div className="form-group">
                <label>name</label>
                <input type="text" name="name" className={`form-control ${touch.name && errors.name ? 'is-invalid' : ''}`} onChange={this.handleChange} onBlur={this.handleBlur} value={user.name} />
                <div className="invalid-feedback">{ errors.name }</div>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" className={`form-control ${touch.password && errors.password ? 'is-invalid' : ''}`} onChange={this.handleChange} onBlur={this.handleBlur} value={user.password} />
                <div className="invalid-feedback">{ errors.password }</div>
              </div>  
              
            </form>
          </div>
          <div className="col-6 pt-4">
            <h5>Hello!!</h5>
            <p className="lead mb-5">Welcome to IronProfile!</p>
            <p className="mb-2"><small>If you signup, you agree with all our terms and conditions where we can do whatever we want with the data!</small></p>
            <button className="btn btn-white" form="register-form" type="submit" disabled={!this.isValid()}> Create the Account</button>
          </div>
        </div>
      </div>
    );
  }
}