import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import FormField from '../misc/FormField';
import authService from '../../services/AuthServices'
import validations from './validations'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Register extends Component {
  state = {
    user: {
      email: '',
      password: '',
      name: '',
      birthDate: '', 
      avatarURL: 'https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?ixid=2yJhcHBfaWQiOjEyMDd9&fm=jpg&w=200&fit=max',
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
  
  handleDate = (date) => {
    this.setState({
      user: {
        ...this.state.user,
        birthDate: date
      }, 
      errors: {...this.state.errors, birthDate: validations.birthDate && validations.birthDate(date)}
    });
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
  getValidationClassName = (attr) => {
    const { errors, touch } = this.state
    if (!touch[attr]){
      return ''
    } else if (errors[attr]){ 
      return 'is-invalid'
    }
    return 'is-valid'
  }

  isValid = () => !Object.keys(this.state.user).some(attr => this.state.errors[attr])

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
                label="Name"
                name="name"
                inputType="text"
                value={user.name}
                touch={touch.name}
                error={errors.name}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                validationClassName={this.getValidationClassName('name')} /> 
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
              <DatePicker
                selected={user.birthDate}
                onChange={this.handleDate}
                isClearable={true}      
                showYearDropdown
                dateFormatCalendar="MMMM"
                scrollableYearDropdown
                yearDropdownItemNumber={50}
                />
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
export default Register