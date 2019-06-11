import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import MemberActions from '../../../redux/actions/memberActions';
import ActivityActions from '../../../redux/actions/activityActions';
import ServiceActions from '../../../redux/actions/serviceActions';
import { Link } from 'react-router-dom';
import Loading from '../../ui/Loading';
import DataGrid from '../../ui/DataGrid';
import TabPage from '../../ui/TabPage';
import List from '../../ui/List';
import MonthPicker from '../../ui/MonthPicker';
import moment from 'moment';

const monthFormat = 'MMMM YYYY';

export class Reports extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            month: moment(moment().format(monthFormat), monthFormat),
            tab: 'activities'
        };
    }

    componentDidMount() {
        this.props.activityActions.filter();
        this.props.memberActions.filter();
        this.props.serviceActions.filter();
    }

    getServicesWithName(serviceName) {
        return _.filter(this.props.services, { name: serviceName });
    }

    getActivitiesWithName(activityName) {
        return _.filter(this.props.activities, { name: activityName });
    }

    getLastDayOfMonth() {
        return this.state.month
            .clone()
            .endOf('month')
            .endOf('day');
    }

    getFirstDayOfMonth() {
        return this.state.month;
    }

    getActivitiesToDate(activityName) {
        return _.filter(this.getActivitiesWithName(activityName), activity => {
            if (moment(activity.startDate).isAfter(this.getLastDayOfMonth())) {
                return false;
            }

            return true;
        });
    }

    getActivitiesThisMonth(activityName) {
        return _.filter(this.getActivitiesToDate(activityName), activity => {
            if (moment(activity.startDate).isBefore(this.getFirstDayOfMonth())) {
                return false;
            }

            return true;
        });
    }

    getSignupsToDate(activityName) {
        let members = [];
        _.forEach(this.getActivitiesToDate(activityName), activity => {
            members.push(...activity.members);
        });

        return members;
    }

    getSignupsThisMonth(activityName) {
        let members = [];
        _.forEach(this.getActivitiesThisMonth(activityName), activity => {
            members.push(...activity.members);
        });

        return members;
    }

    getMembersToDate(activityName) {
        return _.uniq(this.getSignupsToDate(activityName));
    }

    getMembersThisMonth(activityName) {
        return _.uniq(this.getSignupsThisMonth(activityName));
    }

    getNewMembersThisMonth(activityName) {
        let previousMembers = [];
        _.forEach(this.getActivitiesWithName(activityName), activity => {
            if (moment(activity.startDate).isBefore(this.getFirstDayOfMonth())) {
                previousMembers.push(...activity.members);
            }
        });

        previousMembers = _.uniq(previousMembers);

        return _.difference(this.getMembersThisMonth(activityName), previousMembers);
    }

    getActivityData = activityName => {
        return {
            activityName: activityName,
            newMembersThisMonth: this.getNewMembersThisMonth(activityName).length,
            activitiesThisMonth: this.getActivitiesThisMonth(activityName).length,
            totalMembersThisMonth: this.getMembersThisMonth(activityName).length,
            signUpsThisMonth: this.getSignupsThisMonth(activityName).length,
            totalActivitiesToDate: this.getActivitiesToDate(activityName).length,
            totalMembersToDate: this.getMembersToDate(activityName).length,
            totalSignUpsToDate: this.getSignupsToDate(activityName).length,
            key: activityName
        };
    };

    getServiceData = serviceName => {
        return {
            serviceName: serviceName,
            totalServices: this.getServicesWithName(serviceName).length,
            key: serviceName
        };
    };

    getUniqueNames(list) {
        const uniqueData = _.uniq(_.map(list, item => item.name));
        const sortedData = _.sortBy(uniqueData, [item => item.toLowerCase()]);
        return sortedData;
    }

    getUniqueActivityNames() {
        return this.getUniqueNames(this.props.activities);
    }

    getUniqueServicesNames() {
        return this.getUniqueNames(this.props.services);
    }

    getActivitiesData() {
        return _.map(this.getUniqueActivityNames(), this.getActivityData);
    }

    getServicesData() {
        return _.map(this.getUniqueServicesNames(), this.getServiceData);
    }

    getTotalMemberCheckIns() {
        return _.reduce(
            this.props.members,
            (sum, member) => {
                return sum + member.checkIns.length;
            },
            0
        );
    }

    getTotalMembers() {
        return Object.keys(this.props.members).length;
    }

    getMembersData() {
        return [
            {
                key: 'totalMembers',
                main: 'Total Members',
                secondary: this.getTotalMembers()
            },
            {
                key: 'checkIns',
                main: 'Total Check-Ins',
                secondary: this.getTotalMemberCheckIns()
            }
        ];
    }

    getMembersReports() {
        return <List loading={this.props.loading} data={this.getMembersData()} />;
    }

    getServicesDataGrid() {
        return <DataGrid includeFilterControls={false} data={this.getServicesData()} loading={this.props.loading} />;
    }

    handleActivityRowClick = (_e, key) => {
        this.props.history.push(`/activities/?query=${key}`);
    };

    getActivitesDataGrid() {
        return (
            <DataGrid
                includeFilterControls={false}
                data={this.getActivitiesData()}
                loading={this.props.loading}
                onRowClick={this.handleActivityRowClick}
            />
        );
    }

    handleMonthChange = e => {
        this.setState({ month: e.target.value });
    };

    getActivitiesTab() {
        return (
            <>
                <MonthPicker
                    id="month"
                    value={this.state.month}
                    onChange={this.handleMonthChange}
                    label="Reporting Month"
                />
                {this.getActivitesDataGrid()}
            </>
        );
    }

    getServicesTab() {
        return <>{this.getServicesDataGrid()}</>;
    }

    getMembersTab() {
        return <>{this.getMembersReports()}</>;
    }

    getTabs() {
        return [
            {
                id: 'activities',
                label: 'Activities',
                title: 'Activity',
                icon: 'event',
                content: this.getActivitiesTab()
            },
            {
                id: 'services',
                label: 'Services',
                title: 'Service',
                icon: 'list_alt',
                content: this.getServicesTab()
            },
            {
                id: 'members',
                label: 'Members',
                title: 'Member',
                icon: 'people',
                content: this.props.loading ? <Loading /> : this.getMembersTab()
            }
        ];
    }

    handleTabChange = id => {
        this.setState({ tab: id });
    };

    getPageTitle() {
        return _.find(this.getTabs(), { id: this.state.tab }).title;
    }

    render() {
        return (
            <div className="reports-container page-container">
                <Link to="/" className="button small tertiary icon">
                    <i className="material-icons button-icon">keyboard_backspace</i> Back to home
                </Link>
                <div className="page-header">
                    <h1>
                        {this.getPageTitle()} {'Reports'}
                    </h1>
                </div>
                <TabPage tabs={this.getTabs()} startingTab="activities" onChange={this.handleTabChange} />
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        activities: _.get(state.activities, 'all'),
        members: _.get(state.members, 'all'),
        services: _.get(state.services, 'all'),
        errors: state.members.errors,
        loading: _.get(state.activities, 'loading') || _.get(state.members, 'loading')
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        memberActions: bindActionCreators(MemberActions, dispatch),
        activityActions: bindActionCreators(ActivityActions, dispatch),
        serviceActions: bindActionCreators(ServiceActions, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Reports);
