import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import SpendingPage from "./pages/Spending";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

import Facebook from './components/Facebook';

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Facebook} />
        <Route exact path="/spending" component={SpendingPage} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);


export default App;
