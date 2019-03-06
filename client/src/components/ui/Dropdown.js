import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import _ from 'lodash';
import onClickOutside from 'react-onclickoutside';
import classnames from 'classnames';

const propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    kind: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
    buttonContent: PropTypes.string.isRequired,
    dropdownContent: PropTypes.array.isRequired,
    align: PropTypes.oneOf(['left', 'center', 'right']),
    arrow: PropTypes.bool
};

const defaultProps = {
    size: 'medium',
    kind: 'primary',
    align: 'left',
    arrow: false
};

export class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.onDropdownClick = this.onDropdownClick.bind(this);
    }

    onDropdownClick(e) {
        e.preventDefault();
        this.setState({ open: !this.state.open });
    }

    onDropdownRowClick(onRowClick, evt) {
        evt.preventDefault();
        this.setState({ open: !this.state.open });
        onRowClick(evt);
    }

    handleClickOutside = evt => {
        if (this.state.open) {
            this.setState({ open: !this.state.open });
        }
    };

    getDropdownContentMarkup() {
        let arrowMarkup;
        if (this.props.arrow) {
            arrowMarkup = (
                <>
                    <div className="arrow arrow-behind" />
                    <div className="arrow" />
                </>
            );
        }
        if (this.state.open) {
            return (
                <div
                    className={classnames('dropdown-content', `dropdown-align-${this.props.align}`, {
                        'arrow-dropdown': this.props.arrow
                    })}
                >
                    {arrowMarkup}
                    {_.map(this.props.dropdownContent, row => {
                        if (_.get(row, 'type') === 'divider') {
                            return <hr key={_.uniqueId('divider-')} />;
                        }
                        return (
                            <button
                                key={_.uniqueId('dropdown-row-')}
                                className={`dropdown-content-row ${this.props.size}`}
                                onClick={evt => this.onDropdownRowClick(row.onClick, evt)}
                            >
                                {row.content}
                            </button>
                        );
                    })}
                </div>
            );
        }
    }

    render() {
        return (
            <div className="dropdown-wrapper">
                <Button
                    size={this.props.size}
                    kind={this.props.kind}
                    content={
                        <span>
                            {this.props.buttonContent}
                            <i className="material-icons dropdown-caret">
                                {this.state.open ? 'arrow_drop_up' : 'arrow_drop_down'}
                            </i>
                        </span>
                    }
                    onClick={this.onDropdownClick}
                    dropdownButton={true}
                />
                {this.getDropdownContentMarkup()}
            </div>
        );
    }
}

Dropdown.propTypes = propTypes;
Dropdown.defaultProps = defaultProps;
export default onClickOutside(Dropdown);
