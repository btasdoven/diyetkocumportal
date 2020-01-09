import { userService } from '../../services';

const MESSAGE_PREVIEWS_GET_ERRORED = "api/MESSAGE_PREVIEWS_GET_ERRORED";
const MESSAGE_PREVIEWS_GET_LOADING = "api/MESSAGE_PREVIEWS_GET_LOADING";
const MESSAGE_PREVIEWS_GET_SUCCESS = "api/MESSAGE_PREVIEWS_GET_SUCCESS";

const MESSAGE_PREVIEWS_PUT_ERRORED = "api/MESSAGE_PREVIEWS_PUT_ERRORED";
const MESSAGE_PREVIEWS_PUT_LOADING = "api/MESSAGE_PREVIEWS_PUT_LOADING";

const initState = {
};

export default function reducer(state = initState, action) {
    switch (action.type) {
      case MESSAGE_PREVIEWS_GET_ERRORED:
      case MESSAGE_PREVIEWS_PUT_ERRORED:
        return {
          ...state,
          [action.userId]: {
            error: action.error,
          }
        };
  
      case MESSAGE_PREVIEWS_GET_LOADING:
        return {
          ...state,
          [action.userId]: {
            isGetLoading: true
          }
        };
  
      case MESSAGE_PREVIEWS_GET_SUCCESS:
        return {
          ...state,
          lastStateChangeTime: (state.lastStateChangeTime ? state.lastStateChangeTime : 0) + 1,
          [action.userId]: {
            isGetLoading: false,
            data: action.items,
          }
        };
  
        case MESSAGE_PREVIEWS_PUT_LOADING:
        return {
          ...state,
          [action.userId]: {
            isPutLoading: action.isPutLoading
          }
        };

      default:
        return state;
        break;
    }
}

export function getMessagePreviews(userId) {
    return (dispatch) => {
        dispatch(request(userId));

        userService.get_message_previews(userId)
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
    
  function request(userId) { return { type: MESSAGE_PREVIEWS_GET_LOADING, userId } }
  function success(items, userId) { return { type: MESSAGE_PREVIEWS_GET_SUCCESS, userId, items } }
  function failure(error, userId) { return { type: MESSAGE_PREVIEWS_GET_ERRORED, userId, error } }
}