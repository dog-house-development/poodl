import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';

import Loading from './Loading';
import Field from './Field';
import Utils from '../../utils/Utils';

const propTypes = {
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool,
    onRowClick: PropTypes.func,
    includeFilterControls: PropTypes.bool,
    noDataMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

const defaultProps = {
    loading: false,
    includeFilterControls: true,
    noDataMessage: 'There is no data to display'
};

export class DataGrid extends Component {
    constructor(props) {
        super(props);
        const query = Utils.getUrlParameter('query', props.location.search);
        this.state = { filterValue: query, filteredData: props.data };
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
                    placeholder="Search"
                    autoComplete="off"
                    clearable
                    leftIcon="search"
                />
            );
        }
    }

    getFilteredData = () => Utils.searchCollection(this.state.filterValue, this.props.data);

    getSortedData() {
        return _.sortBy(this.getFilteredData(), this.props.sortBy);
    }

    getData() {
        return this.props.sortBy ? this.getSortedData() : this.getFilteredData();
    }

    getBodyMarkup = () => {
        const data = this.getData();
        if (_.isEmpty(data)) {
            return (
                <tr className="no-data-row">
                    <td>
                        <p className="no-data">{this.props.noDataMessage}</p>
                    </td>
                </tr>
            );
        }
        return _.map(data, row => (
            <tr
                className={this.props.onRowClick ? '' : 'no-click'}
                key={row.key}
                onClick={e => (this.props.onRowClick ? this.props.onRowClick(e, row.key) : null)}>
                {_.map(row, (value, key) => (key !== 'key' ? <td key={key}>{value}</td> : null))}
            </tr>
        ));
    };

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
export default withRouter(DataGrid);
