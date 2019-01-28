import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AboutPage from '../pages/AboutPage';

const Footer = (props) => (
    <div className='footer'>
        {'This is the footer'}
        <Link to="/about">About</Link>
    </div>
);

export default Footer;
