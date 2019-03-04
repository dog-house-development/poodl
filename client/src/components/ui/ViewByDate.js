import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Loading from './Loading';

const propTypes = {
    data: PropTypes.array, //.isRequired,
    loading: PropTypes.bool
};

const defaultProps = {
    loading: false
};

const testProps = {
    currentDate: Date.now,
    data: [
        {
            title: 'Yoga',
            date: Date.now,
            capacity: 30
        },
        {
            title: 'Bingo',
            date: Date.now,
            capacity: 10
        },
        {
            title: 'Painting class',
            date: Date.now,
            capacity: 1
        }
    ]
};

class ViewByDate extends Component {
    getHeaderMarkup() {
        return (
            <div className="view-by-date-header">
                <button className="button view-by-date-header-button">back a day</button>
                <h2 className="view-by-date-header-title">Today</h2>
                <button className="button view-by-date-header-button">forward a day</button>
            </div>
        );
    }

    getTableMarkup() {
        if (this.props.loading) {
            return <Loading />;
        }
        return (
            <div className="view-by-date-body">
                {_.map(testProps.data, row => {
                    return (
                        <div key={_.uniqueId('vbd-row-')} className="view-by-date-row">
                            <h3>{row.title}</h3>
                            <p>{row.capacity}</p>
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
