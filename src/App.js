import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import AppRoot from './components/AppRoot';
function App() {
  return (
    <BrowserRouter>
      {/* switch allows switching which components render.  */}
      <Switch>
        {/* route allows you to render by url path */}
        <Route exact path="/" component={AppRoot} />

      </Switch>
    </BrowserRouter>
  );
}

export default App;
