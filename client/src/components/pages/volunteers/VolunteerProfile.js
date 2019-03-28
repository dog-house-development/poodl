import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import VolunteerActions from '../../../actions/volunteerActions';
import Loading from '../../ui/Loading';
import { Link } from 'react-router-dom';

export class VolunteerProfile extends Component {
    componentDidMount() {
        this.props.volunteerActions.get(this.props.match.params.id);
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
        volunteer: state.volunteers.all[props.match.params.id],
        errors: state.volunteers.errors
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        volunteerActions: bindActionCreators(VolunteerActions, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VolunteerProfile);
