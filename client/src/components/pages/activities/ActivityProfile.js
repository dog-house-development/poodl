import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import ActivityActions from '../../../actions/activityActions';
import Loading from '../../ui/Loading';
import { Link } from 'react-router-dom';
import activityFields, { Categories } from './activityFields';
import EditableProfile from '../../ui/EditableProfile';

export class ActivityProfile extends Component {
    render() {
        return (
            <div className="view-all-container">
                <Link to="/activities" className="button small tertiary">
                    <i className="material-icons">keyboard_backspace</i> Back to all activities
                </Link>
                <div>
                    <h1>
                        {this.props.loading ? <Loading /> : _.get(this.props.activity, 'firstName')}{' '}
                        {this.props.loading ? '' : _.get(this.props.activity, 'lastName')}
                    </h1>
                    <EditableProfile
                        fields={activityFields}
                        categories={Categories}
                        editProfile={this.props.activityActions.edit}
                        getProfile={this.props.activityActions.get}
                        profile={this.props.activity}
<<<<<<< HEAD
                        data={this.props.activities}
                        date={this.props.startDate}
=======
>>>>>>> 1a8a06319a7ce4005c4bf74569cda3ad265064fe
                    />
                </div>
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        activity: state.activities.all[props.match.params.id],
        loading: state.activities.loading,
<<<<<<< HEAD
        errors: state.activities.errors,
        activities: _.get(state.activities, 'all')
=======
        errors: state.activities.errors
>>>>>>> 1a8a06319a7ce4005c4bf74569cda3ad265064fe
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        activityActions: bindActionCreators(ActivityActions, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ActivityProfile);
