import React from 'react';
import Search from './scenes/Search'
// import Landing from './scenes/Landing'
import Unity from './scenes/Unity'
import ClassRoom from './scenes/CLassRoom'
import Register from './components/forms/Register'
import Navbar from './components/misc/Navbar';
import PrivateRoute from './guards/PrivateRoutes';
import Unsplash from './components/Unsplash';
import Footer from './components/misc/footer'
import { Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    // flexDirection: 'column',
    minHeight: '100vh',
  },
}));
function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        {/* <Navbar /> */}
      <main className="container">
        <Switch>
          <Route exact path="/" component={Unsplash} />
          <Route exact path="/login" component={Register} />
          <Route exact path="/search" component={Search} />
          <PrivateRoute exact path="/class" component={ClassRoom} />
          <PrivateRoute exact path="/class/:cid/unity/:nid" component={Unity} />
        </Switch>
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
