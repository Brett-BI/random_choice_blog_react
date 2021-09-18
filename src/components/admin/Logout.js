import React from 'react';
import { Redirect } from 'react-router-dom';

import { logoutUser } from '../../utils/User';

class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        logoutUser();
        this.props.setUser(
            {
                username: '',
                email: '',
                full_name: '',
                isLoggedIn: false
            }
        );
    }

    render() {
        return (
            <Redirect to="/login" />
        )
    }
}

export default Logout;