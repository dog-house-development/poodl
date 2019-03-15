import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchMember } from '../../../actions/memberActions';
import { modifyMember } from '../../../actions/memberActions';
import Loading from '../../ui/Loading';
import EditableField from '../../ui/EditableField';
import EditableBoolean from '../../ui/EditableBoolean';
import { Link } from 'react-router-dom';
import Button from '../../ui/Button';

export class MemberProfile extends Component {
    constructor(props) {
        super(props);
        this.routeParam = props.match.params.id;
        this.state = {
            editContactMode: false,
            editMemberMode: false,
            editMembershipMode: false,
            editDemographicMode: false,

            options: {
                memberisNewOrRenewal: true, //New
                formOfPayment: true, // Cash
                includedInEstatePlans: true,
                wantsEstateInfo: true,
                isPersonCaregiver: true,
                monthlyIncome: '',
                isDisabled: true,
                isVeteran: true,
                isSpouse60: true,
                isDisabled60: true,
                caregiver: '',
                needsAADL: true,
                needsIADL: true
            },
            fields: {
                email: '',
                address: '',
                birthDate: '',
                phoneNumber: '',
                emergencyContact: '',
                seniorCenter: '',
                emergencyContact: ['', '', ''],
                bankCheckNumber: '',
                renewalDate: '',
                specialDiet: ['', ''],
                medicalIssues: ['', ''],
                disabilities: ['', ''],
                mealPreference: '',
                race: '',
                ethnicity: '',
                numberInHousehold: 0
            }
        };
        this.handleEditMemberClick = this.handleEditMemberClick.bind(this);
        this.handleEditContactClick = this.handleEditContactClick.bind(this);
        this.handleEditMembershipClick = this.handleEditMembershipClick.bind(this);
        this.handleEditDemographicClick = this.handleEditDemographicClick.bind(this);
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
                    phoneNumber: this.props.member.phoneNumber,
                    address: this.props.member.address,
                    emergencyContact: this.props.member.emergencyContact,
                    seniorCenter: this.props.member.seniorCenter,
                    emergencyContact: this.props.member.emergencyContact,
                    memberisNewOrRenewal: this.props.member.memberisNewOrRenewal, //
                    formOfPayment: this.props.member.formOfPayment, // Cash
                    bankCheckNumber: this.props.member.bankCheckNumber,
                    includedInEstatePlans: this.props.member.includedInEstatePlans,
                    wantsEstateInfo: this.props.member.wantsEstateInfo,
                    renewalDate: this.props.member.renewalDate,
                    specialDiet: this.props.member.specialDiet,
                    medicalIssues: this.props.member.medical,
                    disabilities: this.props.member.disabilities,
                    mealPreference: this.props.member.mealPreference,
                    race: this.props.member.race,
                    ethnicity: this.props.member.ethnicity,
                    numberInHousehold: this.props.member.numberInHousehold,
                    isPersonCaregiver: this.props.member.isPersonCaregiver,
                    monthlyIncome: this.props.member.monthlyIncome,
                    isDisabled: this.props.member.isDisabled,
                    isVeteran: this.props.member.isVeteran,
                    isSpouse60: this.props.member.isSpouse60,
                    isDisabled60: this.props.member.isDisabled60,
                    caregiver: this.props.member.caregiver,
                    needsAADL: this.props.member.needsAADL,
                    needsIADL: this.props.member.needsIADL
                }
            });
        }
    }

    handleEditContactClick(e) {
        e.preventDefault();
        this.setState({ editContactMode: !this.state.editContactMode });
        if (this.state.editContactMode) {
            console.log(this.state.fields);
            // send the api edit request with this.state as the information
            this.props.editMember(this.state);
        }
    }
    handleEditMemberClick(e) {
        e.preventDefault();
        this.setState({ editMemberMode: !this.state.editMemberMode });
        if (this.state.editMemberMode) {
            console.log(this.state.fields);
            // send the api edit request with this.state as the information
            this.props.editMember(this.state);
        }
    }

    handleEditMembershipClick(e) {
        e.preventDefault();
        this.setState({ editMembershipMode: !this.state.editMembershipMode });
        if (this.state.editMembershipMode) {
            console.log(this.state.fields);
            // send the api edit request with this.state as the information
            this.props.editMember(this.state);
        }
    }

    handleEditDemographicClick(e) {
        e.preventDefault();
        this.setState({ editDemographicMode: !this.state.editDemographicMode });
        if (this.state.editDemographicMode) {
            console.log(this.state.fields);
            // send the api edit request with this.state as the information
            this.props.editMember(this.state);
        }
    }

    onHandleFieldChange(e) {
        this.setState({
            fields: { ...this.state.fields, [e.target.id]: e.target.value }
        });
    }

    onHandleOptionChange(e) {
        this.setState({
            options: { ...this.state.options, [e.target.id]: e.target.value }
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
                        <Button
                            onClick={this.handleEditContactClick}
                            content={this.state.editContactMode ? 'Done' : 'Edit'}
                            size="small"
                        />
                        <h3>Contact Info</h3>
                        <h5>Email: </h5>
                        <EditableField
                            key="email"
                            defaultValue={this.state.fields.email}
                            id={'email'}
                            editMode={this.state.editContactMode}
                            handleChange={this.onHandleFieldChange}
                        />
                        <h5>Phone Number: </h5>
                        <EditableField
                            key="phoneNumber"
                            defaultValue={this.state.fields.phoneNumber}
                            id={'phoneNumber'}
                            editMode={this.state.editContactMode}
                            handleChange={this.onHandleFieldChange}
                        />
                        <h5>Address: </h5>
                        <EditableField
                            key="address"
                            defaultValue={this.state.fields.address}
                            id={'address'}
                            editMode={this.state.editContactMode}
                            handleChange={this.onHandleFieldChange}
                        />
                        <h5>Emergency Contact: </h5>
                        <EditableField
                            key="emergencyContact"
                            defaultValue={this.state.fields.emergencyContact}
                            id={'emergencyContact'}
                            editMode={this.state.editContactMode}
                            handleChange={this.onHandleFieldChange}
                        />
                    </div>
                    <div className="panel">
                        <Button
                            onClick={this.handleEditMemberClick}
                            content={this.state.editMemberMode ? 'Done' : 'Edit'}
                            size="small"
                        />
                        <h3>Member Info: </h3>
                        <h5>Birth Date: </h5>
                        <EditableField
                            key="birthDate"
                            defaultValue={this.state.fields.birthDate}
                            id={'birthDate'}
                            editMode={this.state.editMemberMode}
                            handleChange={this.onHandleFieldChange}
                        />
                        <h5>Senior Center: </h5>
                        <EditableField
                            key="seniorCenter"
                            defaultValue={this.state.fields.seniorCenter}
                            id={'seniorCenter'}
                            editMode={this.state.editMemberMode}
                            handleChange={this.onHandleFieldChange}
                        />
                        <h5>Special Diet: </h5>
                        <EditableField
                            key="specialDiet"
                            defaultValue={this.state.fields.specialDiet}
                            id={'specialDiet'}
                            editMode={this.state.editMemberMode}
                            handleChange={this.onHandleFieldChange}
                        />
                        <h5>Medical Issues: </h5>
                        <EditableField
                            key="ethnicity"
                            defaultValue={this.state.fields.ethnicity}
                            id={'ethnicity'}
                            editMode={this.state.editMemberMode}
                            handleChange={this.onHandleFieldChange}
                        />

                        <h5>Disabilities: </h5>
                        <EditableField
                            key="disabilities"
                            defaultValue={this.state.fields.disabilities}
                            id={'disabilities'}
                            editMode={this.state.editMemberMode}
                            handleChange={this.onHandleFieldChange}
                        />
                        <h5>Meal Preference: </h5>
                        <EditableField
                            key="mealPreference"
                            defaultValue={this.state.fields.mealPreference}
                            id={'mealPreference'}
                            editMode={this.state.editMemberMode}
                            handleChange={this.onHandleFieldChange}
                        />
                    </div>
                    <div className="panel">
                        <Button
                            onClick={this.handleEditMembershipClick}
                            content={this.state.editMembershipMode ? 'Done' : 'Edit'}
                            size="small"
                        />
                        <h3>Mebership Information</h3>
                        <h5>Membership: </h5>
                        <EditableBoolean
                            key="memberisNewOrRenewal"
                            defaultValue={this.state.fields.memberisNewOrRenewal}
                            optionValues={['New', 'Renewal']}
                            name={'memberIsNewOrRenewal'}
                            id={'memberisNewOrRenewal'}
                            editMode={this.state.editMembershipMode}
                            handleChange={this.onHandleOptionChange}
                        />
                        <h5>Membership Date: </h5>
                        <EditableField
                            key="membershipDate"
                            defaultValue={this.state.fields.membershipDate}
                            id={'membershipDate'}
                            editMode={this.state.editMembershipMode}
                            handleChange={this.onHandleFieldChange}
                        />
                        <h5>Renewal Date: </h5>
                        <EditableField
                            key="renewalDate"
                            defaultValue={this.state.fields.renewalDate}
                            id={'renewalDate'}
                            editMode={this.state.editMembershipMode}
                            handleChange={this.onHandleFieldChange}
                        />
                        <h5>Payment Form: </h5>
                        <EditableBoolean
                            key="formOfPayment"
                            defaultValue={this.state.fields.formOfPayment}
                            optionValues={['Cash', 'Check']}
                            name={'formOfPayment'}
                            id={'formOfPayment'}
                            editMode={this.state.editMembershipMode}
                            handleChange={this.onHandleOptionChange}
                        />
                        <h5>Bank Check Number: </h5>
                        <EditableField
                            key="bankCheckNumber"
                            defaultValue={this.state.fields.bankCheckNumber}
                            id={'bankCheckNumber'}
                            editMode={this.state.editMembershipMode}
                            handleChange={this.onHandleFieldChange}
                        />
                        <h5>Member Included Senior Center In Estate Plans: </h5>
                        <EditableBoolean
                            key="includedInEstatePlans"
                            defaultValue={this.state.fields.includedInEstatePlans}
                            optionValues={['Yes', 'No']}
                            name={'includedInEstatePlans'}
                            id={'includedInEstatePlans'}
                            editMode={this.state.editMembershipMode}
                            handleChange={this.onHandleOptionChange}
                        />
                        <h5>Member Wants Info About Including Senior Center In Estate Plans: </h5>
                        <EditableBoolean
                            key="wantsEstateInfo"
                            defaultValue={this.state.fields.wantsEstateInfo}
                            optionValues={['Yes', 'No']}
                            name={'wantsEstateInfo'}
                            id={'wantsEstateInfo'}
                            editMode={this.state.editMembershipMode}
                            handleChange={this.onHandleOptionChange}
                        />
                    </div>
                    <div className="panel">
                        <Button
                            onClick={this.handleEditDemographicClick}
                            content={this.state.editDemographicMode ? 'Done' : 'Edit'}
                            size="small"
                        />
                        <h3>Demographic Information: </h3>
                        <h5>Race: </h5>
                        <EditableField
                            key="race"
                            defaultValue={this.state.fields.race}
                            id={'race'}
                            editMode={this.state.editDemographicMode}
                            handleChange={this.onHandleFieldChange}
                        />

                        <h5>Ethnicity: </h5>
                        <EditableField
                            key="ethnicity"
                            defaultValue={this.state.fields.ethnicity}
                            id={'ethnicity'}
                            editMode={this.state.editDemographicMode}
                            handleChange={this.onHandleFieldChange}
                        />
                        <h5>Number In Household: </h5>
                        <EditableField
                            key="numberInHousehold"
                            defaultValue={this.state.fields.numberInHousehold}
                            id={'numberInHousehold'}
                            editMode={this.state.editDemographicMode}
                            handleChange={this.onHandleFieldChange}
                        />
                        <h5>Monthly Income: </h5>
                        <EditableField
                            key="monthlyIncome"
                            defaultValue={this.state.fields.monthlyIncome}
                            id={'monthlyIncome'}
                            editMode={this.state.editDemographicMode}
                            handleChange={this.onHandleFieldChange}
                        />
                        <h5>Disabled: </h5>
                        <EditableBoolean
                            key="Disabled"
                            defaultValue={this.state.fields.Disabled}
                            optionValues={['Yes', 'No']}
                            name={'Disabled'}
                            id={'Disabled'}
                            editMode={this.state.editDemographicMode}
                            handleChange={this.onHandleOptionChange}
                        />
                        <h5>Veteran: </h5>
                        <EditableBoolean
                            key="Veteran"
                            defaultValue={this.state.fields.Veteran}
                            optionValues={['Yes', 'No']}
                            name={'Veteran'}
                            id={'Veteran'}
                            editMode={this.state.editDemographicMode}
                            handleChange={this.onHandleOptionChange}
                        />
                        <h5>Spouse Over 60: </h5>
                        <EditableBoolean
                            key="isSpouse60"
                            defaultValue={this.state.fields.isSpouse60}
                            optionValues={['Yes', 'No']}
                            name={'isSpouse60'}
                            id={'isSpouse60'}
                            editMode={this.state.editDemographicMode}
                            handleChange={this.onHandleOptionChange}
                        />
                        <h5>Disabled & Living With Someone Over 60: </h5>
                        <EditableBoolean
                            key="wantsEstateInfo"
                            defaultValue={this.state.fields.wantsEstateInfo}
                            optionValues={['Yes', 'No']}
                            name={'wantsEstateInfo'}
                            id={'wantsEstateInfo'}
                            editMode={this.state.editDemographicMode}
                            handleChange={this.onHandleOptionChange}
                        />
                        <h5>Caregiver: </h5>
                        <EditableField
                            key="caregiver"
                            defaultValue={this.state.fields.caregiver}
                            id={'caregiver'}
                            editMode={this.state.editDemographicMode}
                            handleChange={this.onHandleFieldChange}
                        />
                        <h5>Grandparent: </h5>
                        <EditableField
                            key="grandparent"
                            defaultValue={this.state.fields.grandparent}
                            id={'grandparent'}
                            editMode={this.state.editDemographicMode}
                            handleChange={this.onHandleFieldChange}
                        />
                        <h5>needsAADL: </h5>
                        <EditableBoolean
                            key="needsAADL"
                            defaultValue={this.state.fields.needsAADL}
                            optionValues={['Yes', 'No']}
                            name={'needsAADL'}
                            id={'needsAADL'}
                            editMode={this.state.editDemographicMode}
                            handleChange={this.onHandleOptionChange}
                        />
                        <h5>needsIADL: </h5>
                        <EditableBoolean
                            key="needsIADL"
                            defaultValue={this.state.fields.needsIADL}
                            optionValues={['Yes', 'No']}
                            name={'needsIADL'}
                            id={'needsIADL'}
                            editMode={this.state.editDemographicMode}
                            handleChange={this.onHandleOptionChange}
                        />
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
        getMember: id => dispatch(fetchMember(id)),
        editMember: id => dispatch(modifyMember(id))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MemberProfile);
