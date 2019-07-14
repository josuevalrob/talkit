import React, {useState, useEffect} from 'react';
import ClassRoomService from './../services/ClassRoomServices'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ClassIcon from '@material-ui/icons/Class';
import ClassTwoTone from '@material-ui/icons/ClassTwoTone'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import AdapterLink from './../components/misc/LinkTalkit';
import { withAuthConsumer } from '../contexts/AuthStore';
import DeleteIcon from '@material-ui/icons/EditOutlined';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';

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
  
  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  const classes = useStyles();
  return (
      <Container fixed>
      <List className={classes.root} aria-label="The list of Classes">
        <CssBaseline />
          <Typography variant="h4" gutterBottom className={classes.typo}>
            Classrooms
            {props.isTeacher() && <AddClassButton classes = {classes.button} />}
          </Typography>
        <CssBaseline />
        { data.length 
          ? data.map((e, i)=>(
              <ListItem key={i} component={AdapterLink} to={`/class/${e.id}`}>
                <ListItemAvatar>
                  <Avatar>
                    { e.owner === props.user.data.id
                      ? <ClassTwoTone />
                      : <ClassIcon /> }
                  </Avatar>
                </ListItemAvatar>
                
                <ListItemText primary={e.name} secondary={new Date(e.createdAt).toLocaleDateString("en-US", options)} />
                
                { e.owner === props.user.data.id && 
                  <ListItemSecondaryAction>
                    <Tooltip title="Edit your Class" placement="top">
                      <IconButton component={AdapterLink} to="/class/add"  edge="end" aria-label="Delete">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                }
              </ListItem>
              )
            )
          : <div className={classes.center}><CircularProgress  /></div>
        }
      </List>
    </Container>
  );
}

const AddClassButton = ({classes}) => (
  <Button component={AdapterLink} variant="outlined" to="/class/add" style={{flex:''}}>
    New class?
  </Button>
)

export default withAuthConsumer(ClassRoom);
