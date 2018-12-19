export const userService = {
    login,
    logout,
    get_user_data,
    put_field_data
};

const HOST_NAME = process.env.NODE_ENV == 'development' ? 'http://localhost:4000' : '';

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    console.log(process.env);

    return fetch(HOST_NAME + `/api/v1/users/auth`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function get_user_data(userId) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(HOST_NAME + `/api/v1/users/` + userId + `/fields`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function put_field_data(userId, fieldId, val) {

    console.log('put_field_data')
    console.log(fieldId)
    console.log(val);

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(val)
    };

    return fetch(HOST_NAME + `/api/v1/users/` + userId + `/fields/` + fieldId, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function handleResponse(response) {
    return response.text().then(text => {
        console.log(text);
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            console.log(error);
            return Promise.reject(error);
        }

        return data;
    });
}