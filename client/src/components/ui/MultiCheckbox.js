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
        // console.log(this.state);
    }

    stateAsArray() {
        return _.keys(_.pickBy(this.state));
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state !== prevState) {
            // console.log(this.stateAsArray());
            this.props.onChange({
                target: {
                    id: this.props.id,
                    value: this.stateAsArray()
                }
            });
        }
    }

    onChange = e => {
        // console.log(e.target.checked);
        this.setState({ [e.target.id]: e.target.checked });
    };

    getCheckboxMarkup = option => {
        return (
            <div className="multi-checkbox-item" key={option}>
                <CheckBox label={option} id={option} onChange={this.onChange} />
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
