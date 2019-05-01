import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import ConfirmModal from './modal/ConfirmModal';

const propTypes = {
    onConfirm: PropTypes.func.isRequired,
    confirmQuestion: PropTypes.string.isRequired
};

export class DeleteButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmModalOpen: false
        };
    }

    handleClick = () => {
        this.setState({ confirmModalOpen: true });
    };

    handleCancel = () => {
        this.setState({ confirmModalOpen: false });
    };

    handleConfirm = () => {
        this.setState({ confirmModalOpen: false });
        this.props.onConfirm();
    };

    getConfirmModal() {
        if (this.state.confirmModalOpen) {
            return (
                <ConfirmModal
                    title="Confirm Delete"
                    message={this.props.confirmQuestion}
                    onConfirm={this.handleConfirm}
                    onCancel={this.handleCancel}
                />
            );
        }
    }

    render() {
        return (
            <Button onClick={this.handleClick} size="small" className="delete-button" icon="remove_circle_outline">
                {this.props.children}
                {this.getConfirmModal()}
            </Button>
        );
    }
}

DeleteButton.propTypes = propTypes;
export default DeleteButton;
