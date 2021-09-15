import React, { createContext } from 'react';

export const UserContext = createContext()

//export const UserProvider = UserContext.Provider
class UserProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: localStorage.getItem('username'),
                token: localStorage.getItem('userToken')
            }
        }
        this.setToken = this.setToken.bind(this);
        this.setUsername = this.setUsername.bind(this);
        this.clearAllData = this.clearAllData.bind(this);
    }

    setToken(token) {
        console.log(`setting token to: ${token}`);
        let newState = { user: { ...this.state.user, 'token': token }};
        console.log(`newState is: `);
        console.log(newState);
        this.setState({ user: { ...this.state.user, 'token': token }});
        localStorage.setItem('userToken', token);
        console.log(this.state);
    }

    setUsername(username) {
        console.log(`setting username to: ${username}`);
        this.setState({ user: { ...this.state.user, 'username': username }});
        localStorage.setItem('username', username);
        console.log(this.state);
    }

    clearAllData() {
        this.setState({ user: {}});
    }

    componentDidMount() {
        console.log('getting the user data?');
        console.log(this.state);
        fetch('http://127.0.0.1:8000/users/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.state.user.token
            }
        }).then(response => {
            console.log(response);
                if (response.ok) {
                    console.log('response is ok...');
                    return response.json();
                }

                return Promise.reject(response);
            }   
        )
        .then(d => {
            if(d.response === 200) {
                console.log(`access token: ${d.access_token}`);
                localStorage.setItem('userToken', d.access_token);
                this.setToken(d.access_token);
            } else {
                console.log("It's not OK...");
                //this.setToken(null);
            }
        })
        .catch(e => {
            console.log('an error occurred.');
            //this.setToken(null);
        })
    }

    render() {
        const { children } = this.props;
        const { token } = this.state.user;
        const { setToken } = this;
        const { username } = this.state.user;
        const { setUsername } = this;
        const { clearAllData } = this;

        return (
            <UserContext.Provider value={{ token, setToken, username, setUsername, clearAllData }}>
                { children }
            </UserContext.Provider>
        )
    }
}

export const UserConsumer = UserContext.Consumer
export { UserProvider }

// sets a "global"-ish context so that the properties become available to the entire app. Seems like an alternative to Redux.
export default UserContext;