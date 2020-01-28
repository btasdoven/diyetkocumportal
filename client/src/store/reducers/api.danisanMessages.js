import { userService } from '../../services';
import { getMessagePreviews } from './api.messagePreviews'

const DANISAN_MESSAGES_GET_ERRORED = "api/DANISAN_MESSAGES_GET_ERRORED";
const DANISAN_MESSAGES_GET_LOADING = "api/DANISAN_MESSAGES_GET_LOADING";
const DANISAN_MESSAGES_GET_SUCCESS = "api/DANISAN_MESSAGES_GET_SUCCESS";

const DANISAN_MESSAGES_PUT_ERRORED = "api/DANISAN_MESSAGES_PUT_ERRORED";
const DANISAN_MESSAGES_PUT_LOADING = "api/DANISAN_MESSAGES_PUT_LOADING";

const initState = {
};

const getValue = (obj, arr) => {
  if (!obj)
    return {};

  if (arr.length == 0) {
    return obj;
  }

  var key = arr.shift()
  return getValue(obj[key], arr)
}

export default function reducer(state = initState, action) {
  switch (action.type) {
    case DANISAN_MESSAGES_GET_ERRORED:
    case DANISAN_MESSAGES_PUT_ERRORED:
      return {
        ...state,
        [action.userId]: {
          ...state[action.userId],
          [action.danisanUserName]: {
            error: action.error
          },
        }
      }

    case DANISAN_MESSAGES_GET_LOADING:
      return {
        ...state,
        [action.userId]: {
          ...state[action.userId],
          [action.danisanUserName]: {
            ...(getValue(state, [action.userId, action.danisanUserName])),
            isGetLoading: true,
          },
        }
      }

    case DANISAN_MESSAGES_GET_SUCCESS:
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

    case DANISAN_MESSAGES_PUT_LOADING:
      return {
        ...state,
        [action.userId]: {
          ...state[action.userId],
          [action.danisanUserName]: {
            ...(getValue(state, [action.userId, action.danisanUserName])),
            isPutLoading: true,
          },
        }
      };

    default:
      break;
  }
  
  return state;
}

export function getDanisanMessages(userId, danisanUserName) {
    return (dispatch) => {
        dispatch(request(userId, danisanUserName));

        userService.get_danisan_messages(userId, danisanUserName)
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
    
  function request(userId, danisanUserName) { return { type: DANISAN_MESSAGES_GET_LOADING, userId, danisanUserName } }
  function success(items, userId, danisanUserName) { return { type: DANISAN_MESSAGES_GET_SUCCESS, userId, danisanUserName, items } }
  function failure(error, userId, danisanUserName) { return { type: DANISAN_MESSAGES_GET_ERRORED, userId, danisanUserName, error } }
}

export function addDanisanMessage(userId, danisanUserName, message) {
  return (dispatch) => {
      dispatch(request(userId, danisanUserName));

      userService.add_danisan_message(userId, danisanUserName, message)
      .then(
          (data) => { 
            getDanisanMessages(userId, danisanUserName)(dispatch);
            getMessagePreviews(userId, danisanUserName)(dispatch);
          },
          error => {
              dispatch(failure(userId, danisanUserName, error.toString()));
          }
      );
  };

function request(userId, danisanUserName) { return { type: DANISAN_MESSAGES_PUT_LOADING, userId, danisanUserName, isPutLoading: true } }
function failure(userId, danisanUserName, error) { return { type: DANISAN_MESSAGES_PUT_ERRORED, userId, danisanUserName, error } }
}


export function readMessages(userId, danisanUserName) {
  return (dispatch) => {
      userService.read_danisan_message(userId, danisanUserName)
      .then(
          (data) => { 
            getMessagePreviews(userId, danisanUserName)(dispatch);
          },
      );
  };
}