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
    cancelButtonText: PropTypes.string,
    focusSubmit: PropTypes.bool
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

    getTitleMarkup() {
        if (this.props.title) {
            return <h2 className="title">{this.props.title}</h2>;
        }
    }

    getMessageMarkup() {
        if (this.props.message) {
            return <p className="message">{this.props.message}</p>;
        }
    }

    render() {
        return (
            <Modal onCancel={this.props.onCancel}>
                {this.getTitleMarkup()}
                {this.getMessageMarkup()}
                <div className="buttons">
                    <Button
                        id="cancel"
                        onClick={this.props.onCancel}
                        content={this.props.cancelButtonText}
                        kind="tertiary"
                        width="8em"
                        data-autofocus={!this.props.focusSubmit}
                    />
                    <Button
                        id="submit"
                        onClick={this.props.onSubmit}
                        content={this.props.submitButtonText}
                        kind="tertiary"
                        width="8em"
                        data-autofocus={this.props.focusSubmit}
                    />
                </div>
            </Modal>
        );
    }
}

MessageModal.propTypes = propTypes;
MessageModal.defaultProps = defaultProps;
export default MessageModal;
