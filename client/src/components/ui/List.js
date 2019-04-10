import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Loading from './Loading';

const propTypes = {
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool,
    onRowClick: PropTypes.func,
    name: PropTypes.string
};

const defaultProps = {
    loading: false
};

class List extends Component {
    getHeaderMarkup = () => <div className="list-header">{this.props.name}</div>;

    getBodyMarkup = () =>
        _.map(this.props.data, row => (
            <div key={row.key} onClick={this.props.onRowClick} className="list-row">
                <h4 className="list-row-main-text">{row.main}</h4>
                <p className="list-row-secondary-text">{row.secondary}</p>
            </div>
        ));

    render() {
        if (this.props.loading) {
            return <Loading />;
        }
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
