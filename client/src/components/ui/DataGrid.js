import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    columnNames: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired
};

class DataGrid extends Component {
    getHeaderMarkup() {
        return this.props.columnNames.map(columnName => {
            return <th key={columnName}>{columnName}</th>;
        });
    }
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
                <thead>
                    <tr>{this.getHeaderMarkup()}</tr>
                </thead>
                <tbody>{this.getTableMarkup()}</tbody>
            </table>
        );
    }
}

DataGrid.propTypes = propTypes;
export default DataGrid;
