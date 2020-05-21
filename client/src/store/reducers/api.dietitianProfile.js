import { userService } from '../../services';

const DIETITIAN_PROFILE_GET_ERRORED = "api/DIETITIAN_PROFILE_GET_ERRORED";
const DIETITIAN_PROFILE_GET_LOADING = "api/DIETITIAN_PROFILE_GET_LOADING";
const DIETITIAN_PROFILE_GET_SUCCESS = "api/DIETITIAN_PROFILE_GET_SUCCESS";

const DIETITIAN_PROFILE_PUT_ERRORED = "api/DIETITIAN_PROFILE_PUT_ERRORED";
const DIETITIAN_PROFILE_PUT_LOADING = "api/DIETITIAN_PROFILE_PUT_LOADING";

const initState = {
};

export default function reducer(state = initState, action) {
    switch (action.type) {
      case DIETITIAN_PROFILE_GET_ERRORED:
      case DIETITIAN_PROFILE_PUT_ERRORED:
        return {
          ...state,
          [action.userId]: {
            error: action.error
          }
        }

      case DIETITIAN_PROFILE_GET_LOADING:
        return {
          ...state,
          [action.userId]: {
            isGetLoading: true,
          }
        }
  
      case DIETITIAN_PROFILE_GET_SUCCESS:
        return {
          ...state,
          [action.userId]: {
            lastStateChangeTime: (state[action.userId].lastStateChangeTime ? state[action.userId].lastStateChangeTime : 0) + 1,
            isGetLoading: false,
            isPutLoading: false,
            data: action.items,
          }
        }

      case DIETITIAN_PROFILE_PUT_LOADING:
        return {
          ...state,
          [action.userId]: {
              isPutLoading: true,
          }
        };

      default:
        break;
    }
    
    return state;
}

export function getDietitianProfile(userId) {
    return (dispatch) => {
        dispatch(request(userId));

        userService.get_dietitian_profile(userId)
        .then(
            items => { 
                dispatch(success(items, userId));
                //window.history.push('/');
            },
            error => {
                dispatch(failure(error.toString(), userId));
                // dispatch(alertActions.error(error.toString()));
            }
        );
    };
    
  function request(userId) { return { type: DIETITIAN_PROFILE_GET_LOADING, userId } }
  function success(items, userId) { return { type: DIETITIAN_PROFILE_GET_SUCCESS, userId, items } }
  function failure(error, userId) { return { type: DIETITIAN_PROFILE_GET_ERRORED, userId, error } }
}

export function putDietitianProfile(userId, dietitianProfile) {
    return (dispatch) => {
        dispatch(request(userId));

        userService.put_dietitian_profile(userId, dietitianProfile)
        .then(
            (data) => { 
              getDietitianProfile(userId)(dispatch);
            },
            error => {
                dispatch(failure(userId, error.toString()));
            }
        );
    };
  
  function request(userId) { return { type: DIETITIAN_PROFILE_PUT_LOADING, userId, isPutLoading: true } }
  function failure(userId, error) { return { type: DIETITIAN_PROFILE_PUT_ERRORED, userId, error } }
}

export function addPayment(userId) {
    return (dispatch) => {
        dispatch(request(userId));

        userService.add_payment(userId)
        .then(
            (data) => { 
              getDietitianProfile(userId)(dispatch);
            },
            error => {
                dispatch(failure(userId, error.toString()));
            }
        );
    };
  
  function request(userId) { return { type: DIETITIAN_PROFILE_PUT_LOADING, userId, isPutLoading: true } }
  function failure(userId, error) { return { type: DIETITIAN_PROFILE_PUT_ERRORED, userId, error } }
}