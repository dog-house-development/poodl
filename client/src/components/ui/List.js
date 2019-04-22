import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classnames from 'classnames';

import Loading from './Loading';

const propTypes = {
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool,
    onRowClick: PropTypes.func,
    name: PropTypes.string,
    noDataMessage: PropTypes.string
};

const defaultProps = {
    loading: false
};

class List extends Component {
    getHeaderMarkup() {
        if (this.props.name) {
            return <div className="list-header">{this.props.name}</div>;
        }
    }

    getBodyMarkup = () => {
        if (this.props.loading) {
            return <Loading />;
        }
        return _.isEmpty(this.props.data) ? (
            <p className="no-data-message">{this.props.noDataMessage}</p>
        ) : (
            _.map(this.props.data, row => (
                <div
                    key={row.key}
                    id={row.key}
                    onClick={this.props.onRowClick}
                    className={classnames('list-row', this.props.onRowClick ? '' : 'no-click')}>
                    <h4 id={row.key} className="list-row-main-text">
                        {row.main}
                    </h4>
                    {row.secondary ? (
                        <p id={row.key} className="list-row-secondary-text">
                            {row.secondary}
                        </p>
                    ) : (
                        ''
                    )}
                </div>
            ))
        );
    };

    render() {
        return (
            <div className="panel list">
                {this.getHeaderMarkup()}
                <div className="list-body">{this.getBodyMarkup()}</div>
            </div>
        );
    }
}

List.propTypes = propTypes;
List.defaultProps = defaultProps;
export default List;
