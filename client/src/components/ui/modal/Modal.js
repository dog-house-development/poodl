import React, { Component } from 'react';
import FocusLock from 'react-focus-lock';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const propTypes = {
    onCancel: PropTypes.func
};

const modalRoot = document.getElementById('modal-root');

class Modal extends Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }

    componentDidMount() {
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }

    handleCancelClick = e => {
        e.stopPropagation();
        this.props.onCancel();
    };

    render() {
        return ReactDOM.createPortal(
            <FocusLock>
                <div id="modal" className="modal-wrapper" onClick={this.handleCancelClick}>
                    <div id="modal" className="modal" onClick={e => e.stopPropagation()}>
                        {this.props.children}
                    </div>
                </div>
            </FocusLock>,
            this.el
        );
    }
}

Modal.propTypes = propTypes;
export default Modal;
