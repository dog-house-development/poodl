import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchVolunteer } from '../../../actions/volunteerActions';
import Loading from '../../ui/Loading';
import { Link } from 'react-router-dom';

export class VolunteerProfile extends Component {
    constructor(props) {
        super(props);
        this.routeParam = props.match.params.id;
    }

    componentDidMount() {
        // call redux action to retrieve specified volunteer from api
        this.props.getVolunteer(this.routeParam);
    }

    getPageMarkup() {
        if (this.props.loading) {
            return <Loading content="Loading volunteer info..." />;
        } else {
            return (
                <h1>
                    {_.get(this.props.volunteer, 'firstName')} {_.get(this.props.volunteer, 'lastName')}
                </h1>
            );
        }
    }

    render() {
        return (
            <div className="view-all-container">
                <Link to="/volunteers" className="button small tertiary">
                    <i className="material-icons">keyboard_backspace</i> Back to all volunteers
                </Link>
                <div className="panel">{this.getPageMarkup()}</div>
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        volunteer: state.volunteers.one,
        errors: state.errors
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        getVolunteer: id => dispatch(fetchVolunteer(id))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VolunteerProfile);
