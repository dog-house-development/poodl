import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash';
import Dropdown from './Dropdown';

const propTypes = {
    options: PropTypes.array.isRequired,
    startingLabel: PropTypes.string
};

export class SelectDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentOption: _.find(props.options, { defaultOption: true }) || null
        };
    }

    handleOptionClick = e => {
        e.preventDefault();
        this.setState({ currentOption: _.find(this.props.options, { id: e.target.id }) });
    };

    getDropDownContent() {
        return _.map(this.props.options, option => ({
            content: option.label,
            id: option.id,
            onClick: this.handleOptionClick
        }));
    }

    render() {
        const { options, startingLabel, ...dropDownProps } = this.props;
        return (
            <Dropdown
                dropdownContent={this.getDropDownContent()}
                buttonContent={this.state.currentOption ? this.state.currentOption.label : startingLabel}
                {...dropDownProps}
            />
        );
    }
}

SelectDropdown.propTypes = propTypes;
export default SelectDropdown;
