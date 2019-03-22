import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

import AuthActions from '../actions/authActions';
import { Provider } from 'react-redux';
import store from '../store';

// layout
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';

// auth
import Register from './pages/admins/Register';
import Login from './pages/login/Login';

// basic
import Dashboard from './pages/dashboard/Dashboard';
import Landing from './pages/Landing';
import PageNotFound from './pages/PageNotFound';

// view all pages
import ViewAllAdmins from './pages/admins/ViewAllAdmins';
import ViewAllVolunteers from './pages/admins/ViewAllVolunteers';
import ViewAllMembers from './pages/members/ViewAllMembers';

// profile pages
import AdminProfile from './pages/admins/AdminProfile';
import VolunteerProfile from './pages/admins/VolunteerProfile';
import MemberProfile from './pages/members/MemberProfile';

// activity page
import RegisterActivity from './pages/activities/AddActivity';
import ViewAllActivities from './pages/activities/ViewAllActivities';

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
    store.dispatch(AuthActions.setCurrentAdmin(decoded));
    // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
        // Logout admin
        store.dispatch(AuthActions.logoutAdmin());

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
                        <Switch>
                            <Route exact path="/" component={Landing} />
                            <Route exact path="/login" component={Login} />
                            <PrivateRoute exact path="/register" component={Register} />
                            <PrivateRoute exact path="/dashboard" component={Dashboard} />
                            {/* View all pages */}
                            <PrivateRoute exact path="/admins" component={ViewAllAdmins} />
                            <PrivateRoute exact path="/volunteers" component={ViewAllVolunteers} />
                            <PrivateRoute exact path="/members" component={ViewAllMembers} />
                            {/* Profile pages */}
                            <PrivateRoute exact path="/admins/:id" component={AdminProfile} />
                            <PrivateRoute exact path="/volunteers/:id" component={VolunteerProfile} />
                            <PrivateRoute exact path="/members/:id" component={MemberProfile} />
                            <PrivateRoute exact path="/activities" component={ViewAllActivities} />
                            <PrivateRoute exact path="/activities/add" component={RegisterActivity} />

                            {/* PageNotFound route must stay at bottom */}
                            <Route component={PageNotFound} />
                        </Switch>
                        <Footer />
                    </div>
                </Router>
            </Provider>
        );
    }
}
export default App;
