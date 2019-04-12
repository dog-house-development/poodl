import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import Utils from '../../utils/Utils';

const propTypes = {
    startingTab: PropTypes.string,
    tabs: PropTypes.array
};

const defaultProps = {};

class TabPage extends Component {
    constructor(props) {
        super(props);
        const urlTab = Utils.getUrlParameter('tab', props.location.search);
        this.state = { currentTab: _.find(props.tabs, { id: urlTab }) ? urlTab : props.startingTab };
    }

    componentDidUpdate() {
        const urlTab = Utils.getUrlParameter('tab', this.props.location.search);
        const urlTabExists = _.find(this.props.tabs, { id: urlTab });
        if (urlTab && urlTab !== this.state.currentTab && urlTabExists) {
            this.setState({ currentTab: urlTabExists ? urlTab : this.props.startingTab });
        }
    }

    onTabClick = e => {
        this.setState({ currentTab: e.target.id });
        Utils.setUrlParameter('tab', e.target.id, this.props.history);
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
                {!_.isNil(tab.count) ? <span className="tab-label-count">{tab.count}</span> : null}
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
export default withRouter(TabPage);
