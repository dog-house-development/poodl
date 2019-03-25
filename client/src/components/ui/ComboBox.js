import React from 'react';
import PropTypes from 'prop-types';
import Field from './Field';
import _ from 'lodash';
import onClickOutside from 'react-onclickoutside';
import classnames from 'classnames';

class ComboBox extends React.Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        data: PropTypes.array.isRequired,
        error: PropTypes.string,
        label: PropTypes.string,
        placeholder: PropTypes.string,
        id: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    getFilteredData() {
        const uniqueData = _.uniq(_.map(this.props.data, activity => activity.name));
        const sortedData = _.sortBy(uniqueData, [item => item.toLowerCase()]);
        const filteredData = _.filter(sortedData, item => new RegExp(this.state.value, 'i').test(item));
        return filteredData;
    }

    setOpenTrue = () => {
        this.setState({ open: true });
    };

    onRowClick = e => {
        this.props.onChange(e);
        this.setState({ open: false });
    };

    handleClickOutside = () => {
        this.setState({ open: false });
    };

    getDropdownMarkup() {
        const filteredData = this.getFilteredData();
        if (this.state.open && filteredData.length > 0) {
            return (
                <div className="combobox-content">
                    {_.map(filteredData, item => (
                        <button
                            type="button"
                            key={item}
                            className={classnames('combobox-row')}
                            onClick={this.onRowClick}
                            value={item}
                            id={this.props.id}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            );
        }
    }

    render() {
        return (
            <div className="combobox-wrapper">
                <Field
                    label={this.props.label}
                    placeholder={this.props.placeholder}
                    id={this.props.id}
                    onChange={this.props.onChange}
                    value={this.props.value}
                    error={this.props.error}
                    onFocus={this.setOpenTrue}
                    autoComplete="off"
                    spellCheck="false"
                />
                {this.getDropdownMarkup()}
            </div>
        );
    }
}

export default onClickOutside(ComboBox);
