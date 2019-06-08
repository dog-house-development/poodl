import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import refreshToken from '../utils/RefreshToken';

import AuthActions from '../actions/authActions';
import { Provider } from 'react-redux';
import store from '../store';

// layout
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';

// auth
import Login from './pages/login/Login';

// basic
import Dashboard from './pages/dashboard/Dashboard';
import Landing from './pages/Landing';
import PageNotFound from './pages/PageNotFound';

// Admin pages
import ViewAllAdmins from './pages/admins/ViewAllAdmins';
import AdminProfile from './pages/admins/AdminProfile';
import RegisterAdmin from './pages/admins/RegisterAdmin';

// Volunteer pages
import ViewAllVolunteers from './pages/volunteers/ViewAllVolunteers';
import VolunteerProfile from './pages/volunteers/VolunteerProfile';
import RegisterVolunteer from './pages/volunteers/RegisterVolunteer';

// Member pages
import ViewAllMembers from './pages/members/ViewAllMembers';
import MemberProfile from './pages/members/MemberProfile';
import RegisterMember from './pages/members/RegisterMember';

// Activity pages
import AddActivity from './pages/activities/AddActivity';
import ViewAllActivities from './pages/activities/ViewAllActivities';
import ViewActivity from './pages/activities/ViewActivity';

// Service pages
import ViewService from './pages/services/ViewService';

// check in
import MemberCheckIn from './pages/members/memberCheckIn/MemberCheckIn';

// Reports
import Reports from './pages/reports/Reports';

import PrivateRoute from './private-route/PrivateRoute';

import '../assets/stylesheets/App.scss';

class App extends Component {
    constructor(props) {
        super(props);
        this.findExistingToken();
        refreshToken();
        console.log('constructor');
    }

    findExistingToken() {
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
            } else {
                store.dispatch(AuthActions.refreshToken());
            }
        }
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App wrapper">
                        <Navbar />
                        <Switch>
                            <Route exact path="/" component={Landing} />
                            <Route exact path="/login" component={Login} />
                            <PrivateRoute exact path="/dashboard" component={Dashboard} />
                            {/* Admin pages */}
                            <PrivateRoute exact path="/admins" component={ViewAllAdmins} restrictAccess="Volunteer" />
                            <PrivateRoute
                                exact
                                path="/admins/register"
                                component={RegisterAdmin}
                                restrictAccess="Volunteer"
                            />
                            <PrivateRoute
                                exact
                                path="/admins/:id"
                                component={AdminProfile}
                                restrictAccess="Volunteer"
                            />
                            {/* Volunteer pages */}
                            <PrivateRoute
                                exact
                                path="/volunteers"
                                component={ViewAllVolunteers}
                                restrictAccess="Volunteer"
                            />
                            <PrivateRoute
                                exact
                                path="/volunteers/register"
                                component={RegisterVolunteer}
                                restrictAccess="Volunteer"
                            />
                            <PrivateRoute
                                exact
                                path="/volunteers/:id"
                                component={VolunteerProfile}
                                restrictAccess="Volunteer"
                            />
                            {/* Member pages */}
                            <PrivateRoute exact path="/members" component={ViewAllMembers} />
                            <PrivateRoute exact path="/members/register" component={RegisterMember} />
                            <PrivateRoute exact path="/members/:id" component={MemberProfile} />
                            {/* Activity pages */}
                            <PrivateRoute exact path="/activities" component={ViewAllActivities} />
                            <PrivateRoute exact path="/activities/add" component={AddActivity} />
                            <PrivateRoute exact path="/activities/:id" component={ViewActivity} />
                            {/* Service pages */}
                            <PrivateRoute exact path="/services/:id" component={ViewService} />
                            {/* Member check in */}
                            <PrivateRoute exact path="/member-check-in" component={MemberCheckIn} />
                            {/* Reports */}
                            <PrivateRoute exact path="/reports" component={Reports} />
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
