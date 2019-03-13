import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchMember } from '../../../actions/memberActions';
import Loading from '../../ui/Loading';
import EditableField from '../../ui/EditableField';
import { Link } from 'react-router-dom';

export class MemberProfile extends Component {
    constructor(props) {
        super(props);
        this.routeParam = props.match.params.id;
        this.email = props.member.email;
        this.state = {
            editMode: false,
            fields: {
                email: '',
                birthDate: '',
                phoneNumber: ''
            }
        };
        this.handleEditClick = this.handleEditClick.bind(this);
        this.onHandleFieldChange = this.onHandleFieldChange.bind(this);

    }

    componentDidMount() {
        // call redux action to retrieve specified member from api
        this.props.getMember(this.routeParam);
  }


    handleEditClick(e) {
        e.preventDefault();
        this.setState({ editMode: !this.state.editMode });
        if (this.state.editMode) {
            console.log(this.state.fields);
            // send the api edit request with this.state as the information
        }
    }

    onHandleFieldChange(e) {
        console.log('Field changed ' + e.target.value);
        this.setState({
            fields: { ...this.state.fields, [e.target.id]: e.target.value }
        });
    }
    getPageMarkup() {
      //// ENTIRELY aware this is so wrong. I'm pretty sure what I need to do is at somepoint
      //// use setState to replace the empty '' values of each field with those of the
      //// member once theyve been grabbed, but I am just getting messier and messier
      //// as I try and figure out where the hell that goes. React Documentaion Is THEE Bane Of My Feeble Brain
      this.setState({
        email: this.props.member.email,
        phoneNumber: this.props.member.phoneNumber,
        birthDate: this.props.member.birthDate,
      });
        if (this.props.loading) {
            return <Loading content="Loading member info..." />;
        } else {

            return (
                <div>
                    <h1>
                        {_.get(this.props.member, 'firstName')} {_.get(this.props.member, 'lastName')}
                    </h1>
                    <button onClick={this.handleEditClick}>{this.state.editMode ? 'Done' : 'Edit'}</button>
                    <br />
                    <EditableField
                        key="email"
                        value= {this.state.fields.email}
                        id={'email'}
                        editMode={this.state.editMode}
                        handleChange={this.onHandleFieldChange}
                    />
                    <EditableField
                        key="birthDate"
                        value={this.state.fields.birthDate}
                        id={'birthDate'}
                        editMode={this.state.editMode}
                        handleChange={this.onHandleFieldChange}
                    />
                    <EditableField
                        key="phoneNumber"
                        value={this.state.fields.phoneNumber}
                        id={'phoneNumber'}
                        editMode={this.state.editMode}
                        handleChange={this.onHandleFieldChange}
                    />
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
