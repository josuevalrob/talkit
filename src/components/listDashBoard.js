import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ClassIcon from '@material-ui/icons/Class';
import ClassTwoTone from '@material-ui/icons/ClassTwoTone'
import ClassRoomService from './../services/ClassRoomServices';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ClassIcon />
      </ListItemIcon>
      <ListItemText primary="New ClassRoom" />
    </ListItem>
  </div>
);

export const SecondaryListItems =({user}) => {
  const [data, setData] = React.useState([])
  
  const fetchData = async () => {
      const response = await ClassRoomService.allClass()
      setData(response.data) // [...]    
  }

  React.useEffect(() => { fetchData() }, [])
  
  console.log(data)
  return (
    <div>
      <ListSubheader inset>Your ClassRooms</ListSubheader>
      {data && data.map((e,i)=> (
        <ListItem button>
          <ListItemIcon>
            { e.owner === user
              ? <ClassTwoTone />
              : <ClassIcon /> }
          </ListItemIcon>
          <ListItemText primary={e.name} />
        </ListItem>
      ))}
    </div>
)
}