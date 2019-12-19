import { userService } from '../../services';

const ENVANTER_GET_ERRORED = "api/ENVANTER_GET_ERRORED";
const ENVANTER_GET_LOADING = "api/ENVANTER_GET_LOADING";
const ENVANTER_GET_SUCCESS = "api/ENVANTER_GET_SUCCESS";
const ENVANTER_PUT_ERRORED = "api/ENVANTER_PUT_ERRORED";
const ENVANTER_PUT_LOADING = "api/ENVANTER_PUT_LOADING";

const initState = {
};

export default function reducer(state = initState, action) {
    switch (action.type) {
      case ENVANTER_PUT_ERRORED:
      case ENVANTER_GET_ERRORED:
        return {
          ...state,
            [action.user]: {
              isLoaded: true,
              error: action.error,
            }
        };
  
      case ENVANTER_GET_LOADING:
        return {
          ...state,
            [action.user] : {
              isPutLoading: false,
              isLoaded: false,
            }
        };
  
      case ENVANTER_GET_SUCCESS:
        return {
          ...state,
            [action.user] : {
              items: action.items,
              isLoaded: true,
            }
        };
  
      case ENVANTER_PUT_LOADING:
        return {
          ...state,
            [action.user]: {
              isPutLoading: true,
              isLoaded: false,
            }
        };

      default:
        return state;
        break;
    }
}

export function putClaim(userId, user) {
    return (dispatch) => {
        dispatch(request(user));

        userService.put_claim(userId, user)
        .then(
            (data) => { 
                getEnvanter(userId, user)(dispatch);
            },
            error => {
                dispatch(failure(user, error.toString()));
            }
        );
    };
  
  function request() { return { type: ENVANTER_PUT_LOADING, user, isPutLoading: true } }
  function failure(error) { return { type: ENVANTER_PUT_ERRORED, user, error } }
}

export function putEnvanter(userId, user, val) {
    return (dispatch) => {
        dispatch(request(user));

        userService.put_envanter(userId, user, val)
        .then(
            (data) => { 
                getEnvanter(userId, user)(dispatch);
            },
            error => {
                dispatch(failure(user, error.toString()));
            }
        );
    };
  
  function request() { return { type: ENVANTER_PUT_LOADING, user, isPutLoading: true } }
  function failure(error) { return { type: ENVANTER_PUT_ERRORED, user, error } }
}

export function getEnvanter(userId, user) {
  return (dispatch) => {
      dispatch(request(user));

      userService.get_envanter(userId, user)
      .then(
          items => { 
              dispatch(success(user, items));
              //window.history.push('/');
          },
          error => {
              dispatch(failure(user, error.toString()));
              // dispatch(alertActions.error(error.toString()));
          }
      );
  };
    
  function request(user) { return { type: ENVANTER_GET_LOADING, user } }
  function success(user, items) { return { type: ENVANTER_GET_SUCCESS, user, items } }
  function failure(user, error) { return { type: ENVANTER_GET_ERRORED, user, error } }
}