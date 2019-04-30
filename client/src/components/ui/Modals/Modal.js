import React, { Component } from 'react';
import FocusLock from 'react-focus-lock';
import ModalWrapper from './ModalWrapper';

class Modal extends Component {
    render() {
        return (
            <ModalWrapper>
                <FocusLock>
                    <div className="modal">{this.props.children}</div>
                </FocusLock>
            </ModalWrapper>
        );
    }
}

export default Modal;
