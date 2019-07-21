import React, {useState, useEffect} from 'react';
import ClassRoomService from './../services/ClassRoomServices'
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

  // const fetchData = 

  useEffect(() => { 
    const fetchData = async () => {
      if(id){
        const response = await ClassRoomService.getClass(id)
        setData(response) // {...}
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
          title={!id ? 'Classrooms' : data.name} 
          classes={classes} 
          // teacher={props.isTeacher}
          content={data.description && data.description}
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
          : <div >Hola</div>
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
