import { userService } from '../../services';

const LOGIN_REQUEST = "authentication/LOGIN_REQUEST";
const LOGIN_SUCCESS = "authentication/LOGIN_SUCCESS";
const LOGIN_FAILURE = "authentication/LOGIN_FAILURE";

const SIGNUP_REQUEST = "authentication/SIGNUP_REQUEST";
const SIGNUP_SUCCESS = "authentication/SIGNUP_SUCCESS";
const SIGNUP_FAILURE = "authentication/SIGNUP_FAILURE";

const NEW_PASSWORD_REQUEST = "authentication/NEW_PASSWORD_REQUEST";
const NEW_PASSWORD_SUCCESS = "authentication/NEW_PASSWORD_SUCCESS";
const NEW_PASSWORD_FAILURE = "authentication/NEW_PASSWORD_FAILURE";

const RESET_PASSWORD_REQUEST = "authentication/RESET_PASSWORD_REQUEST";
const RESET_PASSWORD_SUCCESS = "authentication/RESET_PASSWORD_SUCCESS";
const RESET_PASSWORD_FAILURE = "authentication/RESET_PASSWORD_FAILURE";

const LOGOUT = "authentication/LOGOUT";

const initState = {
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
          signingUp: true,
          user: action.user
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
          signedUp: true,
          user: action.user
      };

    case LOGIN_REQUEST:
      return {
        ...state,
          loggingIn: true,
          user: action.user
      };
      
    case LOGIN_SUCCESS:
      return {
        ...state,
          loggedIn: true,
          user: action.user
      };

    case LOGIN_FAILURE:
    case SIGNUP_FAILURE:
    case NEW_PASSWORD_FAILURE:
    case RESET_PASSWORD_FAILURE:
      return {
        error: action.error
      };

    case LOGOUT:
      return {
      };

    case NEW_PASSWORD_REQUEST:
      return {
        sendingForgotPasswordEmail: true,
        user: action.user
      }

    case NEW_PASSWORD_SUCCESS:
      return {
        sentForgotPasswordEmail: true,
        user: action.user
      }

    case RESET_PASSWORD_REQUEST:
      return {
        resettingPassword: true,
        user: action.user
      }

    case RESET_PASSWORD_SUCCESS:
      return {
        resetPassword: true,
        user: action.user
      }

    default:
      return state;
      break;
  }
}

export function login(username, password) {
  return dispatch => {
      dispatch(request({ username }));

      userService.login(username, password)
          .then(
              user => { 
                  dispatch(success(user));
                  //window.history.push('/');
              },
              error => {
                  dispatch(failure(error.toString()));
                  // dispatch(alertActions.error(error.toString()));
              }
          );
  };

  function request(user) { return { type: LOGIN_REQUEST, user } }
  function success(user) { return { type: LOGIN_SUCCESS, user } }
  function failure(error) { return { type: LOGIN_FAILURE, error } }
}

export function relogin(username, userInfo) {
  return dispatch => {
      dispatch(request({ username }));

      userService.relogin(username, userInfo)
          .then(
              user => { 
                  dispatch(success(user));
                  //window.history.push('/');
              },
              error => {
                  dispatch(failure(error.toString()));
                  // dispatch(alertActions.error(error.toString()));
              }
          );
  };

  function request(user) { return { type: LOGIN_REQUEST, user } }
  function success(user) { return { type: LOGIN_SUCCESS, user } }
  function failure(error) { return { type: LOGIN_FAILURE, error } }
}

export function signup(username, userInfo) {
  return dispatch => {
      dispatch(request({ username }));

      userService.signup(username, userInfo)
          .then(
              user => { 
                  dispatch(success(user));
                  login(username, userInfo.password)(dispatch)
                  //window.history.push('/');
              },
              error => {
                  dispatch(failure(error.toString()));
                  // dispatch(alertActions.error(error.toString()));
              }
          );
  };

  function request(user) { return { type: SIGNUP_REQUEST, user } }
  function success(user) { return { type: SIGNUP_SUCCESS, user } }
  function failure(error) { return { type: SIGNUP_FAILURE, error } }
}

export function requestNewPasswordEmail(username, userInfo) {
  return dispatch => {
      dispatch(request({ username }));

      userService.request_new_password_email(username, userInfo)
          .then(
              user => { 
                  dispatch(success(user));
                  //window.history.push('/');
              },
              error => {
                  dispatch(failure(error.toString()));
                  // dispatch(alertActions.error(error.toString()));
              }
          );
  };

  function request(user) { return { type: NEW_PASSWORD_REQUEST, user } }
  function success(user) { return { type: NEW_PASSWORD_SUCCESS, user } }
  function failure(error) { return { type: NEW_PASSWORD_FAILURE, error } }
}

export function resetPassword(username, userInfo) {
  return dispatch => {
      dispatch(request({ username }));

      userService.reset_password(username, userInfo)
          .then(
              user => { 
                  dispatch(success(user));
                  login(username, userInfo.password)(dispatch)
                  //window.history.push('/');
              },
              error => {
                  dispatch(failure(error.toString()));
                  // dispatch(alertActions.error(error.toString()));
              }
          );
  };

  function request(user) { return { type: RESET_PASSWORD_REQUEST, user } }
  function success(user) { return { type: RESET_PASSWORD_SUCCESS, user } }
  function failure(error) { return { type: RESET_PASSWORD_FAILURE, error } }
}

export function logout() {
  userService.logout();
  return { type: LOGOUT };
}