import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import List from '../../ui/List';

const propTypes = {
    memberId: PropTypes.string
};

export class ServiceList extends Component {
    render() {
        return (
            <List
                data={_.map(
                    _.filter(this.props.services, service => service.memberId === this.props.memberId),
                    service => ({
                        main: service.name,
                        secondary: service.details,
                        key: service._id
                    })
                )}
                name="Services"
                loading={this.props.loading}
                onRowClick={e => this.props.history.push(`/services/${e.target.id}`)}
                noDataMessage="No services found for this member"
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

ServiceList.propTypes = propTypes;
export default connect(mapStateToProps)(withRouter(ServiceList));
