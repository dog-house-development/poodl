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
        present: PropTypes.bool,
        size: PropTypes.string,
        value: PropTypes.string,
        width: PropTypes.oneOf(['small', 'medium', 'large']),
        noCaret: PropTypes.bool
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
        let options = [];
        if (this.props.placeholder) {
            options.push(
                <option key={this.props.placeholder} disabled value={this.props.placeholder}>
                    {this.props.placeholder}
                </option>
            );
        }

        options.push(
            _.map(this.props.options, option => {
                const paddedOption = _.padStart(option, this.props.padStart, '0');
                return (
                    <option key={paddedOption} value={paddedOption}>
                        {paddedOption}
                    </option>
                );
            })
        );
        return options;
    }

    getSelectMarkup() {
        const { present, size, width, label, padStart, noCaret, ...inputProps } = this.props;
        return (
            <select
                className={classnames('field', size, `${width}-width`, noCaret ? 'no-caret' : null)}
                {...inputProps}>
                {this.getOptionsMarkup()}
            </select>
        );
    }

    getIcon() {
        if (!this.props.noCaret) {
            return <i className="select-icon material-icons">arrow_drop_down</i>;
        }
    }

    render() {
        if (this.props.present) {
            return (
                <div className="field-wrapper editable-field-wrapper">
                    <p className="field-label">{this.props.label}</p>
                    <p>{this.props.value}</p>
                </div>
            );
        }

        return (
            <div className="select field-wrapper">
                <label>
                    {this.getLabelMarkup()}
                    <div className="field-outer">
                        <div className="select-inner">
                            {this.getSelectMarkup()}
                            {this.getIcon()}
                        </div>
                        <p className="field-error-label">{this.props.error}</p>
                    </div>
                </label>
            </div>
        );
    }
}

export default Select;
