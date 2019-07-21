import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import ClassIcon from '@material-ui/icons/Class';
import ClassTwoTone from '@material-ui/icons/ClassTwoTone'
import ClassRoomService from '../services/ClassRoomServices';
import AdapterLink from './../components/misc/LinkTalkit';
import Button from '@material-ui/core/Button';

export const MainListItems = () =>{
return (
  <div>
    <ListItem button component={AdapterLink} to={'/dashboard'}>
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
      <ListItemText primary="Students" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
    <ListItem button component={AdapterLink} to={'/dashboard/classrooms'}>
      <ListItemIcon>
        <ClassIcon />
      </ListItemIcon>
      <ListItemText primary="All ClassRooms" />
    </ListItem>
  </div>
)
}

export const ClassRoomList =({user, isOpen}) => {
  const [data, setData] = React.useState([])
  
  const fetchData = async () => {
      const response = await ClassRoomService.allClass(user) //*filtramos data por el usuario actual
      setData(response) // [...]    
  }

  React.useEffect(() => { fetchData() }, [])
  
  // const data = data.filter(e=>e.owner === user)
  
  return (
    <div > 
      {isOpen && <ListSubheader style={!data.length ? {paddingLeft:'15px'} : {}} inset>{data.length ? 'Your ClassRooms' : "Yo don't have ClassRooms"}</ListSubheader>}
      {data.length 
        ? data.map((e,i)=> (
          <ListItem button key={i} >
            <ListItemIcon>
                <ClassTwoTone />
            </ListItemIcon>
            <ListItemText primary={e.name} />
          </ListItem>
        ))
        // : isOpen 
        //   &&  <Button component={AdapterLink} variant="outlined" to={'/class/add'}>
        //         Add a new ClassRoom 
        //       </Button>
        : <ListItem button component={AdapterLink} to={'/class/add'}>
            <ListItemIcon>
              <ClassTwoTone />
            </ListItemIcon>
            <ListItemText primary="New ClassRoom" />
          </ListItem>
      }
    </div>
  )
}