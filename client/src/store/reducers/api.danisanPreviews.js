import { userService } from '../../services';

const DANISAN_PREVIEWS_GET_ERRORED = "api/DANISAN_PREVIEWS_GET_ERRORED";
const DANISAN_PREVIEWS_GET_LOADING = "api/DANISAN_PREVIEWS_GET_LOADING";
const DANISAN_PREVIEWS_GET_SUCCESS = "api/DANISAN_PREVIEWS_GET_SUCCESS";

const DANISAN_PREVIEWS_PUT_ERRORED = "api/DANISAN_PREVIEWS_PUT_ERRORED";
const DANISAN_PREVIEWS_PUT_LOADING = "api/DANISAN_PREVIEWS_PUT_LOADING";

const initState = {
};

export default function reducer(state = initState, action) {

    console.log('reduc')
    console.log(action);
    console.log(state);

    switch (action.type) {
      case DANISAN_PREVIEWS_GET_ERRORED:
      case DANISAN_PREVIEWS_PUT_ERRORED:
        return {
          ...state,
          [action.userId]: {
            error: action.error
          }
        }

      case DANISAN_PREVIEWS_GET_LOADING:
        return {
          ...state,
          [action.userId]: {
            ...state[action.userId],
            isGetLoading: true,
          }
        }
  
      case DANISAN_PREVIEWS_GET_SUCCESS:
        return {
          ...state,
          [action.userId]: {
            lastStateChangeTime: (state[action.userId].lastStateChangeTime ? state[action.userId].lastStateChangeTime : 0) + 1,
            isGetLoading: false,
            isPutLoading: false,
            data: action.items,
          }
        }

      case DANISAN_PREVIEWS_PUT_LOADING:
        return {
          ...state,
          [action.userId]: {
            ...state[action.userId],
            isPutLoading: true
          }
        }

      default:
        break;
    }
    
    return state;
}

export function getDanisanPreviews(userId) {
    return (dispatch) => {
        dispatch(request(userId));

        userService.get_danisan_previews(userId)
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
    
  function request(userId) { return { type: DANISAN_PREVIEWS_GET_LOADING, userId } }
  function success(items, userId) { return { type: DANISAN_PREVIEWS_GET_SUCCESS, userId, items } }
  function failure(error, userId) { return { type: DANISAN_PREVIEWS_GET_ERRORED, userId, error } }
}

export function addDanisan(userId, newDanisanPreview) {
    return (dispatch) => {
        dispatch(request(userId));

        userService.new_danisan(userId, newDanisanPreview)
        .then(
            (data) => { 
              getDanisanPreviews(userId)(dispatch);
            },
            error => {
                dispatch(failure(userId, error.toString()));
            }
        );
    };
  
  function request(userId) { return { type: DANISAN_PREVIEWS_PUT_LOADING, userId, isPutLoading: true } }
  function failure(userId, error) { return { type: DANISAN_PREVIEWS_PUT_ERRORED, userId, error } }
}