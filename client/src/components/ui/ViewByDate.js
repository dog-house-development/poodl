import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';

import Loading from './Loading';

const propTypes = {
    dateData: PropTypes.object.isRequired,
    requestDate: PropTypes.func,
    loading: PropTypes.bool
};

const defaultProps = {
    loading: false
};

const DAY_LENGTH = 86400000;

class ViewByDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeLength: 'day'
        };
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
                <div>
                    <h2 className="view-by-date-header-title">
                        {moment(currentDate).format('MMM Do, YYYY') === moment(Date.now()).format('MMM Do, YYYY')
                            ? 'Today'
                            : moment(currentDate).format('dddd')}
                    </h2>
                    <p>{moment(currentDate).format('MMM Do, YYYY')}</p>
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

    getTableMarkup() {
        if (this.props.loading) {
            return <Loading />;
        }
        return (
            <div className="view-by-date-body">
                {_.map(_.get(this.props.dateData, 'data'), row => {
                    return (
                        <div key={_.uniqueId('vbd-row-')} className="view-by-date-row">
                            <h3>{row.name}</h3>
                            <p>{moment(row.time).format('h:mma')}</p>
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
export default ViewByDate;
