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
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
const ClassRoomForm = (props) => {
  const classes = useStyles()
  const [chipData, setChipData] = React.useState([])


  const handleDelete = chipToDelete => () => setChipData(chips => chips.filter(chip => chip.key !== chipToDelete.key));
  const [chip, setChip] = React.useState('')
  
  const handleChip = chip => event => {
    const {value} = event.target 
    setChip(value)
    if(value.split(' ').length > 1) {
      const chipArr = [...chipData]
      const newChip = {key:chipArr.length, label: value.trim()}
      chipArr.push(newChip)
      setChipData(chipArr)
      setChip('')
    }
  }
  console.log(props)
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
  const cId = props.match.params.id
// ! extract it
  const isValid = () => !Object.keys(state.classRoom).some(attr => state.errors[attr])

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid()) {
      state.classRoom.category = chipData.map(e=>e.label)
      if(!cId){ //* CREATE
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
      } else { //* Edit
        classRoomServices.editClass(state.classRoom, cId)
        .then(
          (user) => setState({ ...state, goToClassRooms: false }),
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
  }


// ** Edit ClassRoom
  React.useEffect(()=>{
    if(cId){
    console.log('Ups editing... r u sure?')
      classRoomServices.getClass(cId)
        .then(classRoom => {
          setState({classRoom})
          setChipData(classRoom.category.map((label, key)=>({label, key})))
        })
  }}, [cId])


  if (state.goToClassRooms) {
    return <Redirect to="/dashboard/classrooms" />
  }
  const {errors} = state
  return (
    <form id="register-form" className={classes.form} onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            onChange={handleChange('name')}
            value={state.classRoom.name}
            error={errors && errors.name ? true : false }
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
            error={errors && errors.description ? true : false }
            variant="outlined"
            required
            fullWidth
            id="description"
            label="Class description"
            name="description"
            multiline={true}
            rows={4}
            rowsMax={6}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={handleChip('chip')}
            variant="outlined"
            value={chip}
            fullWidth
            id="chip"
            label="Add Some tags"
            name="chip"
          />
        </Grid>     
        <Grid item xs={12}>
          <Paper className={classes.rootChip}>
            {chipData.map(data => (
              <Chip
                key={data.key}
                label={data.label}
                onDelete={handleDelete(data)}
                className={classes.chip}
              />))}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {`${cId ? 'Editar' : 'Crear'} ClassRoom`}
          </Button>
        </Grid>
      </Grid>
    </form>
  )

}

export default ClassRoomForm