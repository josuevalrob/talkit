import React from 'react';
import Search from './scenes/Search'
import Register from './scenes/RegisterPage'
import Login from './scenes/LoginPage'
// import Navbar from './components/misc/Navbar';
import PrivateRoute from './guards/PrivateRoutes';
import PublicRoute from './guards/PublicRoute';
import TeacherRoute from './guards/TeacherRoute'
import { Switch, Route, Redirect } from 'react-router-dom';
import { withAuthConsumer } from './contexts/AuthStore';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dashboard from './scenes/Dashboard';
import ClassRoom from './scenes/CLassRoom'
import AppBar from '@material-ui/core/AppBar';
import Navbar from './components/misc/Navbar'

function App(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      {props.isStudent() && <AppBar position="relative">
        <Navbar title={`Welcome ${props.user.data.name}`} isTeacher={()=>props.isTeacher()}/>
      </AppBar>}
        {/* {props.isAuthenticated() && <Navbar />} */}
        <Switch>
          <PublicRoute exact path="/sign-in" component={Login} />
          <PublicRoute exact path="/sign-up" component={Register} />
          {/* Test this. */}
          <TeacherRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/search" component={Search} />
          <PrivateRoute path="/classRoom/:id" component={ClassRoom} />
          <Route exact path="/" component={() => (
            <Redirect to={"/search"} />
          )} />
        </Switch>
      {/* {props.isAuthenticated() && <Footer />} */}
    </React.Fragment>
  );
}

export default withAuthConsumer(App);
