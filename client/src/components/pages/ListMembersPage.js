import React, { Component } from 'react';

class ListMembersPage extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
    }
    componentDidMount() {
      this.loadMembersFromServer();
    }

    loadMembersFromServer = () => {
        // fetch returns a promise. If you are not familiar with promises, see
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
        fetch('/api/members/')
            .then(data => data.json())
            .then((res) => {
                if (!res.success) this.setState({
                    error: res.error
                });
                else this.setState({
                    data: res.data
                });
            });
    }

    render() {
        return (
            <div>
                {this.state.data.map(member => {
                    return <li key={member._id}>{member.firstName} {member.lastName}</li>;
                })}
            </div>
        );
    }
}

export default ListMembersPage;
