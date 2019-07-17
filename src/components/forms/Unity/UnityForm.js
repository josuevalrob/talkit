import React from 'react';
import useStyles  from '../../styles/multipleStep';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GeneralForm from './GeneralForm';
import LessonsForm from './NotesForm';
import Review from './Review';
import validations from './../validations';
import UnityServices from './../../../services/UnityServices';
import { Redirect } from 'react-router-dom'

// import { withAuthConsumer } from './contexts/AuthStore';
const steps = ['General Data', 'Add Notes', 'Review your Unity'];

function getStepContent(step, unity, fn) {
  switch (step) {
    case 0:
      return <GeneralForm data={unity} handler={fn} />;
    case 1:
      return <LessonsForm data={unity} handler={fn} />;
    case 2:
      return <Review data={unity} handler={fn} />;
    default:
      throw new Error('Unknown step');
  }
}

function UnityForm(props) {
  const cId = props.match.params.id
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(2);
  const handleNext = () => {
    setActiveStep(activeStep + 1);
    if(activeStep === steps.length - 1) //si llegamos al final
      handleSubmit()
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const [unity, setUnity] = React.useState({   
    body: { 
      name: 'Unity test',
      description: 'Unity description', 
      price:'40',
      notesTitle:'Some notes title',
      markDown:'Lorem Ipsum',
    },    
    errors: {}, // * definimos los errores como objetos. 
    newUnityId: null 
  })
  const handleChange = name => event => {
    setUnity({
      ...unity,
      body: {
        ...unity.body,
        [name]: event.target.value
      },
      errors: {
        ...unity.errors,
        [name]: validations[name] && validations[name](event.target.value)
      }
    })
  }
  const isValid = () => !Object.keys(unity.body).some(attr => unity.errors[attr])

  const handleSubmit = () => {
    if(isValid()){
      UnityServices.addUnities(unity.body, cId)
        .then( unity => setUnity({newUnityId: unity.id}))
        .catch(e=> {
          console.log(e) //! 
        })
    }
  }
  const handle = activeStep === steps.length - 1  ? handleSubmit : handleChange

  if (unity.newUnityId) return <Redirect to={`/class/${cId}/unity/${unity.newUnityId}`} />

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Create a new Unity for you class 
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length 
            ? <ThanksYou />
            : <React.Fragment>
                {getStepContent(activeStep, unity, handle)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <GoBack handleBack={handleBack} classes = {classes.button} />
                  )}
                  <Button variant="contained" color="primary" onClick={handleNext} className={classes.button} >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            }
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}

export default UnityForm

const GoBack = ({handleBack, classes}) => (
  <Button onClick={handleBack} className={classes}>
    Back
  </Button>
)

const ThanksYou = () => (
  <React.Fragment>
    <Typography variant="h5" gutterBottom>
      Thank you for your order.
    </Typography>
    <Typography variant="subtitle1">
      Your order number is #2001539. We have emailed your order confirmation, and will
      send you an update when your order has shipped.
    </Typography>
  </React.Fragment>
)