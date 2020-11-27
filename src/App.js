import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Main from './components/Main';
import Documentation from './components/Documentation';
import {Button} from './button/button';

function App() {
  return (
    <div data-testid="button">
      <Button label="click me please"/>
    <BrowserRouter>
      {/* switch allows switching which components render.  */}
      <Switch>
        {/* route allows you to render by url path */}
        <Route exact path="/" component={Main} />
        <Route exact path="/documentation" component={Documentation}/>
      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;