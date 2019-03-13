import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

import Loading from './Loading';

const propTypes = {
    dateData: PropTypes.object.isRequired,
    requestDate: PropTypes.func,
    loading: PropTypes.bool,
    includeAttendance: PropTypes.bool,
    clickableRowRoute: PropTypes.string,
    errors: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

const defaultProps = {
    loading: false,
    includeAttendance: true
};

const DAY_LENGTH = 86400000;

class ViewByDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeLength: 'day'
        };
        this.handleRowClick = this.handleRowClick.bind(this);
    }

    handleRowClick(evt, id) {
        evt.preventDefault();
        if (this.props.clickableRowRoute) {
            this.props.history.push(this.props.clickableRowRoute + id);
        }
    }

    getHeaderMarkup() {
        const currentDate = _.get(this.props.dateData, 'date');
        return (
            <div className="view-by-date-header">
                <button
                    className="button view-by-date-header-button"
                    onClick={() => this.props.requestDate(currentDate - DAY_LENGTH)}
                >
                    <span>
                        <i className="material-icons">keyboard_arrow_left</i>
                        {moment(currentDate - DAY_LENGTH).format('dddd')}
                    </span>
                </button>
                <div className="view-by-date-header-title">
                    <h2 className="view-by-date-title-main">
                        {moment(currentDate).format('MMM Do, YYYY') === moment(Date.now()).format('MMM Do, YYYY')
                            ? 'Today'
                            : moment(currentDate).format('dddd')}
                    </h2>
                    <p className="view-by-date-title-secondary">{moment(currentDate).format('MMM Do, YYYY')}</p>
                </div>
                <button
                    className="button view-by-date-header-button"
                    onClick={() => this.props.requestDate(currentDate + DAY_LENGTH)}
                >
                    <span>
                        {moment(currentDate + DAY_LENGTH).format('dddd')}
                        <i className="material-icons">keyboard_arrow_right</i>
                    </span>
                </button>
            </div>
        );
    }

    getAttendanceMarkup(row) {
        if (this.props.includeAttendance) {
            return (
                <p className="vbd-row-attendance">
                    {_.size(row.members) + (row.maxCapacity ? '/' + row.maxCapacity : null)}
                    <i className="material-icons vbd-row-attendance-icon">person</i>
                </p>
            );
        }
    }

    getDateMarkup(row) {
        const startDate = new Date(row.startDate);
        const endDate = new Date(row.endDate);
        if (moment(startDate).format('MM/DD/YYYY') === moment(endDate).format('MM/DD/YYYY')) {
            return (
                <p className="vbd-row-time">
                    {moment(startDate).format('h:mma')} - {moment(endDate).format('h:mma')}
                </p>
            );
        }
        return (
            <p className="vbd-row-time">
                {moment(startDate).format('h:mma M/D/YY')} - {moment(endDate).format('h:mma M/D/YY')}
            </p>
        );
    }

    getTableMarkup() {
        if (this.props.loading) {
            return <Loading />;
        } else if (!_.isEmpty(this.props.errors)) {
            return <p>Error time</p>;
        }
        return (
            <div className="view-by-date-body">
                {_.map(_.get(this.props.dateData, 'data'), row => {
                    return (
                        <div
                            key={row._id}
                            className="view-by-date-row"
                            onClick={evt => this.handleRowClick(evt, row._id)}
                        >
                            <h3 className="vbd-row-title">{row.name}</h3>
                            {this.getDateMarkup(row)}
                            {this.getAttendanceMarkup(row)}
                        </div>
                    );
                })}
            </div>
        );
    }

    render() {
        return (
            <div className="panel view-by-date">
                {this.getHeaderMarkup()}
                {this.getTableMarkup()}
            </div>
        );
    }
}

ViewByDate.propTypes = propTypes;
ViewByDate.defaultProps = defaultProps;
export default withRouter(ViewByDate);
