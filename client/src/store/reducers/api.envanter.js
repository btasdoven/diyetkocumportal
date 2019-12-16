import { userService } from '../../services';

const ENVANTER_GET_ERRORED = "api/ENVANTER_GET_ERRORED";
const ENVANTER_GET_LOADING = "api/ENVANTER_GET_LOADING";
const ENVANTER_GET_SUCCESS = "api/ENVANTER_GET_SUCCESS";
const ENVANTER_PUT_ERRORED = "api/ENVANTER_PUT_ERRORED";
const ENVANTER_PUT_LOADING = "api/ENVANTER_PUT_LOADING";

const initState = {
    items: {}
};

export default function reducer(state = initState, action) {
    switch (action.type) {
      case ENVANTER_PUT_ERRORED:
      case ENVANTER_GET_ERRORED:
        return {
          ...state,
            isLoaded: true,
            error: action.error,
        };
  
      case ENVANTER_GET_LOADING:
        return {
          ...state,
            isPutLoading: false,
            isLoaded: false,
        };
  
      case ENVANTER_GET_SUCCESS:
        return {
          ...state,
            items: action.items,
            isLoaded: true,
        };
  
      case ENVANTER_PUT_LOADING:
        return {
          ...state,
            isPutLoading: true,
            isLoaded: false,
        };

      default:
        return state;
        break;
    }
}

export function putEnvanter(userId, val) {
    return (dispatch) => {
        dispatch(request());

        userService.put_envanter(userId, val)
        .then(
            (data) => { 
                getEnvanter(userId)(dispatch);
            },
            error => {
                dispatch(failure(error.toString()));
            }
        );
    };
  
  function request() { return { type: ENVANTER_PUT_LOADING, isPutLoading: true } }
  function failure(error) { return { type: ENVANTER_PUT_ERRORED, error } }
}

export function getEnvanter(userId) {
  return (dispatch) => {
      dispatch(request());

      userService.get_envanter(userId)
      .then(
          items => { 
              dispatch(success(items));
              //window.history.push('/');
          },
          error => {
              dispatch(failure(error.toString()));
              // dispatch(alertActions.error(error.toString()));
          }
      );
  };
    
  function request() { return { type: ENVANTER_GET_LOADING } }
  function success(items) { return { type: ENVANTER_GET_SUCCESS, items } }
  function failure(error) { return { type: ENVANTER_GET_ERRORED, error } }
}