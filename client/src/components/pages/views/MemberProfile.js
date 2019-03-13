import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchMember } from '../../../actions/memberActions';
import Loading from '../../ui/Loading';
import EditableField from '../../ui/EditableField';
import { Link } from 'react-router-dom';
import Button from '../../ui/Button';

export class MemberProfile extends Component {
    constructor(props) {
        super(props);
        this.routeParam = props.match.params.id;
        this.state = {
            editMode: false,
            fields: {
                email: '',
                address: '',
                birthDate: '',
                phoneNumber: '',
                emergencyContact: '',
                seniorCenter: '',
                emergencyContact: ['', '', ''],
                memberisNewOrRenewal: true, //New
                formOfPayment: true, // Cash
                bankCheckNumber: '',
                includedInEstatePlans: true,
                wantsEstateInfo: true,
                renewalDate: '',
                specialDiet: ['', ''],
                medicalIssues: ['', ''],
                disabilities: ['', ''],
                mealPreference: '',
                race: '',
                ethnicity: '',
                numberInHousehold: 0,
                isPersonCaregiver: true,
                monthlyIncome: '',
                isDisabled: true,
                isVeteran: true,
                isSpouse60: true,
                isDisabled60: true,
                caregiver: '',
                needsAADL: true,
                needsIADL: true
            }
        };
        this.handleEditClick = this.handleEditClick.bind(this);
        this.onHandleFieldChange = this.onHandleFieldChange.bind(this);
    }

    componentDidMount() {
        // call redux action to retrieve specified member from api
        this.props.getMember(this.routeParam);
    }

    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(prevProps.member, this.props.member)) {
            this.setState({
                fields: {
                    email: this.props.member.email,
                    birthDate: this.props.member.birthDate,
                    phoneNumber: this.props.member.phoneNumber
                }
            });
        }
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
        this.setState({
            fields: { ...this.state.fields, [e.target.id]: e.target.value }
        });
    }
    getPageMarkup() {
        if (this.props.loading) {
            return <Loading content="Loading member info..." />;
        } else {
            return (
                <div>
                    <h1>
                        {_.get(this.props.member, 'firstName')} {_.get(this.props.member, 'lastName')}
                    </h1>

                    <div className="panel">
                        <h2>Member Info</h2>
                        <h3 style={{ color: '#a5a9af', fontSize: '0.8em' }}>Birth Date:</h3>
                        <EditableField
                            key="birthDate"
                            defaultValue={this.state.fields.birthDate}
                            id={'birthDate'}
                            editMode={this.state.editMode}
                            handleChange={this.onHandleFieldChange}
                        />
                        <EditableField
                            key="seniorCenter"
                            defaultValue={this.state.fields.seniorCenter}
                            id={'seniorCenter'}
                            editMode={this.state.editMode}
                            handleChange={this.onHandleFieldChange}
                        />
                        <EditableField
                            key="race"
                            defaultValue={this.state.fields.race}
                            id={'race'}
                            editMode={this.state.editMode}
                            handleChange={this.onHandleFieldChange}
                        />
                        <EditableField
                            key="ethnicity"
                            defaultValue={this.state.fields.ethnicity}
                            id={'ethnicity'}
                            editMode={this.state.editMode}
                            handleChange={this.onHandleFieldChange}
                        />
                    </div>
                    <Button
                        onClick={this.handleEditClick}
                        content={this.state.editMode ? 'Done' : 'Edit'}
                        size="small"
                    />
                    <br />
                    <EditableField
                        key="email"
                        defaultValue={this.state.fields.email}
                        id={'email'}
                        editMode={this.state.editMode}
                        handleChange={this.onHandleFieldChange}
                    />

                    <EditableField
                        key="phoneNumber"
                        defaultValue={this.state.fields.phoneNumber}
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
