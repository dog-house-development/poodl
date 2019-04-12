import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MemberActions from '../../../../../actions/memberActions';
import SearchField from '../../../../ui/SearchField';
import Utils from '../../../../../utils/Utils';
import Button from '../../../../ui/Button';

const propTypes = {
    setMemberId: PropTypes.func,
    onSignUpClick: PropTypes.func
};

export class FindMember extends Component {
    constructor(props) {
        super(props);
        this.handleSearchResultClick = this.handleSearchResultClick.bind(this);
    }

    componentDidMount() {
        this.props.memberActions.filter();
    }

    handleSearchResultClick(e) {
        e.preventDefault();
        this.props.setMemberId(e.target.id);
    }

    render() {
        return (
            <div>
                <div className="panel finished-panel">
                    <h2 className="panel-title">Enter your name to check in</h2>
                    <SearchField
                        size="large"
                        id="find-member-search"
                        data={this.props.members}
                        autoFocus="on"
                        minCharactersBeforeResults={3}
                        searchRule={(param, member) => Utils.searchObject(param, [member.firstName, member.lastName])}
                        displayRow={row => (
                            <>
                                {row.firstName + ' ' + row.lastName}
                                <i className="material-icons arrow-icon">arrow_forward</i>
                            </>
                        )}
                        onSearchResultClick={this.handleSearchResultClick}
                    />
                </div>
                <div className="finished-panel sign-up-container">
                    <p>Not a member? </p>
                    <Button content="Sign up now" onClick={this.props.onSignUpClick} kind="secondary" />
                </div>
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        members: state.members.all,
        loading: state.members.loading,
        errors: state.members.errors
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        memberActions: bindActionCreators(MemberActions, dispatch)
    };
};

FindMember.propTypes = propTypes;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FindMember);
