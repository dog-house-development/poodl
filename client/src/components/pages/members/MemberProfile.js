import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import MemberActions from '../../../actions/memberActions';
import Loading from '../../ui/Loading';
import EditableField from '../../ui/EditableField';
import EditableRadio from '../../ui/EditableRadio';
import EditableCheckBox from '../../ui/EditableCheckBox';
import { Link } from 'react-router-dom';
import Button from '../../ui/Button';
import memberFields, { Categories } from './memberFields';

export class MemberProfile extends Component {
    constructor(props) {
        super(props);
        this.routeParam = props.match.params.id;
        this.state = {
            editMode: _.fromPairs(_.map(_.values(Categories), category => [category.id, false])),
            fields: _.fromPairs(
                _.map(memberFields, field => (field.type === 'checkbox' ? [field.id, false] : [field.id, '']))
            ),
            modifiedFields: {}
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
    }

    componentDidMount() {
        // call redux action to retrieve specified member from api
        this.props.memberActions.get(this.routeParam);
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

    handleFieldChange(e) {
        if (e.target.type === 'checkbox') {
            this.setState({
                fields: { ...this.state.fields, [e.target.id]: e.target.checked },
                modifiedFields: { ...this.state.modifiedFields, [e.target.id]: e.target.checked }
            });
        } else {
            this.setState({
                fields: { ...this.state.fields, [e.target.id]: e.target.value },
                modifiedFields: { ...this.state.modifiedFields, [e.target.id]: e.target.value }
            });
        }
    }

    handleEditClick(e) {
        e.preventDefault();
        if (this.state.editMode[e.target.id] && !_.isEmpty(this.state.modifiedFields)) {
            this.props.memberActions.edit(this.routeParam, this.state.modifiedFields);
            this.setState({ modifiedFields: {} });
        }
        this.setState({ editMode: { [e.target.id]: !this.state.editMode[e.target.id] } });
    }

    getFieldsMarkup(value, key) {
        let fieldsMarkup = [];

        fieldsMarkup.push(
            <div key={key} className="profile-section-header">
                <div className="profile-section-title-and-description">
                    <h3 className="profile-section-title">{value.title}</h3>
                    {value.description ? <p>{value.description}</p> : ''}
                </div>
                <div className="profile-section-button">
                    <Button
                        key={_.uniqueId('edit-button-')}
                        content={this.state.editMode[key] ? 'Done' : 'Edit'}
                        id={Categories[key].id}
                        onClick={this.handleEditClick}
                        size="small"
                    />
                </div>
            </div>
        );
        fieldsMarkup.push(
            _.map(_.filter(memberFields, field => field.category === key), field => {
                if (field.type === 'checkbox') {
                    return (
                        <EditableCheckBox
                            id={field.id}
                            key={field.id}
                            defaultValue={this.state.fields[field.id]}
                            editMode={this.state.editMode[field.category]}
                            handleChange={this.handleFieldChange}
                            label={field.label}
                        />
                    );
                } else if (field.type === 'radio') {
                    return (
                        <EditableRadio
                            id={field.id}
                            key={field.id}
                            defaultValue={this.state.fields[field.id]}
                            options={field.options}
                            editMode={this.state.editMode[field.category]}
                            handleChange={this.handleFieldChange}
                            label={field.label}
                        />
                    );
                } else {
                    return (
                        <EditableField
                            id={field.id}
                            key={field.id}
                            defaultValue={this.state.fields[field.id]}
                            editMode={this.state.editMode[field.category]}
                            handleChange={this.handleFieldChange}
                            label={field.label}
                        />
                    );
                }
            })
        );

        return fieldsMarkup;
    }

    getPanelMarkup() {
        let panelMarkup = [];
        _.forEach(Categories, (value, key) => {
            panelMarkup.push(
                <div className="panel" key={key}>
                    {this.getFieldsMarkup(value, key)}
                </div>
            );
        });
        return panelMarkup;
    }

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
                    <div>{this.getPanelMarkup()}</div>
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
