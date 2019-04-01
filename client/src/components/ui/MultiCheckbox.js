import React from 'react';
import CheckBox from './CheckBox';
import _ from 'lodash';

class MultiCheckbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = _.reduce(
            props.options,
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

    componentDidUpdate(prevProps, prevState) {
        if (this.state !== prevState) {
            this.props.onChange({
                target: {
                    id: this.props.id,
                    value: this.stateAsArray()
                }
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.checked });
    };

    getCheckboxMarkup = option => {
        return (
            <div className="multi-checkbox-item" key={option}>
                <CheckBox
                    label={option}
                    id={option}
                    onChange={this.onChange}
                    value={_.includes(this.props.value, option)}
                />
            </div>
        );
    };

    getCheckboxList() {
        return _.map(this.props.options, this.getCheckboxMarkup);
    }

    render() {
        return (
            <div className="multi-checkbox field-wrapper">
                <p className="field-label">{this.props.label}</p>
                <div className="multi-checkbox-content">{this.getCheckboxList()}</div>
            </div>
        );
    }
}

export default MultiCheckbox;
