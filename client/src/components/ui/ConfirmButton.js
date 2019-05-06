import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MessageModal from './modal/MessageModal';

const propTypes = {
    onConfirm: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired
};

export class ConfirmButton extends Component {
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
                <MessageModal
                    title={this.props.title}
                    message={this.props.message}
                    onSubmit={this.handleConfirm}
                    onCancel={this.handleCancel}
                />
            );
        }
    }

    render() {
        return (
            <button onClick={this.handleClick} className={this.props.className}>
                {this.props.children}
                {this.getConfirmModal()}
            </button>
        );
    }
}

ConfirmButton.propTypes = propTypes;
export default ConfirmButton;
