import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import './styles/app.scss';
import { store, persistor } from './redux/store';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Nav from './containers/Nav';
import Register from './pages/Register';

// optional cofiguration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <AlertProvider template={AlertTemplate} {...options}>
            <Router>
              <Nav />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login-register" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/dashboard" component={Dashboard} />
              </Switch>
            </Router>
          </AlertProvider>
        </div>
      </PersistGate>
    </Provider>
  );
}
