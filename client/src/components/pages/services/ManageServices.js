import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import AddService from '../services/AddService';
import ServiceList from '../services/ServiceList';

const propTypes = {
    memberId: PropTypes.string
};

export class ManageServices extends Component {
    render() {
        return (
            <div className="panel manage-services-panel">
                <ServiceList memberId={this.props.memberId} />
                <AddService memberId={this.props.memberId} />
            </div>
        );
    }
}

ManageServices.propTypes = propTypes;
export default ManageServices;
