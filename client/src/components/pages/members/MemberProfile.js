import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import MemberActions from '../../../actions/memberActions';
import Loading from '../../ui/Loading';
import { Link } from 'react-router-dom';
import Button from '../../ui/Button';
import memberFields, { Categories } from './memberFields';
import EditableProfile from '../../ui/EditableProfile';

export class MemberProfile extends Component {
    render() {
        return (
            <div className="view-all-container">
                <Link to="/members" className="button small tertiary">
                    <i className="material-icons">keyboard_backspace</i> Back to all members
                </Link>
                <div>
                    <h1>
                        {this.props.loading ? <Loading /> : _.get(this.props.member, 'firstName')}{' '}
                        {this.props.loading ? '' : _.get(this.props.member, 'lastName')}
                    </h1>
                    <EditableProfile
                        fields={memberFields}
                        categories={Categories}
                        editProfile={this.props.editMember}
                        getProfile={this.props.getMember}
                        profile={this.props.member}
                    />
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
)(MemberProfile);
