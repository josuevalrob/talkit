import React from 'react';
import Search from './scenes/Search'
import Landing from './scenes/Landing'
import Unity from './scenes/Unity'
import ClassRoom from './scenes/CLassRoom'
import Login from './components/forms/Login'
import Navbar from './components/misc/Navbar';
import PrivateRoute from './guards/PrivateRoutes';

import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Navbar />
      <main className="container">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/search" component={Search} />
          <PrivateRoute exact path="/class" component={ClassRoom} />
          <PrivateRoute exact path="/class/:cid/unity/:nid" component={Unity} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
