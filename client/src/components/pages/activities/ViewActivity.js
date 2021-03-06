import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import mongoose from 'mongoose';
import React, { Component } from 'react';
import _ from 'lodash';

import ActivityActions from '../../../redux/actions/activityActions';
import MemberActions from '../../../redux/actions/memberActions';
import DynamicForm from '../../ui/DynamicForm';
import activityInputs from './activityInputs';
import List from '../../ui/List';
import TabPage from './../../ui/TabPage';
import Loading from './../../ui/Loading';
import ConfirmButton from '../../ui/ConfirmButton';
import Dropdown from '../../ui/Dropdown';

const { ObjectId } = mongoose.Types;

const propTypes = {
    errors: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

const defaultProps = {
    activity: {}
};

export class ViewActivity extends Component {
    constructor(props) {
        super(props);
        this.state = this.getStateFromProps();
    }

    getMemberObjectIds() {
        return _.map(this.props.activity.members, memberId => ObjectId(memberId));
    }

    fetchMembers() {
        this.props.memberActions.filter({
            _id: {
                $in: this.getMemberObjectIds()
            }
        });
    }

    componentDidMount() {
        this.props.activityActions.get(this.props.match.params.id, _.noop, () => {
            this.props.history.push('/pageNotFound');
        });
        this.fetchMembers();
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.activity, this.props.activity)) {
            this.setState(this.getStateFromProps());
            this.fetchMembers();
        }
    }

    getStateFromProps() {
        if (this.props.activity) {
            const startTime = moment(moment(this.props.activity.startDate).format('h:mm a'), 'h:mm a');
            const endTime = moment(moment(this.props.activity.endDate).format('h:mm a'), 'h:mm a');

            return {
                date: moment(this.props.activity.startDate).startOf('day'),
                name: this.props.activity.name,
                description: this.props.activity.description,
                startTime: startTime,
                endTime: endTime
            };
        }

        return {};
    }

    getErrors() {
        const errors = this.props.errors;
        if (errors.startDate) {
            errors.startTime = 'Start time must be before end time';
        }

        return errors;
    }

    getFormData() {
        return {
            name: this.props.activities
        };
    }

    editActivity = (modifiedInputs, onSuccess) => {
        const date = modifiedInputs.date || this.state.date;
        const startTime = modifiedInputs.startTime || this.state.startTime;
        const endTime = modifiedInputs.endTime || this.state.endTime;

        const startTimeDuration = moment.duration(startTime.diff(moment().startOf('day')));
        const start = date.clone().add(startTimeDuration);
        modifiedInputs.startDate = start.toISOString();

        const endTimeDuration = moment.duration(endTime.diff(moment().startOf('day')));
        const end = date.clone().add(endTimeDuration);
        modifiedInputs.endDate = end.toISOString();

        this.props.activityActions.edit(_.get(this.props.activity, '_id'), modifiedInputs, onSuccess);
    };

    getListData() {
        return _.map(this.props.members, member => ({
            main: member.firstName + ' ' + member.lastName,
            secondary: member.email,
            key: member._id
        }));
    }

    getMemberListMarkup() {
        return (
            <List
                data={this.getListData()}
                name="Signed Up Members"
                noDataMessage="There are no members signed up for this activity."
                loading={this.props.membersLoading}
                onRowClick={e => this.props.history.push(`/members/${e.target.id}`)}
            />
        );
    }

    getFormMarkup() {
        return (
            <DynamicForm
                inputs={activityInputs}
                editValues={this.editActivity}
                errors={this.getErrors()}
                values={this.state}
                loading={this.props.loading}
                data={this.getFormData()}
                editable={true}
            />
        );
    }

    getTabs() {
        return [
            {
                id: 'info',
                label: 'Info',
                icon: 'event',
                content: this.getFormMarkup()
            },
            {
                id: 'members',
                label: 'Members',
                icon: 'people',
                count: _.size(this.props.activity.members),
                content: this.getMemberListMarkup()
            }
        ];
    }

    handleDeleteClick = () => {
        this.props.activityActions.delete(this.props.match.params.id, () => this.props.history.push('/activities'));
    };

    getActivityName() {
        return this.props.loading ? <Loading content="" /> : _.get(this.props.activity, 'name');
    }

    render() {
        return (
            <div className="page-container">
                <Link to="/activities" className="button small tertiary icon">
                    <i className="material-icons button-icon">keyboard_backspace</i> Back to all activities
                </Link>
                <div className="page-header">
                    <h1>{this.getActivityName()}</h1>
                    <div className="button-list">
                        <Dropdown icon="more_vert" kind="tertiary" align="right">
                            <ConfirmButton
                                className="dropdown-content-row medium"
                                onConfirm={this.handleDeleteClick}
                                title="Confirm Delete"
                                message={`Are you sure you want to delete the activity '${this.getActivityName()}'?`}>
                                Delete Activity
                            </ConfirmButton>
                        </Dropdown>
                    </div>
                </div>
                <TabPage tabs={this.getTabs()} startingTab="info" />
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        errors: state.activities.errors,
        loading: state.activities.loading,
        activities: _.get(state.activities, 'all'),
        activity: state.activities.all[props.match.params.id],
        members: _.get(state.members, 'all'),
        membersLoading: state.members.loading
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        activityActions: bindActionCreators(ActivityActions, dispatch),
        memberActions: bindActionCreators(MemberActions, dispatch)
    };
};

ViewActivity.propTypes = propTypes;
ViewActivity.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewActivity);
