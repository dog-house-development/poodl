import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MemberActions from '../../../actions/adminActions';
import _ from 'lodash';
import moment from 'moment';
import DatePicker from '../../ui/DatePicker';
import TimePicker from '../../ui/TimePicker';
import Field from '../../ui/Field';
import Button from '../../ui/Button';
import EditableField from '../../ui/EditableField';
import EditableRadio from '../../ui/EditableRadio';
import EditableCheckBox from '../../ui/EditableCheckBox';

const propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

export class AddMember extends Component {
    constructor(props) {
        super(props);

        this.state = {
            genderOptions: ['Male', 'Female', 'Other'],
            renewalOptions: ['New', 'Renewal'],
            paymentOptions: ['Cash', 'Check'],
            yesNoOptions: ['Yes', 'No'],
            raceOptions: [
                'White',
                'American Indian/Alaskan Native',
                'Asian American',
                'African American',
                'Native Hawaiian/Pacific Islander',
                'Other'
            ],
            ethnicityOptions: ['Non-Hispanic/Latino', 'Hispanic/Latino'],
            incomeOptions: [
                'Under $1,012',
                'Under $1,372',
                'Under $1,732',
                'Under $2,092',
                'Under $2,452',
                'Under $2,812',
                'Over $3,172'
            ],
            firstName: '',
            lastName: '',
            birthDate: moment().startOf('day'),
            email: '',
            seniorCenterId: props.adminSeniorCenterId,
            address: '',
            seniorCenterId: '',
            membershipDate: moment().startOf('day'),
            renewalDate: moment()
                .startOf('day')
                .add(1, 'day'),
            mealPreference: '',
            memberIsNewOrRenewal: 'New',
            gender: '',
            disabilities: '',
            medicalIssues: '',
            specialDiet: '',
            isDisabled: false,
            isSpouse60: false,
            isVeteran: false,
            monthlyIncome: '',
            ethnicity: '',
            isPersonCaregiver: false,
            numberInHousehold: '',
            race: '',
            bankCheckNumber: '',
            formOfPayment: '',
            includedInEstatePlans: false,
            emergencyContactName: '',
            emergencyContactPhoneNumber: '',
            emergencyContactRelationship: '',
            caregiver: '',
            grandparent: '',
            needsAADL: '',
            needsIADL: '',
            numberOfKidsUnder19: ''
        };
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const memberDate = this.state.membershipDate;
        const renewDate = this.state.renewalDate;

        const newMember = {
            ...this.state,
            membershipDate: memberDate.toISOString(),
            renewalDate: renewDate.toISOString()
        };

        this.props.memberActions.create(newMember, this.props.history);
    };

    getPersonalFields = () => {
        const { errors } = this.props;
        const fields = [
            {
                onChange: this.onChange,
                error: errors.firstName,
                id: 'firstName',
                type: 'text',
                label: 'First name',
                sidebyside: 1,
                placeholder: 'John...',
                autoComplete: 'off'
            },
            {
                onChange: this.onChange,
                error: errors.lastName,
                id: 'lastName',
                type: 'text',
                label: 'Last name',
                sidebyside: 2,
                placeholder: 'Smith...',
                autoComplete: 'off'
            },
            {
                onChange: this.onChange,
                error: errors.email,
                id: 'email',
                type: 'email',
                label: 'Email',
                placeholder: 'example@poodl.com...',
                autoComplete: 'off'
            },
            {
                onChange: this.onChange,
                error: errors.address,
                id: 'address',
                type: 'text',
                label: 'Address',
                placeholder: '123 Example Street, City, ST 00000...',
                autoComplete: 'off'
            }
        ];
        return fields;
    };

    getEmergencyFields = () => {
        const { errors } = this.props;
        const fields = [
            {
                onChange: this.onChange,
                error: errors.emergencyContactName,
                id: 'emergencyContactName',
                type: 'text',
                label: 'Full Name',
                placeholder: 'John Smith...',
                sidebyside: 1,
                autoComplete: 'off'
            },
            {
                onChange: this.onChange,
                error: errors.emergencyContactPhoneNumber,
                id: 'emergencyContactPhoneNumber',
                type: 'text',
                label: 'Phone Number',
                placeholder: '1113334444...',
                sidebyside: 2,
                autoComplete: 'off'
            },
            {
                onChange: this.onChange,
                error: errors.emergencyContactRelationship,
                id: 'emergencyContactRelationship',
                type: 'text',
                label: 'Relationship to Member',
                placeholder: 'Son, Daughter, Sister, Spouse...',
                autoComplete: 'off'
            },
            {
                onChange: this.onChange,
                error: errors.address,
                id: 'address',
                type: 'text',
                label: 'Address',
                placeholder: '123 Example Street, City, ST 00000...',
                autoComplete: 'off'
            }
        ];
        return fields;
    };

    getPersonalFieldsMarkup() {
        return _.map(this.getPersonalFields(), field => <Field key={field.id} {...field} />);
    }
    getEmergencyFieldsMarkup() {
        return _.map(this.getEmergencyFields(), field => <Field key={field.id} {...field} />);
    }

    render() {
        return (
            <div className="add-member-container">
                <Link to="/dashboard" className="button small tertiary">
                    <i className="material-icons">keyboard_backspace</i> Back to home
                </Link>
                <div className="add-member-panel panel">
                    <h1 className="panel-title">Add Member</h1>
                    <form noValidate onSubmit={this.onSubmit}>
                        <div className="add-member-panel panel">
                            <h2 className="panel-title">Personal Info</h2>
                            {this.getPersonalFieldsMarkup()}
                            <div className="side-by-side">
                                <DatePicker
                                    title="Birth Date"
                                    name="birthDate"
                                    date={this.state.birthDate}
                                    onChange={this.onValueChange}
                                />
                                <EditableRadio
                                    id="gender"
                                    key="gender"
                                    options={this.state.genderOptions}
                                    handleChange={this.handleFieldChange}
                                    label="Gender"
                                    editMode={true}
                                />
                            </div>
                        </div>
                        <div className="add-member-panel panel">
                            <h2 className="panel-title">Emergency Contact Info</h2>
                            {this.getEmergencyFieldsMarkup()}
                        </div>
                        <div className="add-member-panel panel">
                            <h2 className="panel-title">Membership Details</h2>
                            <div className="side-by-side">
                                <EditableRadio
                                    id="memberIsNewOrRenewal"
                                    key="memberIsNewOrRenewal"
                                    options={this.state.renewalOptions}
                                    handleChange={this.handleFieldChange}
                                    label="Member Is New Or Renewal"
                                    editMode={true}
                                />
                                <EditableRadio
                                    id="formOfPayment"
                                    key="formOfPayment"
                                    options={this.state.paymentOptions}
                                    handleChange={this.handleFieldChange}
                                    label="Method of Payment"
                                    editMode={true}
                                />
                            </div>
                            <EditableField
                                id="bankCheckNumber"
                                key="bankCheckNumber"
                                editMode={true}
                                handleChange={this.handleFieldChange}
                                label="Bank Check Number"
                            />
                            <div className="side-by-side">
                                <EditableRadio
                                    id="includedInEstatePlans"
                                    key="includedInEstatePlans"
                                    options={this.state.yesNoOptions}
                                    handleChange={this.handleFieldChange}
                                    label="Included in Estate Plans"
                                    editMode={true}
                                />
                                <EditableRadio
                                    id="wantsEstateInfo"
                                    key="wantsEstateInfo"
                                    options={this.state.yesNoOptions}
                                    handleChange={this.handleFieldChange}
                                    label="Wants Estate Info"
                                    editMode={true}
                                />
                            </div>
                            <div className="side-by-side">
                                <DatePicker
                                    title="membershipDate"
                                    name="membershipDate"
                                    date={this.state.membershipDate}
                                    onChange={this.onValueChange}
                                />
                                <DatePicker
                                    title="Renewal Date"
                                    name="renewalDate"
                                    date={this.state.renewalDate}
                                    onChange={this.onValueChange}
                                />
                            </div>
                        </div>
                        <div className="add-member-panel panel">
                            <h2 className="panel-title">Demographic Info</h2>
                            <div className="side-by-side">
                                <EditableRadio
                                    id="race"
                                    key="race"
                                    options={this.state.raceOptions}
                                    handleChange={this.handleFieldChange}
                                    label="Race"
                                    editMode={true}
                                />
                                <EditableRadio
                                    id="ethnicity"
                                    key="ethnicity"
                                    options={this.state.ethnicityOptions}
                                    handleChange={this.handleFieldChange}
                                    label="ethnicity"
                                    editMode={true}
                                />
                            </div>
                            <div className="side-by-side">
                                <EditableField
                                    id="numberInHousehold"
                                    key="numberInHousehold"
                                    editMode={true}
                                    handleChange={this.handleFieldChange}
                                    label="Number In Household"
                                />
                                <EditableRadio
                                    id="isPersonCaregiver"
                                    key="isPersonCaregiver"
                                    options={this.state.yesNoOptions}
                                    handleChange={this.handleFieldChange}
                                    label="If two or more, is one person a caregiver?"
                                    editMode={true}
                                />
                            </div>
                        </div>
                        <div className="add-member-panel panel">
                            <h2 className="panel-title">Health Info</h2>
                            {this.getEmergencyFieldsMarkup()}
                        </div>
                        <div className="add-member-panel panel">
                            <h2 className="panel-title">National Family Caregiver Support Program</h2>
                            If client is receiving services under National Family Caregiver Support Program, complete
                            the following
                            {this.getEmergencyFieldsMarkup()}
                        </div>

                        <Button type="submit" content="Add Member" formButton />
                    </form>
                </div>
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        auth: state.auth,
        adminSeniorCenterId: _.get(state.auth.admin, 'seniorCenterId'),
        errors: state.members.errors
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        memberActions: bindActionCreators(MemberActions, dispatch)
    };
};

AddMember.propTypes = propTypes;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(AddMember));
