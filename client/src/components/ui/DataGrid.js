import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Loading from './Loading';

const propTypes = {
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool,
    onRowClick: PropTypes.func
};

const defaultProps = {
    loading: false
};

class DataGrid extends Component {
    getHeaderMarkup() {
        return (
            <tr>
                {_.map(_.keys(_.get(this.props, 'data[0]')), key => {
                    return key !== 'key' ? <th key={key}>{_.startCase(key)}</th> : null;
                })}
            </tr>
        );
    }

    getBodyMarkup() {
        return _.map(this.props.data, row => (
            <tr key={row.key} onClick={e => this.props.onRowClick(e, row.key)}>
                {_.map(row, (value, key) => (key !== 'key' ? <td key={key}>{value}</td> : null))}
            </tr>
        ));
    }

    getTableMarkup() {
        if (this.props.loading) {
            return <Loading />;
        }
        return (
            <table>
                <thead>{this.getHeaderMarkup()}</thead>
                <tbody>{this.getBodyMarkup()}</tbody>
            </table>
        );
    }

    render() {
        return <div className="panel datagrid">{this.getTableMarkup()}</div>;
    }
}

DataGrid.propTypes = propTypes;
DataGrid.defaultProps = defaultProps;
export default DataGrid;
