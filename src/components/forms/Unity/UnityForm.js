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
import FetchFormHoc from './../FetchFormHoc';
import { Redirect } from 'react-router-dom'
import ThanksYou from '../../misc/ThankYou'

import UnityServices from './../../../services/UnityServices';

const steps = ['General Data', 'Add Notes', 'Review your Unity'];

function getStepContent(step, unity, general, notes) {
  switch (step) {
    case 0:
      return <GeneralForm data={unity} callBackState={general} />;
    case 1:
      return <LessonsForm notes={unity.notes} callBackState={notes} />;
    case 2:
      return <Review data={unity} />;
    default:
      throw new Error('Unknown step');
  }
}

function UnityForm(props) {
  const cId = props.match.params.id
  const uId = props.match.params.uid
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => setActiveStep(activeStep + 1);

  const handleBack = () => setActiveStep(activeStep - 1);
  
  // * En el último paso, llamamos al handle submit
  React.useEffect(()=> {
    if(activeStep === steps.length) {
      handleSubmit()
    }
  }, [activeStep])

  const [unity, setUnity] = React.useState({       
    name: '',
    description: '', 
    price: 0,
    isPrivate: false,
    notes:  []      
  })

  React.useEffect(()=>{
    props.data && props.data.name && 
    setUnity({ //* evaluamos si recibimos la información del HOC
      name: props.data.name ? props.data.name : '',
      description: props.data.description ? props.data.description : '', 
      price: props.data.price ? props.data.price : 0,
      isPrivate: props.data.isPrivate ? props.data.isPrivate : false,
      notes: props.data.notes ? props.data.notes :  []      
    })
  }, [props.data])

  const [newUnityId, setNewUnityId] = React.useState(null)
  
  const notesHanlder = (notesArray) => setUnity({...unity, notes:[...notesArray]})

  const generalHandler = newBody => setUnity({...unity, ...newBody})

  const handleSubmit = () => {
    // if(!uId){
    UnityServices.addUnities(unity, cId)
      .then( 
        unity => setNewUnityId(unity.id), 
        error => console.error(error)
      )
    // } else {
    //   UnityServices.editUnities(unity, cId, uId)
    //     .then( 
    //       unity => setNewUnityId(uId), 
    //       error => console.error(error)
    //     )
    // }
  }

  if (newUnityId) return <Redirect to={`/dashboard/classrooms/${cId}`} />
  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Create a new Unity for your class 
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
            ? <ThanksYou subtitle="You have created a new Unity for the class ..." />
            : <React.Fragment>
                {getStepContent(activeStep, unity, generalHandler, notesHanlder)}
                <div className={classes.buttons}>
                  { activeStep !== 0 
                    && <Button onClick={handleBack} className = {classes.button} > Back </Button>
                  }
                  <Button variant="contained" color="primary" onClick={handleNext} className={classes.button} >
                    {activeStep === steps.length - 1 ? 'Go!' : 'Next'}
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

export default FetchFormHoc(UnityForm, UnityServices.getUnity)