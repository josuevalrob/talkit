import React from 'react';
import Search from './scenes/Search'
import Landing from './scenes/Landing'
import Unity from './scenes/Unity'
import ClassRoom from './scenes/CLassRoom'
import Navbar from './components/misc/Navbar';

import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Navbar />
      <main className="container">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/class/:cid" component={ClassRoom} />
          <Route exact path="/class/:cid/unity/:nid" component={Unity} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
