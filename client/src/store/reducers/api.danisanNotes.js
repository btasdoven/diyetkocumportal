import { userService } from '../../services';

const DANISAN_NOTES_GET_ERRORED = "api/DANISAN_NOTES_GET_ERRORED";
const DANISAN_NOTES_GET_LOADING = "api/DANISAN_NOTES_GET_LOADING";
const DANISAN_NOTES_GET_SUCCESS = "api/DANISAN_NOTES_GET_SUCCESS";

const DANISAN_NOTES_PUT_ERRORED = "api/DANISAN_NOTES_PUT_ERRORED";
const DANISAN_NOTES_PUT_LOADING = "api/DANISAN_NOTES_PUT_LOADING";

const initState = {
};

export default function reducer(state = initState, action) {
    switch (action.type) {
      case DANISAN_NOTES_GET_ERRORED:
      case DANISAN_NOTES_PUT_ERRORED:
        return {
          ...state,
          [action.userId]: {
            ...state[action.userId],
            [action.danisanUserName]: {
              error: action.error
            },
          }
        }

      case DANISAN_NOTES_GET_LOADING:
        return {
          ...state,
          [action.userId]: {
            ...state[action.userId],
            [action.danisanUserName]: {
              isGetLoading: true,
            },
          }
        }
  
      case DANISAN_NOTES_GET_SUCCESS:
        return {
          ...state,
          [action.userId]: {
            ...state[action.userId],
            [action.danisanUserName]: {
              lastStateChangeTime: (state[action.userId][action.danisanUserName].lastStateChangeTime ? state[action.userId][action.danisanUserName].lastStateChangeTime : 0) + 1,
              isGetLoading: false,
              isPutLoading: false,
              data: action.items,
            },
          }
        }

      case DANISAN_NOTES_PUT_LOADING:
        return {
          ...state,
          [action.userId]: {
            ...state[action.userId],
            [action.danisanUserName]: {
              isPutLoading: true,
            },
          }
        };

      default:
        break;
    }
    
    return state;
}

export function getDanisanNotes(userId, danisanUserName) {
    return (dispatch) => {
        dispatch(request(userId, danisanUserName));

        userService.get_danisan_notes(userId, danisanUserName)
        .then(
            items => { 
                dispatch(success(items, userId, danisanUserName));
                //window.history.push('/');
            },
            error => {
                dispatch(failure(error.toString(), userId, danisanUserName));
                // dispatch(alertActions.error(error.toString()));
            }
        );
    };
    
  function request(userId, danisanUserName) { return { type: DANISAN_NOTES_GET_LOADING, userId, danisanUserName } }
  function success(items, userId, danisanUserName) { return { type: DANISAN_NOTES_GET_SUCCESS, userId, danisanUserName, items } }
  function failure(error, userId, danisanUserName) { return { type: DANISAN_NOTES_GET_ERRORED, userId, danisanUserName, error } }
}

export function putDanisanNotes(userId, danisanUserName, danisanNotes) {
    return (dispatch) => {
        dispatch(request(userId, danisanUserName));

        userService.put_danisan_notes(userId, danisanUserName, danisanNotes)
        .then(
            (data) => { 
              getDanisanNotes(userId, danisanUserName)(dispatch);
            },
            error => {
                dispatch(failure(userId, danisanUserName, error.toString()));
            }
        );
    };
  
  function request(userId, danisanUserName) { return { type: DANISAN_NOTES_PUT_LOADING, userId, danisanUserName, isPutLoading: true } }
  function failure(userId, danisanUserName, error) { return { type: DANISAN_NOTES_PUT_ERRORED, userId, danisanUserName, error } }
}