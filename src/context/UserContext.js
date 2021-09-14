import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext()

//export const UserProvider = UserContext.Provider
class UserProvider extends React.Component {
    state = {
        user: {
            username: '',
            token: ''
        }
    }

    setToken = (token) => {
        this.setState((prevState) => ({ 'token': token }));
    }

    setUsername = (username) => {
        this.setState((prevState) => ({ 'username': username }));
    }

    render() {
        const { children } = this.props;
        const { token } = this.state;
        const { setToken } = this;
        const { username } = this.state;
        const { setUsername } = this;

        return (
            <UserContext.Provider value={{ token, setToken, username, setUsername }}>
                { children }
            </UserContext.Provider>
        )
    }
}

export const UserConsumer = UserContext.Consumer
export { UserProvider }

// sets a "global"-ish context so that the properties become available to the entire app. Seems like an alternative to Redux.
export default UserContext;