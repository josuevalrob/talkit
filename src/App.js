import React from 'react';
import Search from './scenes/Search'
// import Landing from './scenes/Landing'
import Unity from './scenes/Unity'
import ClassRoom from './scenes/CLassRoom'
import Register from './components/forms/Register'
import Navbar from './components/misc/Navbar';
import PrivateRoute from './guards/PrivateRoutes';
import Unsplash from './components/Unsplash';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Navbar />
      <main className="container">
        <Switch>
          <Route exact path="/" component={Unsplash} />
          <Route exact path="/login" component={Register} />
          <Route exact path="/search" component={Search} />
          <PrivateRoute exact path="/class" component={ClassRoom} />
          <PrivateRoute exact path="/class/:cid/unity/:nid" component={Unity} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
