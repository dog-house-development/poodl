import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
// import { Link } from 'react-router-dom';
import MemberActions from '../../../../../actions/memberActions';
// import Loading from '../../../../ui/Loading';
import SearchField from '../../../../ui/SearchField';

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
                <h3>Find yourself</h3>
                <SearchField
                    size="large"
                    id="find-member-search"
                    data={this.props.members}
                    searchRule={(param, value) => {
                        param = _.lowerCase(param);
                        return (
                            _.includes(_.lowerCase(value.firstName), param) ||
                            _.includes(_.lowerCase(value.lastName), param)
                        );
                    }}
                    displayRow={row => row.firstName + ' ' + row.lastName}
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FindMember);
