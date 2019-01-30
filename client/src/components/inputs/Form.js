import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from './Field';
import Button from './Button';

const propTypes = {
    onSubmit: PropTypes.func.isRequired,
    fields: PropTypes.array.isRequired
};

class Form extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.getFieldsMarkup = this.getFieldsMarkup.bind(this);
    }

    onComponentDidMount() {
        this.setState({ value: this.props.content });
    }

    handleChange(e) {
        e.preventDefault();

        this.props.onChange(e);
    }

    getFieldsMarkup() {
        return (
            this.props.fields.map(field => {
                return (
                    <Field
                        key={field.name}
                        name={field.name}
                        label={field.label}
                        content={field.content}
                        placeholder={field.placeholder}
                        onChange={field.onChange} />
                );
            })
        );
    }

    render() {
        return (
            <form onSubmit={this.props.onSubmit} >
                {this.getFieldsMarkup()}
                <Button type='submit' content='Submit' />
            </form>
        );
    }
}

Form.propTypes = propTypes;
export default Form;
