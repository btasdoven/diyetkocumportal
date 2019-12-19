
import envService from './env.service'
import dateFnsFormat from 'date-fns/format';

export const userService = {
    login,
    logout,
    get_groups,
    get_group_data,
    put_group_data,
    get_all_field_list,
    get_envanter,
    put_envanter,
    put_likes,
    get_likes,
    get_diary,
    put_diary,
    get_materials,
    set_material_part,
};

const HOST_NAME = envService.isProduction ? '' : 'http://localhost:4000';

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(HOST_NAME + `/api/v1/users/auth`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            console.log(user)
            console.log(localStorage.getItem('user'));

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    console.log("logout")
    localStorage.removeItem('user');
    console.log(localStorage.getItem('user'));
}

function get_groups(userId, groupId) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(HOST_NAME + `/api/v1/users/` + userId + `/groups/` + groupId, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function get_group_data(userId, groupId) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    groupId = groupId || "";
    
    return fetch(HOST_NAME + `/api/v1/users/` + userId + `/groups/` + groupId + `/fields`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function put_envanter(userId, user, val) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(val)
    };
    
    return fetch(HOST_NAME + `/api/v1/users/` + userId + `/envanter/` + user, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function get_envanter(userId, user) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    
    return fetch(HOST_NAME + `/api/v1/users/` + userId + `/envanter/` + user, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function put_likes(userId, kim, kimi, val) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(val)
    };
    
    return fetch(HOST_NAME + `/api/v1/users/` + userId + `/likes/` + kim + `/` + kimi, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function get_likes(userId, kim, kimi) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    
    return fetch(HOST_NAME + `/api/v1/users/` + userId + `/likes/` + kim + `/` + kimi, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function get_diary(userId) {
}

function put_diary(userId) {
}

function get_materials(userId, materialId) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    materialId = materialId || "";
    
    return fetch(HOST_NAME + `/api/v1/users/` + userId + `/materials/` + materialId, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function set_material_part(userId, groupId, partId, val) {

    console.log('set_material')
    console.log(groupId)
    console.log(partId)
    console.log(val);

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(val)
    };

    return fetch(HOST_NAME + `/api/v1/users/` + userId + `/materials/` + groupId + `/` + partId, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function get_all_field_list(userId) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(HOST_NAME + `/api/v1/users/` + userId + `/getAllFieldList`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function put_group_data(userId, groupId, val) {

    console.log('put_field_data')
    console.log(groupId)
    console.log(val);

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(val)
    };

    return fetch(HOST_NAME + `/api/v1/users/` + userId + `/groups/` + groupId, requestOptions)
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