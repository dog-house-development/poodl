import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import classnames from 'classnames';

import MemberActions from '../../../../actions/memberActions';
// import ActivityActions from '../../../../actions/activityActions';
// import Loading from '../../../ui/Loading';
import Button from '../../../ui/Button';

// check-in pages
import FindMember from './pages/FindMember';
import SelectActivities from './pages/SelectActivities';
import Finished from './pages/Finished';

const pages = {
    findMember: { title: 'FindMember', index: 0 },
    selectActivities: { title: 'SelectActivities', index: 1 },
    finished: { title: 'Finished', index: 2 }
};

class MemberCheckIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: pages.findMember,
            memberId: null
        };
        this.onNextClick = this.onNextClick.bind(this);
        this.setMemberId = this.setMemberId.bind(this);
    }

    setMemberId(id) {
        this.setState({ memberId: id, currentPage: pages.selectActivities });
    }

    getBackButtonMarkup() {
        if (this.state.currentPage !== pages.findMember) {
            return (
                <Button
                    onClick={() =>
                        this.setState({ currentPage: _.find(pages, { index: this.state.currentPage.index - 1 }) })
                    }
                    kind="secondary">
                    <i className="material-icons">arrow_back</i> Back
                </Button>
            );
        }
    }

    onNextClick() {
        if (this.state.currentPage === pages.finished) {
            this.setState({ currentPage: pages.findMember });
        } else {
            this.setState({ currentPage: _.find(pages, { index: this.state.currentPage.index + 1 }) });
        }
        // update the member checkins
        if (this.state.currentPage === pages.selectActivities) {
            this.props.memberActions.edit(this.state.memberId, {
                checkIns: [..._.get(this.props.member, 'checkIns', []), new Date()]
            });
        }
    }

    getNextButtonMarkup() {
        if (this.state.currentPage !== pages.findMember) {
            return (
                <Button onClick={this.onNextClick} kind="primary">
                    {this.state.currentPage === pages.finished ? (
                        <>
                            Start over <i className="material-icons">subdirectory_arrow_left</i>
                        </>
                    ) : (
                        <>
                            {this.state.currentPage === pages.selectActivities ? 'Finish' : 'Next'}{' '}
                            <i className="material-icons">arrow_forward</i>
                        </>
                    )}
                </Button>
            );
        }
    }

    getPageMarkup() {
        switch (this.state.currentPage) {
            case pages.findMember:
                return (
                    <div>
                        <FindMember setMemberId={this.setMemberId} />
                    </div>
                );
            case pages.selectActivities:
                return (
                    <div>
                        <SelectActivities memberId={this.state.memberId} />
                    </div>
                );
            case pages.finished:
                return (
                    <div>
                        <Finished />
                    </div>
                );
            default:
                return <p>you are lost my friend</p>;
        }
    }

    render() {
        return (
            <div className="member-check-in-container">
                <div>
                    <h1>Check in</h1>
                    <div
                        className={classnames('check-in-panel', {
                            panel: this.state.currentPage !== pages.selectActivities
                        })}>
                        {this.getPageMarkup()}
                    </div>
                    <div className="navigation-buttons-container">
                        <div className="back-button-container">{this.getBackButtonMarkup()}</div>
                        <div className="next-button-container">{this.getNextButtonMarkup()}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        member: state.members.all[props.match.params.id],
        loading: state.members.loading,
        errors: state.members.errors
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        memberActions: bindActionCreators(MemberActions, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MemberCheckIn);

// export default MemberCheckIn;
