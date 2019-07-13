import React, {useState, useEffect} from 'react';
import ClassRoomService from './../services/ClassRoomServices'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ClassIcon from '@material-ui/icons/Class';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function ClassRoom() {
  const [data, setData] = useState([])

  const fetchData = async () => {
    const response = await ClassRoomService.allClass()
    console.log(response)
    setData(response.data)
  }

  useEffect(() => { fetchData() }, [])
  
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {data.length && data.map((e, i)=>(
        <ListItem key={i}>
          <ListItemAvatar>
            <Avatar>
              <ClassIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={e.name} secondary="Jan 9, 2014" />
        </ListItem>
      ))}
    </List>
  );
}

export default ClassRoom;
