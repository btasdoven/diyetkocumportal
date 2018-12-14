import { userService } from '../../services';

const LOGIN_REQUEST = "authentication/LOGIN_REQUEST";
const LOGIN_SUCCESS = "authentication/LOGIN_SUCCESS";
const LOGIN_FAILURE = "authentication/LOGIN_FAILURE";
const LOGOUT = "authentication/LOGOUT";

const initState = {
};

export default function reducer(state = initState, action) {
  switch (action.type) {
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
      return {
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

export function logout() {
  userService.logout();
  return { type: LOGOUT };
}