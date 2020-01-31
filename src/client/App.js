import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {
  BrowserRouter as Router, Switch, Route
} from 'react-router-dom';
import { store, persistor } from './redux/store';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Nav from './containers/Nav';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <Router>
            <Nav />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/dashboard" component={Dashboard}>
                <Dashboard />
              </Route>
            </Switch>
          </Router>
        </div>
      </PersistGate>
    </Provider>
  );
}
