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

const options = { year: 'numeric', month: 'long', day: 'numeric' };

const ListComponent = (props) => {
  const {data, classes} = props
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (  
      data.length 
      ? data.map((e, i)=>(
          <ListItem key={i}>
            <ExpansionPanel expanded={expanded === `panel${i}`} onChange={handleChange(`panel${i}`)}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content"id={`panel${i}bh-header`}>
                <ListItemAvatar>
                  <Avatar>
                    { e.owner === props.user.data.id
                      ? <ClassTwoTone />
                      : <ClassIcon /> }
                  </Avatar>
                </ListItemAvatar>
                
                <ListItemText primary={e.name} secondary={new Date(e.createdAt).toLocaleDateString("en-US", options)} />
                
                {/* { e.owner === props.user.data.id && 
                  <ListItemSecondaryAction>
                    <Tooltip title="Edit your Class" placement="top">
                      <IconButton component={AdapterLink} to="/class/add"  edge="end" aria-label="Delete">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                } */}

              </ExpansionPanelSummary>
              
              <ExpansionPanelDetails>
                <Typography>{e.description}</Typography>
              </ExpansionPanelDetails>
              <Divider />
              <ExpansionPanelActions>
                <Tooltip title="CheckWhat is going on" placement="top">
                  <Button size="small">Review</Button>
                </Tooltip>
                <Button component={AdapterLink} to={`/class/${e.id}`} size="small" color="primary">
                  Enjoy
                </Button>
              </ExpansionPanelActions>
            </ExpansionPanel>
          </ListItem>
          )
        )
      : <div className={classes.center}><CircularProgress  /></div>
)};

export default withAuthConsumer(ListComponent)