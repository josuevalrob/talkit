import React from 'react';
import Search from './scenes/Search'
// import Landing from './scenes/Landing'
// import Unity from './scenes/Unity'
import ClassRoom from './scenes/CLassRoom'
import ClassRoomCRUD from './scenes/CRUD/CrudClassRoom'
import Register from './scenes/RegisterPage'
import Login from './scenes/LoginPage'
import Navbar from './components/misc/Navbar';
import PrivateRoute from './guards/PrivateRoutes';
import PublicRoute from './guards/PublicRoute';
import TeacherRoute from './guards/TeacherRoute'
// import Unsplash from './components/Unsplash';
import Footer from './components/misc/footer'
import { Switch, Route, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { withAuthConsumer } from './contexts/AuthStore';
// import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    // flexDirection: 'column',
    minHeight: '100vh',
  },
}));

// ! I NEED A FUCKING ROUTER COMPONENT!!! this is a mess!
function App(props) {
  // const classes = useStyles();
  // const container = props.isAuthenticated() ? 'container' : ''
  return (
    // <div className={classes.root}>
    <React.Fragment>
      <CssBaseline />

        {props.isAuthenticated() && <Navbar />}
        <Switch>
          <Route exact path="/home" component={Search} />
          {/* <Route exact path="/search" component={Search} /> */}
          <PublicRoute exact path="/sign-in" component={Login} />
          <PublicRoute exact path="/sign-up" component={Register} />
          {/* //* ClassRoom Routes.  */}
          <TeacherRoute exact path="/ " component={ClassRoom} />  {/* //* CRUD in a ClassRoom */}
          <TeacherRoute exact path="/class/add" component={ClassRoomCRUD} />  {/* //* Show all */}
          <PrivateRoute exact path="/class" component={ClassRoom} />  {/* //* Show a Detail ClassRoom */}
          <Route exact path="/" component={() => (
            <Redirect to="/home" />
          )} />
          {/* //* Unity Routes.  */}
          {/* <PrivateRoute exact path="/class/:cid/unity/:nid" component={Unity} /> */} 

        </Switch>
      {props.isAuthenticated() && <Footer />}
    </React.Fragment>
  );
}

export default withAuthConsumer(App);
