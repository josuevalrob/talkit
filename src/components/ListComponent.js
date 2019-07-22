import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ClassIcon from '@material-ui/icons/Class';
import ClassTwoTone from '@material-ui/icons/ClassTwoTone'
import { withAuthConsumer } from '../contexts/AuthStore';
import CircularProgress from '@material-ui/core/CircularProgress';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Divider from '@material-ui/core/Divider';
import UnityServices from './../services/UnityServices';
import classRoomServices from './../services/ClassRoomServices';
import Actions from './misc/Actions'
const options = { year: 'numeric', month: 'long', day: 'numeric' };

const ListComponent = (props) => {
  const {data, classes} = props
  const {id} = props.match.params

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const isOwner = classRoom => classRoom.owner === props.user.data.id ? true : false
  const handleDelete = element => {
    debugger
    if(id){
      UnityServices.deleteUnity(id, element)
        .then(e => e.status === 204 && props.deleteCallback(element)) //llamamos a la función borrar del padre
    } else {
      classRoomServices.deleteClass(element)
        .then(e => e.status === 204 && props.deleteCallback(element)) //llamamos a la función borrar del padre
    }
  }
  return (  
      data.length 
      ? data.map((e, i)=> {
        let unityId = e.classRoom ? `unity/${e.id}/` : '';
        let enlace = `/dashboard/classrooms/${!id ? e.id : id}/${unityId}edit`
        return(
          <ListItem key={i}>
            <ExpansionPanel expanded={expanded === `panel${i}`} onChange={handleChange(`panel${i}`)}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content"id={`panel${i}bh-header`}>
                <ListItemAvatar>
                  <Avatar>
                    { isOwner(e)
                      ? <ClassTwoTone />
                      : <ClassIcon /> }
                  </Avatar>
                </ListItemAvatar>
                
                <ListItemText primary={e.name} secondary={new Date(e.createdAt).toLocaleDateString("en-US", options)} />
                
              </ExpansionPanelSummary>
              
              <ExpansionPanelDetails>
                <Typography>{e.description}</Typography>
              </ExpansionPanelDetails>
              <Divider />
              <ExpansionPanelActions>
                <Actions 
                  editLink={`/dashboard/classrooms/${e.id}`} 
                  e={e} 
                  isStudent={props.isStudent} 
                  isOwner={isOwner} id={e.id} enlace={enlace} handleDelete={handleDelete} />
              </ExpansionPanelActions>
            </ExpansionPanel>
          </ListItem>
          )}
        )
      : <div className={classes.center}><CircularProgress  /></div>
)};


export default withAuthConsumer(ListComponent)