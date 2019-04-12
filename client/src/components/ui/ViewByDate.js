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
    errors: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    noDataMessage: PropTypes.string
};

const defaultProps = {
    loading: false,
    includeAttendance: true,
    noDataMessage: 'Nothing found for this date'
};

class ViewByDate extends Component {
    constructor(props) {
        super(props);
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
                    onClick={() => this.props.requestDate(currentDate.subtract(1, 'days'))}>
                    <span>
                        <i className="material-icons view-by-date-header-button-arrow">keyboard_arrow_left</i>
                        {currentDate
                            .clone()
                            .subtract(1, 'days')
                            .format('dddd')}
                    </span>
                </button>
                <div className="view-by-date-header-title">
                    <h2 className="view-by-date-title-main">
                        {currentDate.format('MMM Do, YYYY') === moment().format('MMM Do, YYYY')
                            ? 'Today'
                            : currentDate.format('dddd')}
                        {this.props.loading ? (
                            <div className="vbd-title-loading">
                                <Loading content="" size="small" kind="secondary" />
                            </div>
                        ) : (
                            ''
                        )}
                    </h2>
                    <p className="view-by-date-title-secondary">{currentDate.format('MMMM Do, YYYY')}</p>
                </div>
                <button
                    className="button view-by-date-header-button"
                    onClick={() => this.props.requestDate(currentDate.add(1, 'days'))}>
                    <span>
                        {currentDate
                            .clone()
                            .add(1, 'days')
                            .format('dddd')}
                        <i className="material-icons view-by-date-header-button-arrow">keyboard_arrow_right</i>
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
            return;
        } else if (!_.isEmpty(this.props.errors)) {
            return <p className="vbd-error-message">Error time</p>;
        } else if (_.isEmpty(this.props.dateData.data)) {
            return <p className="vbd-no-data-message">{this.props.noDataMessage}</p>;
        }
        return (
            <div className="view-by-date-body">
                {_.map(_.get(this.props.dateData, 'data'), row => {
                    return (
                        <div
                            key={row._id}
                            className="view-by-date-row"
                            onClick={evt => this.handleRowClick(evt, row._id)}>
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
