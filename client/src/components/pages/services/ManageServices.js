import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddService from '../services/AddService';
import ServiceList from '../services/ServiceList';

const propTypes = {
    memberId: PropTypes.string,
    data: PropTypes.object
};

export class ManageServices extends Component {
    render() {
        return (
            <div className="panel manage-services-panel">
                <div className="connecting-line" />
                <ServiceList memberId={this.props.memberId} />
                <AddService services={this.props.data} memberId={this.props.memberId} />
            </div>
        );
    }
}

ManageServices.propTypes = propTypes;
export default ManageServices;
