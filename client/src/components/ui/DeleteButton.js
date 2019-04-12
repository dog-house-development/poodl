import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const propTypes = {
    onConfirm: PropTypes.func.isRequired,
    confirmQuestion: PropTypes.string.isRequired
};

export class DeleteButton extends Component {
    handleClick = () => {
        const shouldDelete = window.confirm(this.props.confirmQuestion);
        if (shouldDelete) {
            this.props.onConfirm();
        }
    };

    render() {
        return (
            <Button onClick={this.handleClick} size="small" className="delete-button">
                <i className="material-icons button-icon">remove_circle_outline</i>
                {this.props.children}
            </Button>
        );
    }
}

DeleteButton.propTypes = propTypes;
export default DeleteButton;
