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
                    ...this.props.member
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
                        <h3 className="profile-section-title">Contact Info</h3>
                        <Button
                            onClick={() => {
                                this.setState({ editContactMode: !this.state.editContactMode });
                            }}
                            content={this.state.editContactMode ? 'Done' : 'Edit'}
                            size="small"
                        />
                        <EditableField
                            key="email"
                            defaultValue={this.state.fields.email}
                            id="email"
                            editMode={this.state.editContactMode}
                            handleChange={this.onHandleFieldChange}
                            label="Email:"
                        />
                        <EditableField
                            key="phoneNumber"
                            defaultValue={this.state.fields.phoneNumber}
                            id="phoneNumber"
                            editMode={this.state.editContactMode}
                            handleChange={this.onHandleFieldChange}
                            label="Phone Number:"
                        />
                        <EditableField
                            key="address"
                            defaultValue={this.state.fields.address}
                            id="address"
                            editMode={this.state.editContactMode}
                            handleChange={this.onHandleFieldChange}
                            label="Address:"
                        />
                        <EditableField
                            key="emergencyContact"
                            defaultValue={this.state.fields.emergencyContact}
                            id="emergencyContact"
                            editMode={this.state.editContactMode}
                            handleChange={this.onHandleFieldChange}
                            label="Emergency Contact:"
                        />
                    </div>
                    <div className="panel">
                        <h3 className="profile-section-title">Personal Information </h3>
                        <Button
                            onClick={() => {
                                this.setState({ editMemberMode: !this.state.editMemberMode });
                            }}
                            content={this.state.editMemberMode ? 'Done' : 'Edit'}
                            size="small"
                        />
                        <EditableField
                            key="birthDate"
                            defaultValue={this.state.fields.birthDate}
                            id="birthDate"
                            editMode={this.state.editMemberMode}
                            handleChange={this.onHandleFieldChange}
                            label="Birth Date:"
                        />
                        <EditableField
                            key="seniorCenter"
                            defaultValue={this.state.fields.seniorCenter}
                            id="seniorCenter"
                            editMode={this.state.editMemberMode}
                            handleChange={this.onHandleFieldChange}
                            label="Senior Center:"
                        />
                        <EditableField
                            key="specialDiet"
                            defaultValue={this.state.fields.specialDiet}
                            id="specialDiet"
                            editMode={this.state.editMemberMode}
                            handleChange={this.onHandleFieldChange}
                            label="Special Diet:"
                        />
                        <EditableField
                            key="ethnicity"
                            defaultValue={this.state.fields.ethnicity}
                            id="ethnicity"
                            editMode={this.state.editMemberMode}
                            handleChange={this.onHandleFieldChange}
                            label="Medical Issues:"
                        />
                        <EditableField
                            key="disabilities"
                            defaultValue={this.state.fields.disabilities}
                            id="disabilities"
                            editMode={this.state.editMemberMode}
                            handleChange={this.onHandleFieldChange}
                            label="Disabilities:"
                        />
                        <EditableField
                            key="mealPreference"
                            defaultValue={this.state.fields.mealPreference}
                            id="mealPreference"
                            editMode={this.state.editMemberMode}
                            handleChange={this.onHandleFieldChange}
                            label="Meal Preference:"
                        />
                    </div>
                    <div className="panel">
                        <h3 className="profile-section-title">Membership Information</h3>
                        <Button
                            onClick={() => {
                                this.setState({ editMembershipMode: !this.state.editMembershipMode });
                            }}
                            content={this.state.editMembershipMode ? 'Done' : 'Edit'}
                            size="small"
                        />
                        <EditableBoolean
                            key="memberisNewOrRenewal"
                            defaultValue={this.state.fields.memberisNewOrRenewal}
                            optionValues={['New', 'Renewal']}
                            name="memberIsNewOrRenewal"
                            id="memberisNewOrRenewal"
                            editMode={this.state.editMembershipMode}
                            handleChange={this.onHandleOptionChange}
                            label="Membership:"
                        />
                        <EditableField
                            key="membershipDate"
                            defaultValue={this.state.fields.membershipDate}
                            id="membershipDate"
                            editMode={this.state.editMembershipMode}
                            handleChange={this.onHandleFieldChange}
                            label="Membership Date:"
                        />
                        <EditableField
                            key="renewalDate"
                            defaultValue={this.state.fields.renewalDate}
                            id="renewalDate"
                            editMode={this.state.editMembershipMode}
                            handleChange={this.onHandleFieldChange}
                            label="Renewal Date:"
                        />
                        <EditableBoolean
                            key="formOfPayment"
                            defaultValue={this.state.fields.formOfPayment}
                            optionValues={['Cash', 'Check']}
                            name="formOfPayment"
                            id="formOfPayment"
                            editMode={this.state.editMembershipMode}
                            handleChange={this.onHandleOptionChange}
                            label="Payment Form:"
                        />
                        <EditableField
                            key="bankCheckNumber"
                            defaultValue={this.state.fields.bankCheckNumber}
                            id="bankCheckNumber"
                            editMode={this.state.editMembershipMode}
                            handleChange={this.onHandleFieldChange}
                            label="Bank Check Number:"
                        />
                        <EditableBoolean
                            key="includedInEstatePlans"
                            defaultValue={this.state.fields.includedInEstatePlans}
                            optionValues={['Yes', 'No']}
                            name="includedInEstatePlans"
                            id="includedInEstatePlans"
                            editMode={this.state.editMembershipMode}
                            handleChange={this.onHandleOptionChange}
                            label="Member Included Senior Center In Estate Plans:"
                        />
                        <EditableBoolean
                            key="wantsEstateInfo"
                            defaultValue={this.state.fields.wantsEstateInfo}
                            optionValues={['Yes', 'No']}
                            name="wantsEstateInfo"
                            id="wantsEstateInfo"
                            editMode={this.state.editMembershipMode}
                            handleChange={this.onHandleOptionChange}
                            label="Member Wants Info About Including Senior Center In Estate Plans:"
                        />
                    </div>
                    <div className="panel">
                        <h3 className="profile-section-title">Demographic Information</h3>
                        <Button
                            onClick={() => {
                                this.setState({ editDemographicMode: !this.state.editDemographicMode });
                            }}
                            content={this.state.editDemographicMode ? 'Done' : 'Edit'}
                            size="small"
                        />
                        <EditableField
                            key="race"
                            defaultValue={this.state.fields.race}
                            id="race"
                            editMode={this.state.editDemographicMode}
                            handleChange={this.onHandleFieldChange}
                            label="Race:"
                        />
                        <EditableField
                            key="ethnicity"
                            defaultValue={this.state.fields.ethnicity}
                            id="ethnicity"
                            editMode={this.state.editDemographicMode}
                            handleChange={this.onHandleFieldChange}
                            label="Ethnicity:"
                        />
                        <EditableField
                            key="numberInHousehold"
                            defaultValue={this.state.fields.numberInHousehold}
                            id="numberInHousehold"
                            editMode={this.state.editDemographicMode}
                            handleChange={this.onHandleFieldChange}
                            label="Number In Household:"
                        />
                        <EditableField
                            key="monthlyIncome"
                            defaultValue={this.state.fields.monthlyIncome}
                            id="monthlyIncome"
                            editMode={this.state.editDemographicMode}
                            handleChange={this.onHandleFieldChange}
                            label="Monthly Income:"
                        />
                        <EditableBoolean
                            key="Disabled"
                            defaultValue={this.state.fields.Disabled}
                            optionValues={['Yes', 'No']}
                            name="Disabled"
                            id="Disabled"
                            editMode={this.state.editDemographicMode}
                            handleChange={this.onHandleOptionChange}
                            label="Disabled:"
                        />
                        <EditableBoolean
                            key="Veteran"
                            defaultValue={this.state.fields.Veteran}
                            optionValues={['Yes', 'No']}
                            name="Veteran"
                            id="Veteran"
                            editMode={this.state.editDemographicMode}
                            handleChange={this.onHandleOptionChange}
                            label="Veteran:"
                        />
                        <EditableBoolean
                            key="isSpouse60"
                            defaultValue={this.state.fields.isSpouse60}
                            optionValues={['Yes', 'No']}
                            name="isSpouse60"
                            id="isSpouse60"
                            editMode={this.state.editDemographicMode}
                            handleChange={this.onHandleOptionChange}
                            label="Spouse Over 60:"
                        />
                        <EditableBoolean
                            key="wantsEstateInfo"
                            defaultValue={this.state.fields.wantsEstateInfo}
                            optionValues={['Yes', 'No']}
                            name="wantsEstateInfo"
                            id="wantsEstateInfo"
                            editMode={this.state.editDemographicMode}
                            handleChange={this.onHandleOptionChange}
                            label="Disabled & Living With Someone Over 60:"
                        />
                        <EditableField
                            key="caregiver"
                            defaultValue={this.state.fields.caregiver}
                            id="caregiver"
                            editMode={this.state.editDemographicMode}
                            handleChange={this.onHandleFieldChange}
                            label="Caregiver:"
                        />
                        <EditableField
                            key="grandparent"
                            defaultValue={this.state.fields.grandparent}
                            id="grandparent"
                            editMode={this.state.editDemographicMode}
                            handleChange={this.onHandleFieldChange}
                            label="Grandparent:"
                        />
                        <EditableBoolean
                            key="needsAADL"
                            defaultValue={this.state.fields.needsAADL}
                            optionValues={['Yes', 'No']}
                            name="needsAADL"
                            id="needsAADL"
                            editMode={this.state.editDemographicMode}
                            handleChange={this.onHandleOptionChange}
                            label="needsAADL:"
                        />
                        <EditableBoolean
                            key="needsIADL"
                            defaultValue={this.state.fields.needsIADL}
                            optionValues={['Yes', 'No']}
                            name="needsIADL"
                            id="needsIADL"
                            editMode={this.state.editDemographicMode}
                            handleChange={this.onHandleOptionChange}
                            label="needsIADL:"
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
                <div>{this.getPageMarkup()}</div>
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
