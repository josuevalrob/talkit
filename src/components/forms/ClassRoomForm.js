import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import classRoomServices from './../../services/ClassRoomServices'
import validations from './validations'
import useStyles from '../styles/signUp.style'
import "react-datepicker/dist/react-datepicker.css";
// * Material design
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const ClassRoomForm = () => {
const classes = useStyles()

  const [state, setState] = useState({
    classRoom: {
      name: '',
      description: '',
    },
    errors: {},
    touch: {},
    goToClassRooms: false
  })

// ! extract it
  const handleChange = name => event => {
    setState({
      ...state,
      classRoom: {
        ...state.classRoom,
        [name]: event.target.value
      },
      errors: {
        ...state.errors,
        [name]: validations[name] && validations[name](event.target.value)
      }
    })
  }
// ! extract it
  const isValid = () => !Object.keys(state.classRoom).some(attr => state.errors[attr])

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid()) {
      classRoomServices.addClass(state.classRoom)
        .then(
          (user) => setState({ ...state, goToClassRooms: true }),
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
        .catch(error => console.log(error))
    }
  }

  if (state.goToClassRooms) {
    return <Redirect to="/class"/>
  }
  const {errors} = state
  return (
    <form id="register-form" className={classes.form} onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            onChange={handleChange('name')}
            value={state.classRoom.name}
            error={errors.name ? true : false }
            variant="outlined"
            required
            fullWidth
            id="name"
            label="Class Name"
            name="name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={handleChange('description')}
            value={state.classRoom.description}
            error={errors.description ? true : false }
            variant="outlined"
            required
            fullWidth
            id="description"
            label="Class description"
            name="description"
          />
        </Grid>        
        <Grid item xs={12}>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Crear ClassRoom
          </Button>
        </Grid>
      </Grid>
    </form>
  )

}

export default ClassRoomForm