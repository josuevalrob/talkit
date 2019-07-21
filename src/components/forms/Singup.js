import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import authService from './../../services/AuthServices'
import validations from '../forms/validations'
import useStyles from '../styles/signUp.style'
import "react-datepicker/dist/react-datepicker.css";

// * Material design
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AdapterLink from './../misc/LinkTalkit';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';

const Register = (props) => {
  const editPage = props.match.url === "/dashboard/profile" ? true : false
  const [state, setState] = useState({
    user: {
      email: '',
      password: '',
      name: '',
      birthDate: '2000-05-24', 
      role: 'student',
      avatarURL: 'https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?ixid=2yJhcHBfaWQiOjEyMDd9&fm=jpg&w=200&fit=max'
    },
    errors: {},
    touch: {},
    isRegistered: false
  })

  useEffect(()=>{
    if(editPage){
      setState({
        ...state, 
        user: props.user.data
      })
    }
  }, [props.match.url])

  const classes = useStyles()
// ! extract it  const handleChange = name => event => {
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
  // ! extract it
  const handleDateChange = (date) => {
    console.log(date)
    setState({
      ...state,
      user: {
        ...state.user,
        birthDate: date.currentTarget.value
      }, 
      errors: {...state.errors, birthDate: validations.birthDate && validations.birthDate(date)}
    });
  }
// ! extract it
  const isValid = () => !Object.keys(state.user).some(attr => state.errors[attr])

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid()) {
      authService.register(state.user)
        .then(
          (user) => setState({ ...state, isRegistered: true }),
          (error) => {
            const { message, errors } = error.response.data;
            setState({
              ...state,
              errors: {
                ...state.errors,
                ...errors,
                email: !errors && message
              }
            })
          }
        )
    }
  }

  const { isRegistered, errors } =  state;

  if (isRegistered) {
    return (<Redirect to="/sign-in" />)
  }
  console.log(props)
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {editPage ? 'Edit your profile' : 'Sign up'}
          </Typography>
        </div>
            <form id="register-form" className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={handleChange('name')}
                    value={state.user.name}
                    error={errors.name ? true : false }
                    name="name"
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="First Name"
                    autoFocus/>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12}>
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
                    autoComplete="email"
                  />

                </Grid>
                <Grid item xs={12}>
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

                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={state.user.birthDate}
                    className={classes.date}
                    onChange={handleDateChange}
                    variant="outlined"
                    id="birthDate"
                    label="Birthday"
                    type="date"
                    // defaultValue="2000-05-24"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormLabel component="legend">Role</FormLabel>
                  <RadioGroup
                    aria-label="Role"
                    name="role"
                    className={classes.group}
                    value={state.user.role}
                    onChange={handleChange('role')}
                  >
                    <FormControlLabel disabled={editPage} sm={6} value="teacher" control={<Radio />} label="Teacher" />
                    <FormControlLabel disabled={editPage} sm={6} value="student" control={<Radio />} label="Student" />
                  </RadioGroup>
                </Grid>
                <Grid item xs={12}> 
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                Sign Up
              </Button>
            {/* <button className="btn btn-white" form="register-form" type="submit" disabled={!isValid()}> Create the Account</button> */}
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to="/sign-in" component={AdapterLink} variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
      </Container>
    );
}
export default Register