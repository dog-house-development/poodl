import React from 'react';
import PropTypes from 'prop-types';
import Field from './Field';
import _ from 'lodash';
import onClickOutside from 'react-onclickoutside';
import classnames from 'classnames';

class ComboBox extends React.Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        data: PropTypes.object.isRequired,
        error: PropTypes.string,
        label: PropTypes.string,
        placeholder: PropTypes.string,
        id: PropTypes.string.isRequired,
        value: PropTypes.string
    };

    static defaultProps = {
        value: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    getFilteredData() {
        const uniqueData = _.uniq(_.map(this.props.data, item => item.name));
        const sortedData = _.sortBy(uniqueData, [item => item.toLowerCase()]);
        const filteredData = _.filter(sortedData, item => new RegExp(_.escapeRegExp(this.props.value), 'i').test(item));
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
                            id={this.props.id}>
                            {item}
                        </button>
                    ))}
                </div>
            );
        }
    }

    render() {
        if (this.props.present) {
            return (
                <div style={this.props.style} className="field-wrapper editable-field-wrapper">
                    <p className="field-label">{this.props.label}</p>
                    <p>{this.props.value}</p>
                </div>
            );
        }

        const {
            enableOnClickOutside,
            kind,
            eventTypes,
            disableOnClickOutside,
            stopPropagation,
            preventDefault,
            outsideClickIgnoreClass,
            ...inputProps
        } = this.props;
        return (
            <div className="combobox-wrapper">
                <Field {...inputProps} onFocus={this.setOpenTrue} autoComplete="off" spellCheck="false" />
                {this.getDropdownMarkup()}
            </div>
        );
    }
}

export default onClickOutside(ComboBox);
