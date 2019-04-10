import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import ServiceActions from '../../../actions/serviceActions';
import List from '../../ui/List';

const propTypes = {
    memberId: PropTypes.string
};

export class ServiceList extends Component {
    componentDidMount() {
        this.props.serviceActions.filter({ memberId: this.props.memberId });
    }

    render() {
        return (
            <List
                data={_.map(this.props.services, service => ({
                    main: service.name,
                    secondary: service.details,
                    key: service._id
                }))}
                name="Services"
                loading={this.props.loading}
            />
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        errors: state.services.errors,
        services: _.get(state.services, 'all'),
        loading: state.services.loading
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        serviceActions: bindActionCreators(ServiceActions, dispatch)
    };
};

ServiceList.propTypes = propTypes;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ServiceList);
