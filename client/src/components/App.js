import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ListMembersPage from './pages/ListMembersPage';
import RegisterMemberPage from './pages/RegisterMemberPage';
import '../assets/stylesheets/App.scss';

const App = (props) => (
    <Router>
        <div>
            <div className='header'>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/registermember">Register Member</Link>
                    </li>
                    <li>
                        <Link to="/listmembers">List Members</Link>
                    </li>
                </ul>
            </div>

            <Route exact path="/" component={HomePage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/registermember" component={RegisterMemberPage} />
            <Route path="/listmembers" component={ListMembersPage} />
        </div>
    </Router>
);

export default App;
