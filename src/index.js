import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthStore } from './contexts/AuthStore';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Router>
    <AuthStore>
      <App />
    </AuthStore>
  </Router>
, document.getElementById('root'));