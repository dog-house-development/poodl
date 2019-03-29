import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import CheckBox from './CheckBox';
import Field from './Field';
import DatePicker from './DatePicker';
import MultiCheckbox from './MultiCheckbox';
import Select from './Select';
import Radio from './Radio';
import Button from './Button';
import SelectBoolean from './SelectBoolean';
import assert from 'assert';

class DynamicForm extends React.Component {
    static propTypes = {
        errors: PropTypes.object.isRequired,
        values: PropTypes.object.isRequired
    };

    static defaultProps = {
        values: {}
    };

    constructor(props) {
        super(props);
        this.state = {
            hasErrors: false
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.errors !== prevProps.errors) {
            this.setState({ hasErrors: true });
        }
    }

    getGroupInput(input) {
        return (
            <div className="input-group" key={input.id}>
                <h3 className="input-group-label">{input.label || input.id}</h3>
                <p className="input-group-description">{input.description}</p>
                {this.getInputMarkup(input.inputs)}
            </div>
        );
    }

    getFlexInput(input) {
        return (
            <div className="inline-input" key={input.id}>
                {this.getInputMarkup(input.inputs)}
            </div>
        );
    }

    possibleKinds() {
        return [
            'field',
            'checkbox',
            'multiCheckbox',
            'select',
            'datePicker',
            'radio',
            'selectBoolean',
            'flex',
            'group'
        ];
    }

    getInputKind() {
        return {
            // At least send in '' for field value because if you send in
            // undefined it will make the component uncontrolled at first,
            // which results in an error
            field: input => <Field {...input} value={this.props.values[input.id] || input.value || ''} />,
            checkbox: input => <CheckBox {...input} />,
            multiCheckbox: input => <MultiCheckbox {...input} />,
            datePicker: input => <DatePicker {...input} />,
            select: input => <Select {...input} />,
            radio: input => <Radio {...input} />,
            selectBoolean: input => <SelectBoolean {...input} />,
            flex: input => this.getFlexInput(input),
            group: input => this.getGroupInput(input)
        };
    }

    getInput = input => {
        assert.ok(input.kind, `The input ${input.id} must have a kind`);
        assert(_.includes(this.possibleKinds(), input.kind), `The input ${input.id} must have a kind`);
        assert(input.id, `The input ${input.kind} must have an id`);
        return this.getInputKind()[input.kind]({
            ...input,
            key: input.id,
            error: this.props.errors[input.id],
            onChange: this.props.onChange,
            value: this.props.values[input.id] || input.value
        });
    };

    getInputMarkup(inputs) {
        return _.map(inputs, this.getInput);
    }

    getFormMarkup() {
        return this.getInputMarkup(this.props.inputs);
    }

    getErrorMarkup() {
        if (this.state.hasErrors) {
            return <p className="form-error">There are errors in this form.</p>;
        }
    }

    render() {
        return (
            <form className="dynamic-form">
                {this.getFormMarkup()}
                {this.getErrorMarkup()}
                <Button formButton onClick={this.props.onSubmit} size="medium" type="button">
                    {this.props.submitButtonLabel}
                </Button>
            </form>
        );
    }
}

export default DynamicForm;
