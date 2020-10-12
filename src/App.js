import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from './components/Home';
function App() {
  return (
    <BrowserRouter>
      {/* switch allows switching which components render.  */}
      <Switch>
        {/* route allows you to render by url path */}
        <Route exact path="/" component={Home} />

      </Switch>
    </BrowserRouter>
  );
}

export default App;
