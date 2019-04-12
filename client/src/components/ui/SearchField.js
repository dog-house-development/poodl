import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import onClickOutside from 'react-onclickoutside';
import Field from './Field';

const propTypes = {
    name: PropTypes.string,
    id: PropTypes.string.isRequired,
    size: PropTypes.oneOf(['normal', 'large']),
    content: PropTypes.string,
    placeholder: PropTypes.string,
    searchRule: PropTypes.func.isRequired,
    displayRow: PropTypes.func,
    onSearchResultClick: PropTypes.func.isRequired,
    autoFocus: PropTypes.oneOf(['on', 'off']),
    data: PropTypes.object
};

const defaultProps = {
    size: 'normal',
    autoFocus: 'off'
};

class SearchField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchParam: '',
            filteredData: this.props.data,
            resultsOpen: false
        };

        this.handleFieldClick = this.handleFieldClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSearchResultClick = this.onSearchResultClick.bind(this);
    }

    handleClickOutside = evt => {
        if (this.state.resultsOpen) {
            this.setState({ resultsOpen: false });
        }
    };

    handleFieldClick(e) {
        e.preventDefault();
        this.setState({ resultsOpen: true });
    }

    handleChange(e) {
        this.setState({ searchParam: e.target.value, resultsOpen: true });
        this.searchData(e.target.value);
    }

    onSearchResultClick(e) {
        e.preventDefault();
        this.setState({ resultsOpen: false });
        this.props.onSearchResultClick(e);
    }

    searchData(param) {
        this.setState({ filteredData: _.filter(this.props.data, value => this.props.searchRule(param, value)) });
    }

    getSearchResultsMarkup() {
        if (_.trim(this.state.searchParam).length < this.props.minCharactersBeforeResults) {
            return;
        } else if (this.state.resultsOpen && !_.isEmpty(this.state.filteredData)) {
            return (
                <div className="dropdown-content">
                    {_.map(this.state.filteredData, value => (
                        <button
                            key={value._id}
                            id={value._id}
                            onClick={this.onSearchResultClick}
                            className={`dropdown-content-row ${this.props.size}`}>
                            {this.props.displayRow(value)}
                        </button>
                    ))}
                </div>
            );
        }
    }

    render() {
        return (
            <div className="dropdown-wrapper search-wrapper">
                <Field
                    onChange={this.handleChange}
                    id={this.props.id}
                    name={this.props.name}
                    placeholder={this.props.placeholder}
                    size={this.props.size}
                    value={this.state.searchParam}
                    onClick={this.handleFieldClick}
                    autoComplete="off"
                    autoFocus={this.props.autoFocus}
                    clearable={this.props.clearable}
                    leftIcon="search"
                />
                {this.getSearchResultsMarkup()}
            </div>
        );
    }
}

SearchField.propTypes = propTypes;
SearchField.defaultProps = defaultProps;
export default onClickOutside(SearchField);
