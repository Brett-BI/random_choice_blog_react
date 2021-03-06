async function getUserData() {
    
    let token = retrieveToken();

    if(token) {
        console.log('token found in localStorage');
        return fetch('http://127.0.0.1:8000/users/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        }).then(response => {
            console.log(response);
                if (response.ok) {
                    console.log('response ok...')
                    return response.json();
                } else {
                    return Promise.reject(response);
                }
            }   
        )
        .then(d => {
            return { ...d, isLoggedIn: true };
        })
        .catch(e => {
            console.log('(User) an error occurred in fetch.');
            //this.clearAllData();
            //this.setToken(null);
        })
    } else {
        console.log('token NOT found in localStorage');
        return {};
    }    
}

function setToken(token) {
    localStorage.setItem('userToken', token);
}

function retrieveToken() {
    return localStorage.getItem('userToken');
}

function logoutUser() {
    localStorage.setItem('userToken', '');
}

export { getUserData, logoutUser, setToken };