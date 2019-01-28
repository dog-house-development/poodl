import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CommentBox from '../CommentBox';
import AboutPage from './pages/AboutPage';
import '../assets/stylesheets/App.scss';
import Button from './Button';

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
                </ul>
            </div>

            <Route exact path="/" component={CommentBox} />
            <Route path="/about" component={AboutPage} />
        </div>
    </Router>
);

export default App;
