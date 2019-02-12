import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    kind: PropTypes.oneOf(['primary', 'secondary']),
    content: PropTypes.string
};

const defaultProps = {
    size: 'medium',
    kind: 'primary',
    content: 'Loading...'
};

class Loading extends Component {
    render() {
        return (
            <div className="loading-container">
                <div className={`loading ${this.props.size} ${this.props.kind}`}>
                    <div />
                </div>
                <p>{this.props.content}</p>
            </div>
        );
    }
}

Loading.propTypes = propTypes;
Loading.defaultProps = defaultProps;
export default Loading;
