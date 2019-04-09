import React from 'react';
import CheckBox from './CheckBox';
import _ from 'lodash';

class MultiCheckbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.valuePropToState();
    }

    optionsAsObject() {
        return _.reduce(
            this.props.options,
            (state, option) => {
                state[option] = false;
                return state;
            },
            {}
        );
    }

    stateAsArray() {
        return _.keys(_.pickBy(this.state));
    }

    valuePropToState() {
        // take value array like ['one', 'two']
        // take options like ['one', 'two', 'three', 'four']
        // return object like { one: true, two: true, three: false, four: false}
        const result = this.optionsAsObject();
        _.forEach(this.props.options, option => {
            if (_.includes(this.props.value, option)) {
                result[option] = true;
            }
        });

        return result;
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state !== prevState) {
            this.props.onChange({
                target: {
                    id: this.props.id,
                    value: this.stateAsArray()
                }
            });
        }

        if (!_.isEqual(this.props.value, prevProps.value)) {
            this.setState(this.valuePropToState());
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.checked });
    };

    getCheckboxMarkup = option => {
        return (
            <div className="multi-checkbox-item" key={option}>
                <CheckBox label={option} id={option} onChange={this.onChange} value={this.state[option]} />
            </div>
        );
    };

    getCheckboxList() {
        return _.map(this.props.options, this.getCheckboxMarkup);
    }

    render() {
        if (this.props.present) {
            return (
                <div className="field-wrapper editable-field-wrapper">
                    <p className="field-label">{this.props.label}</p>
                    <p>{_.join(this.props.value, ', ')}</p>
                </div>
            );
        }

        return (
            <div className="multi-checkbox field-wrapper">
                <p className="field-label">{this.props.label}</p>
                <div className="multi-checkbox-content">{this.getCheckboxList()}</div>
            </div>
        );
    }
}

export default MultiCheckbox;
