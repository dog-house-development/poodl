import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Select extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        options: PropTypes.array.isRequired,
        size: PropTypes.oneOf(['normal', 'large']),
        padStart: PropTypes.number
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

    render() {
        return (
            <label className="select field-wrapper">
                {this.getLabelMarkup()}
                <div className="field-outer">
                    <select
                        className={classnames('field', this.props.size, this.props.width)}
                        name={this.props.name}
                        value={this.props.value}
                        onChange={this.props.onChange}
                    >
                        {_.map(this.props.options, option => (
                            <option key={option} value={option}>
                                {_.padStart(option, this.props.padStart, '0')}
                            </option>
                        ))}
                    </select>
                    <p className="field-error-label">{this.props.error}</p>
                </div>
            </label>
        );
    }
}

export default Select;
