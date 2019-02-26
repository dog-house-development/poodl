import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchMember } from '../../../actions/memberActions';
import Loading from '../../ui/Loading';

export class MemberProfile extends Component {
    constructor(props) {
        super(props);
        const match = {
            params: {
                baseId: 1 //any id you want to set
            }
        };
        this.routeParam = props.match.params.id;
    }

    componentDidMount() {
        // call redux action to retrieve all members from api
        this.props.getMember(this.routeParam);
    }

    getPageMarkup() {
        if (this.props.loading) {
            return <Loading content="Loading member info..." />;
        } else {
            return (
                <h1>
                    {_.get(this.props.member, 'firstName')} {_.get(this.props.member, 'lastName')}
                </h1>
            );
        }
    }

    render() {
        return (
            <div className="view-all-container">
                <div className="panel">{this.getPageMarkup()}</div>
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        loading: state.members.loading,
        members: state.members.one,
        errors: state.errors
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        getMember: id => dispatch(fetchMember(id))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MemberProfile);
