import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchMember } from '../../../actions/memberActions';
import { editMember } from '../../../actions/memberActions';
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
        member: state.members.one,
        loading: state.members.loading,
        errors: state.errors
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        getMember: id => dispatch(fetchMember(id)),
        editMember: (id, memberData) => dispatch(editMember(id, memberData))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MemberProfile);
