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
)
}

export const ClassRoomList =({user}) => {
  const [data, setData] = React.useState([])
  
  const fetchData = async () => {
      const response = await ClassRoomService.allClass()
      setData(response.data) // [...]    
  }

  React.useEffect(() => { fetchData() }, [])
  
  const filterData = data.filter(e=>e.owner === user)
  
  return (
    <div style={!filterData.length ? {paddingLeft:'15px'} : {}}>
      <ListSubheader style={!filterData.length ? {paddingLeft:'5px'} : {}} inset>{filterData.length ? 'Your ClassRooms' : "Yo don't have ClassRooms"}</ListSubheader>
      {filterData.length 
        ? filterData.map((e,i)=> (
          <ListItem button key={i} >
            <ListItemIcon>
                <ClassTwoTone />
            </ListItemIcon>
            <ListItemText primary={e.name} />
          </ListItem>
        ))
        : <Button component={AdapterLink} variant="outlined" to={'/class/add'}>
            Add a new ClassRoom 
          </Button>
      }
    </div>
  )
}