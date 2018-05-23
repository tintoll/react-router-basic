import React, { Component } from 'react';
import { Home, About } from 'pages';
import { Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
        <Switch>
          <Route path="/about/:name" component={About} />
          <Route path="/about" component={About} />
        </Switch>
      </div>
    );
  }
}

export default App;
