import React from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import validations from './../validations';
import Lock from '@material-ui/icons/Lock';
import LockOpen from '@material-ui/icons/LockOpen';

const GeneralForm = ({data, callBackState}) => {    
  const [value, setValue] = React.useState(data.body.price)
  const [errors, setErrors] = React.useState({})    
  const [general, setGeneral] = React.useState({ 
    name: data.body.name, 
    description: data.body.description,
    price: data.body.price,
    private: data.body.private,
  })

  const checkHandler = name => event => setGeneral({ ...general, [name]: event.target.checked });

  const priceHandler = (e, v) => {
    setValue(v)
    handleChange('price')({target: {value : v}})
  }

  const handleChange = name => event => {
    setGeneral({
      ...general,
      [name]: event.target.value,      
    })
    setErrors({
      ...errors,
      [name]: validations[name] && validations[name](event.target.value)
    })
  }

  const isValid = () => !Object.keys(general).some(attr => errors[attr])

  React.useEffect(() => {
    if(isValid){
      callBackState(general)
    }
  }, [errors]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Let's build a new {general.name && `: ${general.name}`}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="name"
            name="name"
            label="Unity Name"
            fullWidth
            onChange={handleChange('name')}
            value={general.name}
            error={errors.name ? true : false }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom style={{margin:'0'}}>{value ? `Price: ${value}€` : 'Free Unity' }</Typography>
          <PrettoSlider valueLabelDisplay="auto" aria-label="Pretto slider" onChangeCommitted={priceHandler} defaultValue={value} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="description"
            name="description"
            label="Tell me something about it.. "
            fullWidth
            onChange={handleChange('description')}
            value={general.description}
            error={errors.description ? true : false }
          />
        </Grid>        
        <Grid item xs={12}>
          <FormControlLabel
            control = { <Checkbox icon={<LockOpen />} 
                          checkedIcon={<Lock />} 
                          value={general.private} 
                          onChange={checkHandler('private')}
                        /> }
            label={general.private ? 'Make it public' : 'Make it private'}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const PrettoSlider = withStyles({
  root: {
    color: '#3f51b5',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

export default GeneralForm;