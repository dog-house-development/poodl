import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import EditableField from './EditableField';
import EditableRadio from './EditableRadio';
import EditableCheckBox from './EditableCheckBox';
import EditableComboBox from './EditableComboBox';
import EditableMultiCheckbox from './EditableMultiCheckbox';
import EditableDateTime from './EditableDateTime';
import { withRouter } from 'react-router';
import Button from './Button';

export class EditableProfile extends Component {
    static propTypes = {
        categories: PropTypes.object.isRequired,
        fields: PropTypes.array.isRequired,
        editProfile: PropTypes.func.isRequired,
        getProfile: PropTypes.func.isRequired,
        profile: PropTypes.object,
        data: PropTypes.array
    };

    constructor(props) {
        super(props);
        this.state = {
            editMode: _.fromPairs(_.map(_.values(this.props.categories), category => [category.id, false])),
            fields: { ...this.props.profile },
            modifiedFields: {}
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);

        this.routeParam = props.match.params.id;
    }

    componentDidMount() {
        // call redux action to retrieve specified profile from api
        this.props.getProfile(this.routeParam);
    }

    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(prevProps.profile, this.props.profile)) {
            this.setState({
                fields: {
                    ...this.props.profile
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
        } else if (e.target.type === 'multibox') {
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
            this.props.editProfile(this.routeParam, this.state.modifiedFields);
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
                        id={this.props.categories[key].id}
                        onClick={this.handleEditClick}
                        size="small"
                    />
                </div>
            </div>
        );
        fieldsMarkup.push(
            _.map(_.filter(this.props.fields, field => field.category === key), field => {
                if (field.type === 'checkbox') {
                    return (
                        <EditableCheckBox
                            id={field.id}
                            key={field.id}
                            value={this.state.fields[field.id]}
                            editMode={this.state.editMode[field.category]}
                            onChange={this.handleFieldChange}
                            label={field.label}
                        />
                    );
                } else if (field.type === 'combobox') {
                    return (
                        <EditableComboBox
                            data={this.props.data}
                            placeholder={field.placeholder}
                            id={field.id}
                            key={field.id}
                            value={this.state.fields[field.id]}
                            options={field.options}
                            editMode={this.state.editMode[field.category]}
                            onChange={this.handleFieldChange}
                            label={field.label}
                        />
                    );
                } else if (field.type === 'datetime') {
                    return (
                        <EditableDateTime
                            placeholder={field.placeholder}
                            id={field.id}
                            key={field.id}
                            value={this.state.fields[field.id]}
                            options={field.options}
                            editMode={this.state.editMode[field.category]}
                            onChange={this.handleFieldChange}
                            label={field.label}
                            startDate={this.props.startDate}
                            endDate={this.props.endDate}
                        />
                    );
                } else if (field.type === 'radio') {
                    return (
                        <EditableRadio
                            id={field.id}
                            key={field.id}
                            value={this.state.fields[field.id]}
                            options={field.options}
                            editMode={this.state.editMode[field.category]}
                            onChange={this.handleFieldChange}
                            label={field.label}
                        />
                    );
                } else if (field.type === 'multibox') {
                    return (
                        <EditableMultiCheckbox
                            id={field.id}
                            key={field.id}
                            value={this.state.fields[field.id]}
                            options={field.options}
                            editMode={this.state.editMode[field.category]}
                            onChange={this.handleFieldChange}
                            label={field.label}
                        />
                    );
                } else {
                    return (
                        <EditableField
                            id={field.id}
                            key={field.id}
                            value={this.state.fields[field.id]}
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
        _.forEach(this.props.categories, (value, key) => {
            panelMarkup.push(
                <div className="panel" key={key}>
                    {this.getFieldsMarkup(value, key)}
                </div>
            );
        });
        return panelMarkup;
    }

    render() {
        return <div>{this.getPanelMarkup()}</div>;
    }
}

// withRouter because you need access to props.match
export default withRouter(EditableProfile);
