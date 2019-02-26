import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GoHome from '../ui/GoHome';

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <ul>
                    <li>
                        <GoHome className="footer-link" buttonOrLink='link' kind="tertiary" />
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
