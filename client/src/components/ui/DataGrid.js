import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import _ from 'lodash';

const propTypes = {
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool
};

const defaultProps = {
    loading: false
};

class DataGrid extends Component {
    // getHeaderMarkup() {
    //     return this.props.data.map(columnName => {
    //         return <th key={columnName}>{columnName}</th>;
    //     });
    // }
    getTableMarkup() {
        return this.props.data.map(row => {
            return (
                <tr key={row.key}>
                    {row.data.map(rowData => {
                        return <td key={rowData}>{rowData}</td>;
                    })}
                </tr>
            );
        });
    }
    render() {
        return (
            <table className="panel datagrid">
                <tbody>{this.getTableMarkup()}</tbody>
            </table>
        );
    }
}

DataGrid.propTypes = propTypes;
DataGrid.defaultProps = defaultProps;
export default DataGrid;
