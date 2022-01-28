import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Switch>
              <Route path="/register" exact component={Register} />
              <Route path="/login" exact component={Login} />
              <Route path="/" exact component={Home} />
            </Switch>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
