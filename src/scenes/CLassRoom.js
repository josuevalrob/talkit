import React, {useState, useEffect} from 'react';
import ClassRoomService from './../services/ClassRoomServices'
import UnityService from './../services/UnityServices'
import List from '@material-ui/core/List';
import PrintTitle from './../components/misc/PrintTitle';
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
  const [clazz, setClass] = useState({})
  const [noData, setNoData] = useState('')
  // const fetchData = 

  useEffect(() => { 
    const fetchData = async () => {
      if(id){
        const classRoom = await ClassRoomService.getClass(id) //*This could go to the context
        setClass(classRoom) // {...}
        const unities = await UnityService.getAll(id) //*This could go to the context
        if(!unities.message){
          setData(unities) // [...]
        } else {
          setNoData(unities.message)
        }
      } else {
        const response = await ClassRoomService.allClass()
        setData(response) // [...]
      }
    }
    fetchData()
   }, [id])
  
  const classes = useStyles();
  return (
    <Container maxWidth="sm" className={classes.heroContent}>
        <CssBaseline />
        <PrintTitle 
          title={!id ? 'Classrooms' : clazz.name} 
          classes={classes} 
          // teacher={props.isTeacher}
          content={clazz.description && clazz.description}
          />
          { props.isTeacher() 
            && <AddButton 
                classes = {classes.center} 
                go={id ? `/dashboard/classrooms/${id}/unity/add` : '/dashboard/classrooms/add'} 
                title={id ? 'Add a unity' : 'Add a classRoom'}
                />
          }
        <CssBaseline />
      <List className={classes.root}>
        { !id //* si no viene Id estaré en la vista de classroom detail
          ? <ListComponent classes={classes} data={data}/>
          : !noData
            ? <div style={classes.center}>No hay unidades creadas </div>  
            : <ListComponent classes={classes} data={data}/>
        }
      </List>      
    </Container>
  );
}

const AddButton = ({classes, go, title, click}) => (
  <Button component={AdapterLink} variant="outlined" to={go} className={classes}>
    {title}
  </Button>
)

export default withAuthConsumer(ClassRoom);
