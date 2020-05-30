
import envService from './env.service'
import dateFnsFormat from 'date-fns/format';
import axios from 'axios';

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

    return fetch(HOST_NAME + `/api/v1/users/signup`, requestOptions)
        .then(handleResponse)
        .then(user => {
            return user;
        });
}

function reset_password(username, userInfo) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfo)
    };

    return fetch(HOST_NAME + `/api/v1/users/resetPassword`, requestOptions)
        .then(handleResponse)
        .then(user => {
            return user;
        });
}

function request_new_password_email(username, userInfo) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfo)
    };

    return fetch(HOST_NAME + `/api/v1/users/requestNewPasswordEmail`, requestOptions)
        .then(handleResponse)
        .then(user => {
            return user;
        });
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

function get_dietitian_appointments(userId, date) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    
    date = date == undefined ? '' : date;

    return fetch(HOST_NAME + `/api/v1/users/` + userId + `/appointments/` + date, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function put_dietitian_appointment(userId, date, time, values) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
    };
    
    return fetch(HOST_NAME + `/api/v1/users/` + userId + `/appointments/` + date + `/times/` + time, requestOptions)
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

function get_link_info(linkId) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    
    return fetch(HOST_NAME + `/api/v1/links/` + linkId, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function get_danisan_messages(userId, danisanUserName) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    
    return fetch(HOST_NAME + `/api/v1/users/` + userId + `/danisans/` + danisanUserName + `/messages`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function add_danisan_message(userId, danisanUserName, message) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message)
    };
    
    return fetch(HOST_NAME + `/api/v1/users/` + userId + `/danisans/` + danisanUserName + `/messages/` + message.id, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function read_danisan_message(userId, danisanUserName) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };
    
    return fetch(HOST_NAME + `/api/v1/users/` + userId + `/danisans/` + danisanUserName + `/messages/read`, requestOptions)
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

function get_danisan_files(userId, danisanUserName) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    
    return fetch(HOST_NAME + `/api/v1/users/` + userId + `/danisans/` + danisanUserName + `/files`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function add_danisan_files(userId, danisanUserName, data) {
    return axios.post(HOST_NAME + `/api/v1/users/` + userId + `/danisans/` + danisanUserName + `/addFiles`, data, {})
        .then(res => {
            return res;
        })
}

function get_danisan_measurements(userId, danisanUserName) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    
    return fetch(HOST_NAME + `/api/v1/users/` + userId + `/danisans/` + danisanUserName + `/measurements`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function add_danisan_measurement(userId, danisanUserName, danisanMeasurement) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(danisanMeasurement)
    };
    
    return fetch(HOST_NAME + `/api/v1/users/` + userId + `/danisans/` + danisanUserName + `/addMeasurement`, requestOptions)
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

function delete_dietitian(userId) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: localStorage.getItem('user')
    };
    
    return fetch(HOST_NAME + `/api/v1/users/` + userId, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function get_all_dietitians(isAdmin) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    
    return fetch(HOST_NAME + `/api/v1/getAllDietitians?isAdmin=${isAdmin}`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });   
}

function get_all_posts() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    
    return fetch(HOST_NAME + `/api/v1/posts`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });   
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
    
    return fetch(HOST_NAME + `/api/v1/users/${userId}/comments`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        }); 
}

function put_dietitian_comments(userId, comments) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comments)
    };
    
    return fetch(HOST_NAME + `/api/v1/users/${userId}/comments`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function post_dietitian_comment(userId, comment) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    };
    
    return fetch(HOST_NAME + `/api/v1/users/${userId}/newcomment`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function add_new_post(formValues) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues)
    };
    
    return fetch(HOST_NAME + `/api/v1/addNewPost`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function add_payment(userId) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: localStorage.getItem('user')
    };
    
    return fetch(HOST_NAME + `/api/v1/users/${userId}/makePayment`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
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
    
    return fetch(HOST_NAME + `/api/v1/trackActivity/${userId}`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });   
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