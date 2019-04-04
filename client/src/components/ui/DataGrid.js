import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Loading from './Loading';
import Field from './Field';

const propTypes = {
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool,
    onRowClick: PropTypes.func,
    includeFilterControls: PropTypes.bool
};

const defaultProps = {
    loading: false,
    includeFilterControls: true
};

class DataGrid extends Component {
    constructor(props) {
        super(props);
        this.state = { filterValue: '', filteredData: props.data };
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(this.props.data, prevProps.data)) {
            this.setState({ filteredData: this.props.data });
        }
    }

    getHeaderMarkup() {
        return (
            <tr>
                {_.map(_.keys(_.get(this.props, 'data[0]')), key => {
                    return key !== 'key' ? <th key={key}>{_.startCase(key)}</th> : null;
                })}
            </tr>
        );
    }

    handleFilterChange = event => {
        event.preventDefault();
        this.setState({
            filterValue: event.target.value
        });
    };

    getFilterMarkup() {
        if (this.props.includeFilterControls) {
            return (
                <Field
                    className="filter-field"
                    kind="secondary"
                    onChange={this.handleFilterChange}
                    id="filter"
                    value={this.state.filterValue}
                    placeholder="Filter..."
                    autoComplete="off"
                />
            );
        }
    }

    getFilteredData = () =>
        _.filter(this.props.data, value => new RegExp('(' + this.state.filterValue + ')', 'i').test(_.values(value)));

    getBodyMarkup() {
        return _.map(this.getFilteredData(), row => (
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
            <div className="panel datagrid">
                <table>
                    <thead>{this.getHeaderMarkup()}</thead>
                    <tbody>{this.getBodyMarkup()}</tbody>
                </table>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.getFilterMarkup()}
                {this.getTableMarkup()}
            </div>
        );
    }
}

DataGrid.propTypes = propTypes;
DataGrid.defaultProps = defaultProps;
export default DataGrid;
