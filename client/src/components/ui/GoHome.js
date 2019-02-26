import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import _ from 'lodash';

const propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    kind: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
    content: PropTypes.string,
    buttonOrLink: PropTypes.oneOf(['button', 'link'])
};

const defaultProps = {
    content: 'Home',
    size: 'medium',
    kind: 'primary'
};

export class GoHome extends Component {
    getClassName() {
        if (this.props.buttonOrLink) {
            return `${this.props.buttonOrLink} ${this.props.size} ${this.props.kind}`;
        }
    }

    render() {
        return (
            <Link to={this.props.isAuthenticated ? '/dashboard' : '/'} className={this.getClassName()}>
                {this.props.content}
            </Link>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        isAuthenticated: _.get(state.auth, 'isAuthenticated')
    };
};

GoHome.propTypes = propTypes;
GoHome.defaultProps = defaultProps;

export default connect(mapStateToProps)(GoHome);
