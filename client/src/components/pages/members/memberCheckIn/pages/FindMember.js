import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
// import { Link } from 'react-router-dom';
import MemberActions from '../../../../../actions/memberActions';
// import Loading from '../../../../ui/Loading';
import SearchField from '../../../../ui/SearchField';

const propTypes = {
    setMemberId: PropTypes.func
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
            <div className="panel finished-panel">
                <h2 className="panel-title">Enter your name to check in</h2>
                <SearchField
                    size="large"
                    id="find-member-search"
                    data={this.props.members}
                    autoFocus="on"
                    searchRule={(param, value) => {
                        param = _.lowerCase(param);
                        return (
                            _.includes(_.lowerCase(value.firstName), param) ||
                            _.includes(_.lowerCase(value.lastName), param)
                        );
                    }}
                    displayRow={row => (
                        <>
                            {row.firstName + ' ' + row.lastName}
                            <i className="material-icons arrow-icon">arrow_forward</i>
                        </>
                    )}
                    onSearchResultClick={this.handleSearchResultClick}
                />
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