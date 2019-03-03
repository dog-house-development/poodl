import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Field from './Field';
import Button from './Button';

const propTypes = {
    onSubmit: PropTypes.func.isRequired,
    fields: PropTypes.array.isRequired,
    formTitle: PropTypes.string,
    noValidate: PropTypes.bool,
    buttonLabel: PropTypes.string,
    errors: PropTypes.array
};

const defaultProps = {
    buttonLabel: 'Submit'
};

class Form extends Component {
    getErrorMarkup() {
        return _.map(this.props.errors, error => (
            <div className="form-error" key={error}>
                {error}
            </div>
        ));
    }

    getFieldsMarkup() {
        return _.map(this.props.fields, field => (
            <Field
                key={field.id}
                id={field.id}
                type={field.type}
                name={field.name}
                label={field.label}
                content={field.content}
                placeholder={field.placeholder}
                onChange={field.onChange}
                sideBySide={field.sideBySide}
                autocomplete={field.autocomplete}
                error={field.error}
            />
        ));
    }

    render() {
        return (
            <div className="panel">
                <h1 className="panel-title">{this.props.formTitle}</h1>
                {this.getErrorMarkup()}
                <form noValidate={this.props.noValidate} onSubmit={this.props.onSubmit}>
                    {this.getFieldsMarkup()}
                    <Button type="submit" content={this.props.buttonLabel} formButton />
                </form>
            </div>
        );
    }
}

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;
export default Form;
