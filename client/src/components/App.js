import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

import { setCurrentAdmin, logoutAdmin } from '../actions/authActions';
import { Provider } from 'react-redux';
import store from '../store';

// layout
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';

// auth
import Landing from './pages/Landing';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';

// views
import ViewAdmins from './pages/views/ViewAdmins';

import PrivateRoute from './private-route/PrivateRoute';

import '../assets/stylesheets/App.scss';

// Check for token to keep admin logged in
if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get admin info and exp
    const decoded = jwt_decode(token);
    // Set admin and isAuthenticated
    store.dispatch(setCurrentAdmin(decoded));
    // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
        // Logout admin
        store.dispatch(logoutAdmin());

        // Redirect to login
        window.location.href = './login';
    }
}
class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App wrapper">
                        <Navbar />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <Switch>
                            <PrivateRoute exact path="/dashboard" component={Dashboard} />
                            <PrivateRoute exact path="/admins" component={ViewAdmins} />
                        </Switch>
                        <Footer />
                    </div>
                </Router>
            </Provider>
        );
    }
}
export default App;
