import { createContext } from 'react';

export const UserContext = createContext(
    {
        username: '',
        email: '',
        full_name: '',
        isLoggedIn: false
    }
);

export default UserContext;


// import React, { createContext } from 'react';

// export const UserContext = createContext()

// //export const UserProvider = UserContext.Provider
// class UserProvider extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             username: '',
//             email: '',
//             fullName: '',
//             token: localStorage.getItem('userToken'),
//             isLoggedIn: false
//         }
//         this.setToken = this.setToken.bind(this);
//         this.setUsername = this.setUsername.bind(this);
//         this.setIsLoggedIn = this.setIsLoggedIn.bind(this);
//         this.clearAllData = this.clearAllData.bind(this);
//     }

//     setToken(token) {
//         this.setState({ ...this.state, 'token': token });
//         localStorage.setItem('userToken', token);
//         console.log(`(UserContext) token set to: ${token}`);
//     }

//     setUsername(username) {
//         this.setState({ ...this.state, 'username': username });
//         console.log(`(UserContext) username set to: ${username}`);
//     }

//     setIsLoggedIn(isLoggedIn) {
//         this.setState({ ...this.state, 'isLoggedIn': isLoggedIn });
//         console.log(`(UserContext) isLoggedIn set to: ${isLoggedIn}`);
//     }

//     clearAllData() {
//         this.setState({ username: '', token: '', isLoggedIn: false });
//         localStorage.setItem('userToken', '');
//         console.log(`(UserContext) cleared all data.`);
//     }

//     componentDidMount() {
//         console.log(`(UserContext) did mount.`)
//         fetch('http://127.0.0.1:8000/users/me', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: 'Bearer ' + this.state.token
//             }
//         }).then(response => {
//             console.log(response);
//                 if (response.ok) {
//                     return response.json();
//                 }

//                 return Promise.reject(response);
//             }   
//         )
//         .then(d => {
//             console.log(`(UserContext) successfully retrieved user data:`);
//             console.log(d);
//             this.setState({ ...this.state, username: d.username, email: d.email, fullName: d.full_name, isLoggedIn: true });
//         })
//         .catch(e => {
//             console.log('(UserContext) an error occurred in fetch.');
//             this.clearAllData();
//             //this.setToken(null);
//         })
//     }

//     render() {
//         const { children } = this.props;
//         const { token } = this.state;
//         const { setToken } = this;
//         const { username } = this.state;
//         const { setUsername } = this;
//         const { isLoggedIn } = this.state;
//         const { setIsLoggedIn } = this;
//         const { clearAllData } = this;

//         return (
//             <UserContext.Provider value={{ token, setToken, username, setUsername, isLoggedIn, setIsLoggedIn, clearAllData }}>
//                 { children }
//             </UserContext.Provider>
//         )
//     }
// }

// const UserConsumer = UserContext.Consumer
// export { UserProvider, UserConsumer };

// // sets a "global"-ish context so that the properties become available to the entire app. Seems like an alternative to Redux.
// export default UserContext;