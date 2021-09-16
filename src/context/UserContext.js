import React, { createContext } from 'react';

export const UserContext = createContext()

//export const UserProvider = UserContext.Provider
class UserProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: localStorage.getItem('username'),
            token: localStorage.getItem('userToken'),
            isLoggedIn: false
        }
        this.setToken = this.setToken.bind(this);
        this.setUsername = this.setUsername.bind(this);
        this.setIsLoggedIn = this.setIsLoggedIn.bind(this);
        this.clearAllData = this.clearAllData.bind(this);
    }

    setToken(token) {
        console.log(`setting token to: ${token}`);
        let newState = { ...this.state, 'token': token };
        console.log(`newState is: `);
        console.log(newState);
        this.setState({ ...this.state, 'token': token });
        localStorage.setItem('userToken', token);
        console.log(this.state);
    }

    setUsername(username) {
        console.log(`setting username to: ${username}`);
        this.setState({ ...this.state, 'username': username });
        localStorage.setItem('username', username);
        console.log(this.state);
    }

    setIsLoggedIn(isLoggedIn) {
        this.setState({ ...this.state, 'isLoggedIn': isLoggedIn });
    }

    clearAllData() {
        console.log('Clearing all user data from storage...');
        this.setState({ username: '', token: '', isLoggedIn: false });
        console.log('UserContext state is:');
        console.log(this.state);
        localStorage.setItem('userToken', '');
        localStorage.setItem('username', '');
    }

    componentDidMount() {
        console.log('getting the user data?');
        console.log(this.state);
        fetch('http://127.0.0.1:8000/users/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.state.token
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
                this.clearAllData();
            }
        })
        .catch(e => {
            console.log('an error occurred.');
            this.clearAllData();
            //this.setToken(null);
        })
    }

    render() {
        const { children } = this.props;
        const { token } = this.state;
        const { setToken } = this;
        const { username } = this.state;
        const { setUsername } = this;
        const { isLoggedIn } = this.state;
        const { setIsLoggedIn } = this;
        const { clearAllData } = this;

        return (
            <UserContext.Provider value={{ token, setToken, username, setUsername, isLoggedIn, setIsLoggedIn, clearAllData }}>
                { children }
            </UserContext.Provider>
        )
    }
}

export const UserConsumer = UserContext.Consumer
export { UserProvider }

// sets a "global"-ish context so that the properties become available to the entire app. Seems like an alternative to Redux.
export default UserContext;