import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classnames from 'classnames';

import CheckBox from './CheckBox';
import Field from './Field';
import ComboBox from './ComboBox';
import DatePicker from './DatePicker';
import MultiCheckbox from './MultiCheckbox';
import Select from './Select';
import Radio from './Radio';
import Button from './Button';
import SelectBoolean from './SelectBoolean';
import assert from 'assert';
import Loading from './Loading';
import TimePicker from './TimePicker';

const possibleKinds = [
    'field',
    'combobox',
    'checkbox',
    'multiCheckbox',
    'select',
    'datePicker',
    'timePicker',
    'radio',
    'selectBoolean',
    'flex',
    'group'
];

const propTypes = {
    errors: PropTypes.object.isRequired,
    values: PropTypes.object.isRequired,
    editable: PropTypes.bool
};

const defaultProps = {
    values: {},
    errorDescription: 'There are errors in this form.'
};

class DynamicForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasErrors: false,
            present: this.getPresent(),
            modifiedInputs: {}
        };
    }

    getPresent() {
        if (this.props.editable) {
            return _.reduce(
                this.props.inputs,
                (result, input) => {
                    result[input.id] = true;
                    return result;
                },
                {}
            );
        }

        return {};
    }

    isBeingEdited() {
        return _.includes(Object.values(this.state.present), false);
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(this.props.errors, prevProps.errors)) {
            if (_.isEmpty(this.props.errors)) {
                this.setState({ hasErrors: false });
            } else {
                this.setState({ hasErrors: true });
            }
        }
    }

    handleCancelClick = e => {
        this.setState({
            present: { ...this.state.present, [e.target.name]: true },
            modifiedInputs: {},
            hasErrors: false
        });
    };

    onEditSuccess = () => {
        this.setState({ present: this.getPresent(), modifiedInputs: {} });
    };

    handleDoneClick = e => {
        e.persist();
        if (!_.isEmpty(this.state.modifiedInputs)) {
            this.props.editValues(this.state.modifiedInputs, this.onEditSuccess);
        } else {
            this.setState({ present: { ...this.state.present, [e.target.name]: true }, modifiedInputs: {} });
        }
    };

    handleEditClick = e => {
        this.setState({ present: { ...this.state.present, [e.target.id]: false } });
    };

    getCancelButton(group) {
        return (
            <Button
                name={group.id}
                size="small"
                kind="tertiary"
                onClick={this.handleCancelClick}
                disabled={this.props.loading}>
                Cancel
            </Button>
        );
    }

    getDoneButton(group) {
        return (
            <Button
                name={group.id}
                size="small"
                kind={_.isEmpty(this.state.modifiedInputs) ? 'secondary' : 'primary'}
                onClick={this.handleDoneClick}
                disabled={this.props.loading}>
                Done
            </Button>
        );
    }

    getEditButton(group) {
        return (
            <div className="edit">
                <Button id={group.id} size="small" onClick={this.handleEditClick} disabled={this.isBeingEdited()}>
                    Edit
                </Button>
            </div>
        );
    }

    getGroupLoading() {
        if (this.props.loading) {
            return (
                <div className="input-group-loading">
                    <Loading size="small" content="" />
                </div>
            );
        }
    }

    getGroupButtons(group) {
        if (this.state.present[group.id]) {
            return this.getEditButton(group);
        }

        return (
            <>
                {this.getCancelButton(group)}
                {this.getDoneButton(group)}
            </>
        );
    }

    getGroupLabel(input) {
        if (input.label) {
            return (
                <h3 className={classnames('input-group-label', this.props.editable ? 'editable' : '')}>
                    {input.label}
                </h3>
            );
        }

        return <div />;
    }
    getGroupTitleMarkup(input) {
        if (this.props.editable) {
            return (
                <div className="side-by-side">
                    {this.getGroupLabel(input)}
                    <div>
                        {this.getGroupLoading()}
                        {this.getGroupButtons(input)}
                    </div>
                </div>
            );
        }

        return this.getGroupLabel(input);
    }

    groupDescription(input) {
        if (input.description) {
            return <p className="input-group-description">{input.description}</p>;
        }
    }

    getGroupInput(input) {
        const present = _.get(this.state.present, input.id);
        return (
            <div className={classnames({ panel: this.props.editable }, 'input-group')} key={input.id}>
                {this.getGroupTitleMarkup(input)}
                {this.groupDescription(input)}
                {this.getInputMarkup(input.inputs, present)}
            </div>
        );
    }

    getFlexInput(input) {
        return (
            <div className="inline-input-wrapper" key={input.id}>
                <h3 className="inline-input-label">{input.label}</h3>
                <div className="inline-input">{this.getInputMarkup(input.inputs, input.present)}</div>
            </div>
        );
    }

    getInputKind() {
        return {
            field: input => {
                // Exclude kind from field because it is an actual prop
                const { kind, ...excludedInput } = input;
                return <Field {...excludedInput} />;
            },
            combobox: input => <ComboBox {...input} data={this.props.data[input.id]} />,
            checkbox: input => <CheckBox {...input} />,
            multiCheckbox: input => <MultiCheckbox {...input} />,
            datePicker: input => <DatePicker {...input} />,
            timePicker: input => <TimePicker {...input} />,
            select: input => <Select {...input} />,
            radio: input => <Radio {...input} />,
            selectBoolean: input => <SelectBoolean {...input} />,
            flex: input => this.getFlexInput(input),
            group: input => this.getGroupInput(input)
        };
    }

    handleInputChange = e => {
        if (_.isEqual(this.props.values[e.target.id], e.target.value)) {
            const { [e.target.id]: id, ...modifiedInputs } = this.state.modifiedInputs;

            this.setState({
                modifiedInputs: modifiedInputs
            });
        } else {
            this.setState({
                modifiedInputs: {
                    ...this.state.modifiedInputs,
                    [e.target.id]: e.target.value
                }
            });
        }
    };

    getInput = input => {
        assert.ok(input.kind, `The input ${input.id} must have a kind`);
        assert(_.includes(possibleKinds, input.kind), `The input ${input.id} must have a kind`);
        assert(input.id, `The input ${input.kind} must have an id`);

        let inputValue;
        if (!_.isNil(this.state.modifiedInputs[input.id])) {
            inputValue = this.state.modifiedInputs[input.id];
        } else {
            inputValue = this.props.values[input.id] || input.value;
        }

        if (this.props.editable && _.has(input, 'editable') && !input.editable) {
            return;
        }

        return this.getInputKind()[input.kind]({
            ...input,
            key: input.id,
            error: this.state.hasErrors ? this.props.errors[input.id] : '',
            onChange: this.props.onChange || this.handleInputChange,
            value: inputValue
        });
    };

    getInputMarkup(inputs, present = false) {
        _.forEach(inputs, input => {
            input.present = present;
        });
        return _.map(inputs, this.getInput);
    }

    getErrorMarkup() {
        if (this.props.errorDescription && this.state.hasErrors && !this.props.editable) {
            return <p className="form-error">{this.props.errorDescription}</p>;
        }
    }

    getSubmitButtonMarkup() {
        if (!this.props.editable) {
            return (
                <Button
                    formButton
                    onClick={this.props.onSubmit}
                    size="medium"
                    type="button"
                    disabled={this.props.loading}>
                    {this.props.submitButtonLabel}
                </Button>
            );
        }
    }

    render() {
        return (
            <form className="dynamic-form">
                {this.getInputMarkup(this.props.inputs)}
                {this.getErrorMarkup()}
                {this.getSubmitButtonMarkup()}
            </form>
        );
    }
}

DynamicForm.propTypes = propTypes;
DynamicForm.defaultProps = defaultProps;

export default DynamicForm;
