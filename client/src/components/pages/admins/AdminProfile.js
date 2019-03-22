import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchAdmin } from '../../../actions/adminActions';
import Loading from '../../ui/Loading';
import { Link } from 'react-router-dom';
import moment from 'moment';

export class AdminProfile extends Component {
    constructor(props) {
        super(props);
        this.routeParam = props.match.params.id;
    }

    componentDidMount() {
        // call redux action to retrieve specified admin from api
        this.props.getAdmin(this.routeParam);
    }

    getPageMarkup() {
        if (this.props.loading) {
            return <Loading content="Loading admin info..." />;
        } else {
            return (
                <div>
                    <h1>
                        {_.get(this.props.admin, 'firstName')} {_.get(this.props.admin, 'lastName')}
                    </h1>
                    <div className="panel">
                        {_.map(_.toPairs(this.props.admin), pair => {
                            if (pair[0] === 'password' || pair[0] === '__v') {
                                return;
                            }
                            if (pair[0] === 'superAdmin') {
                                pair[1] = _.get(this.props.admin, 'superAdmin') ? 'Yes' : 'No';
                            }
                            if (pair[0] === 'date' || pair[0] === 'createdAt' || pair[0] === 'updatedAt') {
                                pair[1] = moment(pair[1]).format('MMMM Do, YYYY, h:mm:ss a');
                            }
                            return (
                                <div key={pair[0]} style={{ margin: '10px 0' }}>
                                    <h5>{_.upperCase(pair[0])}</h5>
                                    <p>{pair[1]}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="view-all-container">
                <Link to="/admins" className="button small tertiary">
                    <i className="material-icons">keyboard_backspace</i> Back to all admins
                </Link>
                {this.getPageMarkup()}
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        admin: state.admins.one,
        currentAdminIsSuper: _.get(state.auth.admin, 'superAdmin'),
        errors: state.errors
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        getAdmin: id => dispatch(fetchAdmin(id))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminProfile);
