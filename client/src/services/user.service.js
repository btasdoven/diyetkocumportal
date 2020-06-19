
import envService from './env.service'
import dateFnsFormat from 'date-fns/format';
import axios from 'axios';

var JWT_TOKEN = undefined;
var localUser = JSON.parse(localStorage.getItem('user'))

if (localUser != undefined) {
    JWT_TOKEN = localUser.token;
}

export const userService = {
    login,
    relogin,
    logout,
    request_new_password_email,
    reset_password,
    signup,
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
    get_dietitian_appointments,
    put_dietitian_appointment,
    get_link_info,
    get_danisan_files,
    add_danisan_files,
    delete_danisan_measurement,
    get_danisan_measurements,
    add_danisan_measurement,
    add_danisan_measurement_with_photo,
    get_danisan_messages,
    add_danisan_message,
    read_danisan_message,
    delete_dietitian,
    get_all_dietitians,
    get_all_posts,
    get_dietitian_comments,
    put_dietitian_comments,
    post_dietitian_comment,
    upload_photo,
    add_new_post,
    add_payment,
    getStaticFileUri,
    track_activity,
};

const HOST_NAME = envService.isProduction ? '' : 'http://localhost:4000';

function getStaticFileUri(file) {
    if (file == undefined)
        return undefined;

    if (file.startsWith("http") || file.startsWith("/static/"))
        return file;

    return HOST_NAME + '/' + file;
}

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

                JWT_TOKEN = user.token;
            }

            envService.isProduction || console.log(user)

            return user;
        });
}

function relogin(username, userInfo) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, userInfo })
    };

    return fetch(HOST_NAME + `/api/v1/users/reauth`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            envService.isProduction || console.log(user)

            return user;
        });
}

function signup(username, userInfo) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfo)
    };

    return handleRequest(`/api/v1/users/signup`, requestOptions);
}

function reset_password(username, userInfo) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfo)
    };

    return handleRequest(`/api/v1/users/resetPassword`, requestOptions);
}

function request_new_password_email(username, userInfo) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfo)
    };

    return handleRequest(`/api/v1/users/requestNewPasswordEmail`, requestOptions);
}

function logout() {
    // remove user from local storage to log user out
    envService.isProduction || console.log("logout")
    localStorage.removeItem('user');
    envService.isProduction || console.log(localStorage.getItem('user'));
}

function get_message_previews(userId) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return handleRequest(`/api/v1/users/` + userId + `/messagePreviews`, requestOptions);
}

function get_danisan_previews(userId) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return handleRequest(`/api/v1/users/` + userId + `/danisanPreviews`, requestOptions);
}

function new_danisan(userId, newDanisanPreview) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDanisanPreview)
    };
    
    return handleRequest(`/api/v1/users/` + userId + `/danisans/` + newDanisanPreview.username, requestOptions);
}

function get_dietitian_appointments(userId, date) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    
    date = date == undefined ? '' : date;

    return handleRequest(`/api/v1/users/` + userId + `/appointments/` + date, requestOptions);
}

function put_dietitian_appointment(userId, date, time, values) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
    };
    
    return handleRequest(`/api/v1/users/` + userId + `/appointments/` + date + `/times/` + time, requestOptions);
}

function get_dietitian_profile(userId) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    
    return handleRequest(`/api/v1/users/` + userId + `/profile`, requestOptions);
}

function put_dietitian_profile(userId, dietitianProfile) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dietitianProfile)
    };
    
    return handleRequest(`/api/v1/users/` + userId + `/profile`, requestOptions);
}

function get_link_info(linkId) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    
    return handleRequest(`/api/v1/links/` + linkId, requestOptions);
}

function get_danisan_messages(userId, danisanUserName) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    
    return handleRequest(`/api/v1/users/` + userId + `/danisans/` + danisanUserName + `/messages`, requestOptions);
}

function add_danisan_message(userId, danisanUserName, message) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message)
    };
    
    return handleRequest(`/api/v1/users/` + userId + `/danisans/` + danisanUserName + `/messages/` + message.id, requestOptions);
}

function read_danisan_message(userId, danisanUserName) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };
    
    return handleRequest(`/api/v1/users/` + userId + `/danisans/` + danisanUserName + `/messages/read`, requestOptions);
}

function get_danisan_profile(userId, danisanUserName) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    
    return handleRequest(`/api/v1/users/` + userId + `/danisans/` + danisanUserName + `/profile`, requestOptions);
}

function put_danisan_profile(userId, danisanUserName, danisanProfile) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(danisanProfile)
    };
    
    return handleRequest(`/api/v1/users/` + userId + `/danisans/` + danisanUserName + `/profile`, requestOptions);
}

function get_danisan_files(userId, danisanUserName) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    
    return handleRequest(`/api/v1/users/` + userId + `/danisans/` + danisanUserName + `/files`, requestOptions);
}

function add_danisan_files(userId, danisanUserName, data) {
    return axios.post(HOST_NAME + `/api/v1/users/` + userId + `/danisans/` + danisanUserName + `/addFiles`, data, {})
        .then(res => {
            return res;
        })
}

function delete_danisan_measurement(userId, danisanUserName, date, time) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    };
    
    return handleRequest(`/api/v1/users/${userId}/danisans/${danisanUserName}/measurements/${date}/${time}`, requestOptions);
}

function get_danisan_measurements(userId, danisanUserName) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    
    return handleRequest(`/api/v1/users/` + userId + `/danisans/` + danisanUserName + `/measurements`, requestOptions);
}

function add_danisan_measurement(userId, danisanUserName, danisanMeasurement) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(danisanMeasurement)
    };
    
    return handleRequest(`/api/v1/users/` + userId + `/danisans/` + danisanUserName + `/addMeasurement`, requestOptions);
}

function get_danisan_notes(userId, danisanUserName) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    
    return handleRequest(`/api/v1/users/` + userId + `/danisans/` + danisanUserName + `/notes`, requestOptions);
}

function put_danisan_notes(userId, danisanUserName, danisanNotes) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(danisanNotes)
    };
    
    return handleRequest(`/api/v1/users/` + userId + `/danisans/` + danisanUserName + `/notes`, requestOptions);
}

function get_danisan_diet_list(userId, danisanUserName) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    
    return handleRequest(`/api/v1/users/` + userId + `/danisans/` + danisanUserName + `/dietlist`, requestOptions);
}

function put_danisan_diet_list(userId, danisanUserName, danisanDietList) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(danisanDietList)
    };
    
    return handleRequest(`/api/v1/users/` + userId + `/danisans/` + danisanUserName + `/dietlist`, requestOptions);
}

function delete_dietitian(userId) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: localStorage.getItem('user')
    };
    
    return handleRequest(`/api/v1/users/` + userId, requestOptions);
}

function get_all_dietitians(isAdmin) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    
    return handleRequest(`/api/v1/getAllDietitians?isAdmin=${isAdmin}`, requestOptions);
}

function get_all_posts() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    
    return handleRequest(`/api/v1/posts`, requestOptions);
}

function add_danisan_measurement_with_photo(userId, danisanUserName, data) {
    return axios.post(HOST_NAME + `/api/v1/users/` + userId + `/danisans/` + danisanUserName + `/addMeasurementWithPhoto`, data, {})
        .then(res => {
            return res;
        })
}

function upload_photo(userId, data) {
    return axios.post(HOST_NAME + `/api/v1/${userId}/uploadPhoto`, data, {})
        .then(res => {
            return res;
        })
}

function get_dietitian_comments(userId) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    
    return handleRequest(`/api/v1/users/${userId}/comments`, requestOptions);
}

function put_dietitian_comments(userId, comments) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comments)
    };
    
    return handleRequest(`/api/v1/users/${userId}/comments`, requestOptions);
}

function post_dietitian_comment(userId, comment) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    };
    
    return handleRequest(`/api/v1/users/${userId}/newcomment`, requestOptions);
}

function add_new_post(formValues) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues)
    };
    
    return handleRequest(`/api/v1/addNewPost`, requestOptions);
}

function add_payment(userId) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: localStorage.getItem('user')
    };
    
    return handleRequest(`/api/v1/users/${userId}/makePayment`, requestOptions);
}

function track_activity(userId, event) {
    // if (userId == undefined || userId == '')
    //     return;

    const requestOptions = {
        method: 'PUT',
        credentials: 'include', // Don't forget to specify this if you need cookies
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: event })
    };
    
    return handleRequest(`/api/v1/trackActivity/${userId}`, requestOptions);
}

function handleRequest(endpoint, requestOptions) {
    if (JWT_TOKEN != undefined) {
        requestOptions.headers = {
            ...requestOptions.headers,
            'x-access-token': JWT_TOKEN
        }
    }

    return fetch(HOST_NAME + endpoint, requestOptions)
        .then(handleResponse)
        .then(data => data);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            envService.isProduction || console.log(error);
            return Promise.reject(error);
        }

        return data;
    });
}