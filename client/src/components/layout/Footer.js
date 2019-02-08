import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <ul>
                    <li>
                        <Link to="/" className="link tertiary footer-link">
                            Home
                        </Link>
                    </li>
                    <li>
                        <a
                            href="https://github.com/dog-house-development/poodl/"
                            className="link tertiary footer-link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://github.com/dog-house-development/poodl/wiki/User-Documentation"
                            className="link tertiary footer-link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            User Documentation
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Footer;
