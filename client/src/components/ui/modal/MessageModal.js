import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import Button from '../Button';

const propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
    submitButtonText: PropTypes.string,
    cancelButtonText: PropTypes.string
};

const defaultProps = {
    submitButtonText: 'Ok',
    cancelButtonText: 'Cancel'
};

class MessageModal extends Component {
    handleKeyDown = e => {
        // escape key press
        if (e.keyCode === 27) {
            this.props.onCancel();
        }
    };

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    render() {
        return (
            <Modal onCancel={this.props.onCancel}>
                <h2 className="title">{this.props.title || 'Confirm'}</h2>
                <p className="message">{this.props.message || 'Are you sure?'}</p>
                <div className="buttons">
                    <Button
                        id="cancel"
                        onClick={this.props.onCancel}
                        content={this.props.cancelButtonText}
                        kind="tertiary"
                        width="8em"
                    />
                    <Button
                        id="confirm"
                        onClick={this.props.onSubmit}
                        content={this.props.submitButtonText}
                        kind="tertiary"
                        width="8em"
                        data-autofocus
                    />
                </div>
            </Modal>
        );
    }
}

MessageModal.propTypes = propTypes;
MessageModal.defaultProps = defaultProps;
export default MessageModal;
