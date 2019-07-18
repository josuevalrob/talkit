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
import LessonsForm from './TableNotes';
import Review from './Review';
import validations from './../validations';
import UnityServices from './../../../services/UnityServices';
import { Redirect } from 'react-router-dom'

// import { withAuthConsumer } from './contexts/AuthStore';
const steps = ['General Data', 'Add Notes', 'Review your Unity'];

function getStepContent(step, unity, fn, dos) {
  switch (step) {
    case 0:
      return <GeneralForm data={unity} callBackState={fn} />;
    case 1:
      return <LessonsForm data={unity} updateNotes={dos} />;
    case 2:
      return <Review data={unity} handler={fn} />;
    default:
      throw new Error('Unknown step');
  }
}

function UnityForm(props) {
  const cId = props.match.params.id
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  
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
      name: '',
      description: '', 
      price: 0,
      private: false,
      notes: [{ 
        notesTitle: 'Zerya Betül',
        markDown: '# This is a heading\n\nThis is a paragraph with [a link](http://www.disney.com/) in it.',
      }]
    },
    newUnityId: null //It will be a number
  })

  const updateNotes = (notesArray) => {
    setUnity({
      ...unity,
      body:{
        ...unity.body,
        notes:[...unity.body.notes, ...notesArray]
      }
    })
    console.log(unity.body)
  }

  const handleChange = newBody => {
    setUnity({
      ...unity, 
      body: {...unity.body, ...newBody}
    })
  }
  const isValid = () => !Object.keys(unity.body).some(attr => unity.errors[attr])

  const handleSubmit = () => {
    if(isValid()){
      // isloading: True
      UnityServices.addUnities(unity.body, cId)
        .then( unity => setUnity({newUnityId: unity.id}))
        .catch(e=> {
          console.log(e) //! 
        })
    }
  }

  if (unity.newUnityId) return <Redirect to={`/class/${cId}/unity/${unity.newUnityId}`} />
console.log(unity)
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
                {getStepContent(activeStep, unity, handleChange, updateNotes)}
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