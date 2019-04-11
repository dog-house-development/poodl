import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classnames from 'classnames';

const propTypes = {
    tabs: PropTypes.array,
    startingTab: PropTypes.string
};

const defaultProps = {};

class TabPage extends Component {
    constructor(props) {
        super(props);
        this.state = { currentTab: props.startingTab };
    }

    onTabClick = e => {
        this.setState({ currentTab: e.target.id });
    };

    getTabBar() {
        return _.map(this.props.tabs, tab => (
            <button
                className={classnames('tab-button', {
                    'current-tab': this.state.currentTab === tab.id,
                    'tab-includes-icon': tab.icon
                })}
                id={tab.id}
                key={tab.id}
                onClick={this.onTabClick}>
                {tab.icon ? <i className="material-icons tab-icon">{tab.icon}</i> : null}
                {tab.label}
                {tab.count ? <span className="tab-label-count">{tab.count}</span> : null}
            </button>
        ));
    }

    render() {
        return (
            <div>
                <div className="tab-bar">{this.getTabBar()}</div>
                <div>{_.get(_.find(this.props.tabs, { id: this.state.currentTab }), 'content')}</div>
            </div>
        );
    }
}

TabPage.propTypes = propTypes;
TabPage.defaultProps = defaultProps;
export default TabPage;
