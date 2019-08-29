import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Dashboard from './Components/Dashboard'
import ImportExcel from './Components/ImportExcel'
import Login from './Components/Login'

function App() {
  return (
      <Router>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/importExcel" component={ImportExcel} />
          <Route exact path="/" component={Login} />
      </Router>
  );
}

export default App;
