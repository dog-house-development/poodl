import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import ServiceActions from '../../../actions/serviceActions';
import serviceInputs from './serviceInputs';
import DynamicForm from '../../ui/DynamicForm';

const propTypes = {
    memberId: PropTypes.string
};

export class AddService extends Component {
    constructor(props) {
        super(props);
        this.state = {
            memberId: props.memberId,
            seniorCenterId: props.adminSeniorCenterId
        };
    }

    componentDidMount() {
        this.props.serviceActions.filter();
    }

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        this.props.serviceActions.create(this.state, null, this.onSuccess);
    };

    onSuccess = () => {
        this.setState({ name: '', details: '' });
    };

    render() {
        return (
            <div className="panel add-service-panel">
                <h1 className="panel-title">Add Service</h1>
                <DynamicForm
                    inputs={serviceInputs}
                    onChange={this.handleChange}
                    onSubmit={this.onSubmit}
                    submitButtonLabel="Add"
                    errors={this.props.errors}
                    values={this.state}
                    data={{ name: this.props.services }}
                />
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        adminSeniorCenterId: _.get(state.auth.admin, 'seniorCenterId'),
        errors: state.services.errors,
        services: _.get(state.services, 'all')
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        serviceActions: bindActionCreators(ServiceActions, dispatch)
    };
};

AddService.propTypes = propTypes;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddService);
