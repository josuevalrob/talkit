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
import Modal from '@material-ui/core/Modal';

function ClassRoom(props) {
  const {id} = props.match.params
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false); //* modal
  const handleModal = () => setOpen(!open) //* close and open modal. 

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
          { props.isTeacher() 
            && <AddButton 
                classes = {classes.button} 
                go={id ? `/class/${id}/unity/add` : '/class/add'} 
                title={id ? 'Add a unity' : 'Add a classRoom'}
                />
          }
        <CssBaseline />
      <button type="button" onClick={handleModal}>
        Open Modal
      </button> 
      <List className={classes.root}>
        { !id //* si no viene Id estaré en la vista de classroom detail
          ? <ListComponent classes={classes} data={data}/>
          : <div >Hola</div>
        }
      </List>
      <Modal
        aria-labelledby={id ? 'add-a-unity' : 'add a-classRoom'}
        open={open}
        onClose={handleModal} >
        <div className={classes.paper}>
          <h2 id="modal-title">Text in a modal</h2>
          <p id="simple-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
        </div>
      </Modal>
    </Container>
  );
}

const AddButton = ({classes, go, title, click}) => (
  <Button component={AdapterLink} variant="outlined" to={go} style={classes}>
    {title}
  </Button>
)

export default withAuthConsumer(ClassRoom);
