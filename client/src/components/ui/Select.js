import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Select extends React.Component {
    static propTypes = {
        error: PropTypes.any,
        id: PropTypes.string,
        label: PropTypes.string,
        name: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        options: PropTypes.array.isRequired,
        padStart: PropTypes.number,
        size: PropTypes.string,
        value: PropTypes.string,
        width: PropTypes.oneOf(['small', 'medium', 'large'])
    };

    static defaultProps = {
        size: 'normal',
        padStart: 0
    };

    getLabelMarkup() {
        if (this.props.label) {
            return <p className="field-label">{this.props.label}</p>;
        }
    }

    getOptionsMarkup() {
        return _.map(this.props.options, option => (
            <option key={option} value={option}>
                {_.padStart(option, this.props.padStart, '0')}
            </option>
        ));
    }

    getSelectMarkup() {
        return (
            <select
                className={classnames('field', this.props.size, `${this.props.width}-width`)}
                name={this.props.name}
                value={this.props.value}
                onChange={this.props.onChange}
                id={this.props.id}>
                {this.getOptionsMarkup()}
            </select>
        );
    }

    render() {
        return (
            <div className="select field-wrapper">
                <label>
                    {this.getLabelMarkup()}
                    <div className="field-outer">
                        {this.getSelectMarkup()}
                        <p className="field-error-label">{this.props.error}</p>
                    </div>
                </label>
            </div>
        );
    }
}

export default Select;
