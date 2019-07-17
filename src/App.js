import React from 'react';
import Search from './scenes/Search'
import ClassRoom from './scenes/CLassRoom'
import ClassRoomCRUD from './scenes/CRUD/CrudClassRoom'
import Register from './scenes/RegisterPage'
import Login from './scenes/LoginPage'
import Navbar from './components/misc/Navbar';
import PrivateRoute from './guards/PrivateRoutes';
import PublicRoute from './guards/PublicRoute';
import TeacherRoute from './guards/TeacherRoute'
import Footer from './components/misc/footer'
import { Switch, Route, Redirect } from 'react-router-dom';
import { withAuthConsumer } from './contexts/AuthStore';
import CssBaseline from '@material-ui/core/CssBaseline';
import UnityForm from './components/forms/Unity/UnityForm'
import Unity from './scenes/Unity'
function App(props) {
  return (
    <React.Fragment>
      <CssBaseline />
        {props.isAuthenticated() && <Navbar />}
        <Switch>
          <Route exact path="/home" component={Search} />
          {/* <Route exact path="/search" component={Search} /> */}
          <PublicRoute exact path="/sign-in" component={Login} />
          <PublicRoute exact path="/sign-up" component={Register} />
          {/* //* ClassRoom Routes.  */}
          {/* <TeacherRoute exact path="/ " component={ClassRoom} />  */}
          <PrivateRoute exact path="/class" component={ClassRoom} />  {/* //* Show a Detail ClassRoom */}
          <TeacherRoute exact path="/class/add" component={ClassRoomCRUD} />  {/* //* Show all */}
          <PrivateRoute exact path="/class/:id/" component={ClassRoom} />  {/* //* Show a Detail ClassRoom */}
          {/* //* Unity Routes.  */}
          <TeacherRoute exact path="/class/:id/unity/add" component={UnityForm} />
          <TeacherRoute exact path="/class/:id/unity/:uid" component={Unity} />
          {/* <PrivateRoute exact path="/class/:cid/unity/:nid" component={Unity} /> */} 
          <Route exact path="/" component={() => (
            <Redirect to="/home" />
          )} />

        </Switch>
      {props.isAuthenticated() && <Footer />}
    </React.Fragment>
  );
}

export default withAuthConsumer(App);
