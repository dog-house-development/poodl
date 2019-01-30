import React, {Component} from 'react';
import Form from '../inputs/Form';

class RegisterMemberPage extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            error: null,
            firstName: '',
            lastName: ''
        };
        this.getFields = this.getFields.bind(this);
    }
    // componentDidMount() {
    //   this.loadCommentsFromServer();
    //   if (!this.pollInterval) {
    //     this.pollInterval = setInterval(this.loadCommentsFromServer, 2000);
    //   }
    // }

    submitMember = (e) => {
        e.preventDefault();
        const {
            firstName,
            lastName
        } = this.state;
        if (!firstName || !lastName) return;
        fetch('/api/members', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName,
                lastName
            }),
        }).then(res => res.json()).then((res) => {
            if (!res.success) this.setState({
                error: res.error.message || res.error
            });
            else this.setState({
                firstName: '',
                lastName: '',
                error: null
            });
        });
    }

    // onUpdateMember = (id) => {
    //     const oldMember = this.state.data.find(c => c._id === id);
    //     if (!oldMember) return;
    //     this.setState({
    //         firstName: oldMember.firstName,
    //         lastName: oldMember.lastName,
    //         updateId: id
    //     });
    // }

    // onDeleteMember = (id) => {
    //     const i = this.state.data.findIndex(c => c._id === id);
    //     const data = [
    //         ...this.state.data.slice(0, i),
    //         ...this.state.data.slice(i + 1),
    //     ];
    //     this.setState({
    //         data
    //     });
    //     fetch(`api/comments/${id}`, {
    //             method: 'DELETE'
    //         })
    //         .then(res => res.json()).then((res) => {
    //             if (!res.success) this.setState({
    //                 error: res.error
    //             });
    //         });
    // }

    submitMember = (e) => {
        e.preventDefault();
        const {
            firstName,
            lastName,
            updateId
        } = this.state;
        if (!firstName || !lastName) return;
        if (updateId) {
            this.submitUpdatedMember();
        } else {
            this.submitNewMember();
        }
    }

    submitNewMember = () => {
        const {
            firstName,
            lastName
        } = this.state;
        const data = [
            ...this.state.data,
            {
                firstName,
                lastName,
                _id: Date.now().toString(),
                updatedAt: new Date(),
                createdAt: new Date()
            },
        ];
        this.setState({
            data
        });
        fetch('/api/members', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName,
                lastName
            }),
        }).then(res => res.json()).then((res) => {
            if (!res.success) this.setState({
                error: res.error.message || res.error
            });
            else this.setState({
                firstName: '',
                lastName: '',
                error: null
            });
        });
    }

    submitUpdatedMember = () => {
        const {
            firstName,
            lastName,
            updateId
        } = this.state;
        fetch(`/api/members/${updateId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName,
                lastName
            }),
        }).then(res => res.json()).then((res) => {
            if (!res.success) this.setState({
                error: res.error.message || res.error
            });
            else this.setState({
                author: '',
                text: '',
                updateId: null
            });
        });
    }

    onChangeText = (e) => {
        const newState = {
            ...this.state
        };
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }

    getFields() {
        const fields = [
            {
                name: 'firstName',
                label: 'Enter the first name',
                onChange: this.onChangeText,
                placeholder: 'First name...'
            },
            {
                name: 'lastName',
                label: 'Enter the last name',
                onChange: this.onChangeText,
                placeholder: 'Last name...'
            }
        ];
        return fields;
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.submitMember} fields={this.getFields()} />
            </div>
        );
    }
}

export default RegisterMemberPage;
