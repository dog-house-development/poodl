import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchMember } from '../../../actions/memberActions';
import Loading from '../../ui/Loading';
import { Link } from 'react-router-dom';

export class MemberProfile extends Component {
    constructor(props) {
        super(props);
        this.routeParam = props.match.params.id;
    }

    componentDidMount() {
        // call redux action to retrieve specified member from api
        this.props.getMember(this.routeParam);
    }

    getPageMarkup() {
        if (this.props.loading) {
            return <Loading content="Loading admin info..." />;
        } else {
            return (
                <div>
                    <h1>
                        {_.get(this.props.member, 'firstName')} {_.get(this.props.member, 'lastName')}
                    </h1>
                    <div className="panel">
                        {_.map(_.toPairs(this.props.member), pair => {
                            if (pair[0] === 'password' || pair[0] === '__v') {
                                return;
                            }
                            if (pair[0] === '') {
                                pair[1] = _.get(this.props.member, 'superAdmin') ? 'Yes' : 'No';
                            }
                            if (pair[0] === 'date' || pair[0] === 'createdAt' || pair[0] === 'updatedAt') {
                                pair[1] = moment(pair[1]).format('MMMM Do, YYYY, h:mm:ss a');
                            }
                            return (
                                <div key={pair[0]} style={{ margin: '10px 0' }}>
                                    <h4 style={{ color: '#a5a9af', fontSize: '0.8em' }}>{_.upperCase(pair[0])}</h4>
                                    <p>{pair[1]}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="view-all-container">
                <Link to="/members" className="button small tertiary">
                    <i className="material-icons">keyboard_backspace</i> Back to all members
                </Link>
                <div className="panel">{this.getPageMarkup()}</div>
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        member: state.members.one,
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
