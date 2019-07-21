import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ClassIcon from '@material-ui/icons/Class';
import ClassTwoTone from '@material-ui/icons/ClassTwoTone'
import AdapterLink from './../components/misc/LinkTalkit';
import { withAuthConsumer } from '../contexts/AuthStore';
import CircularProgress from '@material-ui/core/CircularProgress';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import UnityServices from './../services/UnityServices';
import classRoomServices from './../services/ClassRoomServices';

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
                {props.isStudent() 
                  &&  <Button size="small" color="primary">
                        Enjoy
                      </Button>}
                <Tooltip title="CheckWhat is going on" placement="top">
                  <Button component={AdapterLink} to={`/dashboard/classrooms/${e.id}`} size="small">Review</Button>
                </Tooltip>
                { isOwner(e) 
                  &&  <Button size="small" component={AdapterLink} color="primary" 
                        to={enlace}>
                        Edit
                      </Button>}
                { isOwner(e) 
                  &&  <Button size="small" color="secondary" 
                        onClick={()=>handleDelete(e.id)} >
                        Delete
                      </Button>}

              </ExpansionPanelActions>
            </ExpansionPanel>
          </ListItem>
          )}
        )
      : <div className={classes.center}><CircularProgress  /></div>
)};

export default withAuthConsumer(ListComponent)