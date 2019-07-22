import React from 'react';
import Search from './scenes/Search'
import Register from './scenes/RegisterPage'
import Login from './scenes/LoginPage'
// import Navbar from './components/misc/Navbar';
import PrivateRoute from './guards/PrivateRoutes';
import PublicRoute from './guards/PublicRoute';
// import TeacherRoute from './guards/TeacherRoute'
import { Switch, Route, Redirect } from 'react-router-dom';
import { withAuthConsumer } from './contexts/AuthStore';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dashboard from './scenes/Dashboard'

function App(props) {
  return (
    <React.Fragment>
      <CssBaseline />
        {/* {props.isAuthenticated() && <Navbar />} */}
        <Switch>
          <PublicRoute exact path="/sign-in" component={Login} />
          <PublicRoute exact path="/sign-up" component={Register} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/search" component={Search} />
          <Route exact path="/" component={() => (
            <Redirect to={"/search"} />
          )} />
        </Switch>
      {/* {props.isAuthenticated() && <Footer />} */}
    </React.Fragment>
  );
}

export default withAuthConsumer(App);
