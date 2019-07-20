import React from 'react';
import Search from './scenes/Search'
import ClassRoom from './scenes/CLassRoom'
import ClassRoomCRUD from './scenes/CRUD/CrudClassRoom'
import Register from './scenes/RegisterPage'
import Login from './scenes/LoginPage'
// import Navbar from './components/misc/Navbar';
import PrivateRoute from './guards/PrivateRoutes';
import PublicRoute from './guards/PublicRoute';
import TeacherRoute from './guards/TeacherRoute'
// import Footer from './components/misc/footer'
import { Switch, Route, Redirect } from 'react-router-dom';
import { withAuthConsumer } from './contexts/AuthStore';
import CssBaseline from '@material-ui/core/CssBaseline';
import UnityForm from './components/forms/Unity/UnityForm'
import Unity from './scenes/Unity'
import Dashboard from './scenes/Dashboard'

function App(props) {
  return (
    <React.Fragment>
      <CssBaseline />
        {/* {props.isAuthenticated() && <Navbar />} */}
        <Switch>
          <PublicRoute exact path="/sign-in" component={Login} />
          <PublicRoute exact path="/sign-up" component={Register} />
          <TeacherRoute exact path="/dashboard" component={Dashboard} />
          <Route exact path="/" component={() => (
            <Redirect to={props.isTeacher() ? "dashboard" : "/home"} />
          )} />
        </Switch>
      {/* {props.isAuthenticated() && <Footer />} */}
    </React.Fragment>
  );
}

export default withAuthConsumer(App);
