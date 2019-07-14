import React, {useState, useEffect} from 'react';
import ClassRoomService from './../services/ClassRoomServices'
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import AdapterLink from './../components/misc/LinkTalkit';
import { withAuthConsumer } from '../contexts/AuthStore';
import ListComponent from './../components/ListComponent'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  progress: {
    margin: theme.spacing(2),
  },
  typo:{display:'flex', justifyContent:'space-between', margin:'0 0.5em'},
  center: {
    width: '100%',
    margin: 'auto',
    textAlign: 'center'
  },
}));

function ClassRoom(props) {
  const [data, setData] = useState([])

  const fetchData = async () => {
    const response = await ClassRoomService.allClass()
    setData(response.data)
  }

  useEffect(() => { fetchData() }, [])
  
  const classes = useStyles();
  console.log(props)
  return (
    <Container fixed>
      <List className={classes.root} aria-label="The list of Classes">
        <CssBaseline />
        <PrintTitle path={props.match.path} classes={classes} rol={props.isTeacher}/>
        <CssBaseline />
        <ListComponent classes={classes} data={data}/>        
      </List>
    </Container>
  );
}

const AddClassButton = ({classes}) => (
  <Button component={AdapterLink} variant="outlined" to="/class/add" style={{flex:''}}>
    New class?
  </Button>
)

//* si está en la lista, muestra el title de lista, si no, muestra el title de la sección
const PrintTitle = (props) => ( 
  <Typography variant="h4" gutterBottom className={props.classes.typo}>
    {props.path === '/class' ? 'Classrooms' : props.classTitle}
    {props.rol() && <AddClassButton classes = {props.classes.button} />}
  </Typography>
)

export default withAuthConsumer(ClassRoom);
