import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const GeneralForm = ({data, handler}) => {    
  const {body, errors} = data;
  const [value, setValue] = useState(0)
  const priceHandler = (e, v) =>{
    setValue(v)
    handler('price')({target: {value : v}}) //? what tha fuck is this?
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Let's build a new {body.name && `: ${body.name}`}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="name"
            name="name"
            label="Unity Name"
            fullWidth
            onChange={handler('name')}
            value={body.name}
            error={errors.name ? true : false }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom style={{margin:'0'}}>{value ? `Price: ${value}` : 'Free Unity' }</Typography>
          <PrettoSlider valueLabelDisplay="auto" aria-label="Pretto slider" onChangeCommitted={priceHandler} defaultValue={value} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="description"
            name="description"
            label="Tell me something about it.. "
            fullWidth
            onChange={handler('description')}
            value={body.description}
            error={errors.description ? true : false }
          />
        </Grid>        
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Make it private"
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