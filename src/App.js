import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Main from './components/Main';
import Documentation from './components/Documentation';
function App() {
  return (
    <BrowserRouter>
      {/* switch allows switching which components render.  */}
      <Switch>
        {/* route allows you to render by url path */}
        <Route exact path="/" component={Main} />
        <Route exact path="/documentation" component={Documentation}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
