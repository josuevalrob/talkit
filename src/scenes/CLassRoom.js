import React, {useState, useEffect} from 'react';
import ClassRoomService from './../services/ClassRoomServices'
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import AdapterLink from './../components/misc/LinkTalkit';
import { withAuthConsumer } from '../contexts/AuthStore';
import ListComponent from './../components/ListComponent'
import useStyles from './../components/styles/classRoom.style'

function ClassRoom(props) {
  const {id} = props.match.params
  const [data, setData] = useState([])
  
  const fetchData = async () => {
    if(id){
      const response = await ClassRoomService.getClass(id)
      setData(response.data) // {...}
    } else {
      const response = await ClassRoomService.allClass()
      setData(response.data) // [...]
    }
  }

  useEffect(() => { fetchData() }, [data])
  
  const classes = useStyles();
  return (
    <Container maxWidth="sm" className={classes.heroContent}>
        <CssBaseline />
        <PrintTitle 
          title={!id ? 'Classrooms' : data.name} 
          classes={classes} 
          // teacher={props.isTeacher}
          content={data.description && data.description}
          />
          {props.isTeacher() && <AddClassButton classes = {classes.button} go={id ? `/class/${id}/unity/add` : '/class/add'} title={id ? 'Add a unity' : 'Add a ClassRoom'}/>}

        <CssBaseline />
      <List className={classes.root}>
        { !id 
          ? <ListComponent classes={classes} data={data}/>
          : <div >Hola</div>
        }
      </List>
    </Container>
  );
}

const AddClassButton = ({classes, go, title}) => (
  <Button component={AdapterLink} variant="outlined" to={go} style={{flex:''}}>
    {title}
  </Button>
)

//* si está en la lista, muestra el title de lista, si no, muestra el title de la sección
const PrintTitle = (props) => ( 
  <React.Fragment>
    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
      {props.title}
    </Typography>
    <Typography variant="subtitle1"  align="center" color="textSecondary" paragraph>
      {props.content && props.content}
    </Typography>
  </React.Fragment>
)

export default withAuthConsumer(ClassRoom);
