
import envService from './env.service'
import dateFnsFormat from 'date-fns/format';

export const userService = {
    login,
    logout,
    get_message_previews,
    get_danisan_previews,
    new_danisan,
    get_danisan_profile,
    put_danisan_profile,
    get_danisan_notes,
    put_danisan_notes,
    get_danisan_diet_list,
    put_danisan_diet_list,
    get_dietitian_profile,
    put_dietitian_profile,
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

function get_message_previews(userId) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(HOST_NAME + `/api/v1/users/` + userId + `/messagePreviews`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function get_danisan_previews(userId) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(HOST_NAME + `/api/v1/users/` + userId + `/danisanPreviews`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function new_danisan(userId, newDanisanPreview) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDanisanPreview)
    };
    
    return fetch(HOST_NAME + `/api/v1/users/` + userId + `/danisans/` + newDanisanPreview.username, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function get_dietitian_profile(userId) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    
    return fetch(HOST_NAME + `/api/v1/users/` + userId + `/profile`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function put_dietitian_profile(userId, dietitianProfile) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dietitianProfile)
    };
    
    return fetch(HOST_NAME + `/api/v1/users/` + userId + `/profile`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function get_danisan_profile(userId, danisanUserName) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    
    return fetch(HOST_NAME + `/api/v1/users/` + userId + `/danisans/` + danisanUserName + `/profile`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function put_danisan_profile(userId, danisanUserName, danisanProfile) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(danisanProfile)
    };
    
    return fetch(HOST_NAME + `/api/v1/users/` + userId + `/danisans/` + danisanUserName + `/profile`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function get_danisan_notes(userId, danisanUserName) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    
    return fetch(HOST_NAME + `/api/v1/users/` + userId + `/danisans/` + danisanUserName + `/notes`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function put_danisan_notes(userId, danisanUserName, danisanNotes) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(danisanNotes)
    };
    
    return fetch(HOST_NAME + `/api/v1/users/` + userId + `/danisans/` + danisanUserName + `/notes`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function get_danisan_diet_list(userId, danisanUserName) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    
    return fetch(HOST_NAME + `/api/v1/users/` + userId + `/danisans/` + danisanUserName + `/dietlist`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function put_danisan_diet_list(userId, danisanUserName, danisanDietList) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(danisanDietList)
    };
    
    return fetch(HOST_NAME + `/api/v1/users/` + userId + `/danisans/` + danisanUserName + `/dietlist`, requestOptions)
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

function put_likes(userId, kim, kimi, commentIdx, val) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(val)
    };
    
    
    console.log("put_likes")
    console.log(commentIdx)
    console.log(val)

    return fetch(HOST_NAME + `/api/v1/users/` + userId + `/likes/` + kim + `/` + kimi + `/` + commentIdx, requestOptions)
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