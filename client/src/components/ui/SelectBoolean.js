import React from 'react';
import PropTypes from 'prop-types';
import Select from './Select';

class SelectBoolean extends React.Component {
    static propTypes = {
        name: PropTypes.string,
        value: PropTypes.bool,
        onChange: PropTypes.func.isRequired,
        true: PropTypes.string,
        false: PropTypes.string,
        size: PropTypes.oneOf(['normal', 'large']),
        padStart: PropTypes.number,
        label: PropTypes.string
    };

    static defaultProps = {
        true: 'Yes',
        false: 'No',
        value: false
    };

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        };
    }

    handleChange = e => {
        this.props.onChange({
            target: {
                id: this.props.id,
                value: e.target.value === this.props.true
            }
        });
    };

    getOptions() {
        return [this.props.false, this.props.true];
    }

    getValue() {
        return this.props.value ? this.props.true : this.props.false;
    }

    render() {
        return (
            <Select {...this.props} onChange={this.handleChange} value={this.getValue()} options={this.getOptions()} />
        );
    }
}

export default SelectBoolean;
