import React from 'react';
import Search from './scenes/Search'
// import Landing from './scenes/Landing'
import Unity from './scenes/Unity'
import ClassRoom from './scenes/CLassRoom'
import Register from './scenes/RegisterPage'
import Login from './scenes/LoginPage'
// import Navbar from './components/misc/Navbar';
import PrivateRoute from './guards/PrivateRoutes';
import PublicRoute from './guards/PublicRoute';
import Unsplash from './components/Unsplash';
// import Footer from './components/misc/footer'
import { Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { withAuthConsumer } from './contexts/AuthStore';
// import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    // flexDirection: 'column',
    minHeight: '100vh',
  },
}));
function App(props) {
  const classes = useStyles();
  // const container = props.isAuthenticated() ? 'container' : ''
  return (
    <div className={classes.root}>
        {/* <Navbar /> */}
        <Switch>
          <Route exact path="/" component={Unsplash} />
          <Route exact path="/search" component={Search} />
          <PublicRoute exact path="/sign-in" component={Login} />
          <PublicRoute exact path="/sign-up" component={Register} />
          <PrivateRoute exact path="/class" component={ClassRoom} />
          <PrivateRoute exact path="/class/:cid/unity/:nid" component={Unity} />
        </Switch>
      {/* <Footer /> */}
    </div>
  );
}

export default withAuthConsumer(App);
