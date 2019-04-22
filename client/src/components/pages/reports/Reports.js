import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import MemberActions from '../../../actions/memberActions';
import ActivityActions from '../../../actions/activityActions';
import ServiceActions from '../../../actions/serviceActions';
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
            month: moment(moment().format(monthFormat), monthFormat)
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

    getDuplicatedActivityMembers(activityName) {
        let duplicatedMembers = [];
        _.forEach(this.getActivitiesWithName(activityName), activity => {
            duplicatedMembers.push(...activity.members);
        });

        return duplicatedMembers;
    }

    getUniqueActivityMembers(activityName) {
        return _.uniq(this.getDuplicatedActivityMembers(activityName));
    }

    getDuplicatedServiceMembers(serviceName) {
        let duplicatedMembers = [];
        _.forEach(this.getServicesWithName(serviceName), service => {
            duplicatedMembers.push(service.memberId);
        });

        return duplicatedMembers;
    }

    getUniqueServiceMembers(serviceName) {
        return _.uniq(this.getDuplicatedServiceMembers(serviceName));
    }

    getTotalSignups(activityName) {
        return _.filter(this.props.activities, { name: activityName });
    }

    getActivityData = activityName => {
        return {
            activityName: activityName,
            totalActivities: this.getActivitiesWithName(activityName).length,
            uniqueMembers: this.getUniqueActivityMembers(activityName).length,
            memberSignups: this.getDuplicatedActivityMembers(activityName).length,
            key: activityName
        };
    };

    getServiceData = serviceName => {
        return {
            serviceName: serviceName,
            totalServices: this.getServicesWithName(serviceName).length,
            totalMembers: this.getUniqueServiceMembers(serviceName).length,
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
                <h2>Activity Reports</h2>
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
        return (
            <>
                <h2>Service Reports</h2>
                {this.getServicesDataGrid()}
            </>
        );
    }

    getMembersTab() {
        return (
            <>
                <h2>Member Reports</h2>
                {this.getMembersReports()}
            </>
        );
    }

    getTabs() {
        return [
            {
                id: 'activities',
                label: 'Activities',
                icon: 'event',
                content: this.getActivitiesTab()
            },
            {
                id: 'services',
                label: 'Services',
                icon: 'list_alt',
                content: this.getServicesTab()
            },
            {
                id: 'members',
                label: 'Members',
                icon: 'people',
                content: this.props.loading ? <Loading /> : this.getMembersTab()
            }
        ];
    }

    render() {
        return (
            <div className="reports-container page-container">
                <Link to="/" className="button small tertiary icon">
                    <i className="material-icons button-icon">keyboard_backspace</i> Back to home
                </Link>
                <h1>Reports</h1>
                <TabPage tabs={this.getTabs()} startingTab="activities" />
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        adminSeniorCenterId: _.get(state.auth.admin, 'seniorCenterId'),
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
