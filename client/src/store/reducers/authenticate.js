import { userService } from '../../services';

const LOGIN_REQUEST = "authentication/LOGIN_REQUEST";
const LOGIN_SUCCESS = "authentication/LOGIN_SUCCESS";
const LOGIN_FAILURE = "authentication/LOGIN_FAILURE";
const SIGNUP_REQUEST = "authentication/SIGNUP_REQUEST";
const SIGNUP_SUCCESS = "authentication/SIGNUP_SUCCESS";
const SIGNUP_FAILURE = "authentication/SIGNUP_FAILURE";
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
      return {
        error: action.error
      };

    case LOGOUT:
      return {
      };

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

export function signup(username, userInfo) {
  return dispatch => {
      dispatch(request({ username }));

      userService.signup(username, userInfo)
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

  function request(user) { return { type: SIGNUP_REQUEST, user } }
  function success(user) { return { type: SIGNUP_SUCCESS, user } }
  function failure(error) { return { type: SIGNUP_FAILURE, error } }
}

export function logout() {
  userService.logout();
  return { type: LOGOUT };
}