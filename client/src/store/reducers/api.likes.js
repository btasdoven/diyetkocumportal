import { userService } from '../../services';

const LIKES_GET_ERRORED = "api/LIKES_GET_ERRORED";
const LIKES_GET_LOADING = "api/LIKES_GET_LOADING";
const LIKES_GET_SUCCESS = "api/LIKES_GET_SUCCESS";
const LIKES_PUT_ERRORED = "api/LIKES_PUT_ERRORED";
const LIKES_PUT_LOADING = "api/LIKES_PUT_LOADING";

const initState = {
};

export default function reducer(state = initState, action) {
    switch (action.type) {

      case LIKES_PUT_ERRORED:
      case LIKES_GET_ERRORED:
        return {
          ...state,
          [action.user]: {
            ...state[action.user],
            [action.user2]: {
              isLoaded: true,
              error: action.error,
            }
          }
        };
  
      case LIKES_GET_LOADING:
        return {
          ...state,
          [action.user] : {
            ...state[action.user],
            [action.user2]: {
              isPutLoading: false,
              isLoaded: false,
            }
          }
        };
  
      case LIKES_GET_SUCCESS:
        return {
          ...state,
          [action.user] : {
            ...state[action.user],
            [action.user2]: {
              items: action.items,
              isLoaded: true,
            }
          }
        };
  
      case LIKES_PUT_LOADING:
        return {
          ...state,
          [action.user]: {
            ...state[action.user],
            [action.user2]: {
              isPutLoading: true,
              isLoaded: false,
            }
          }
        };

      default:
        return state;
        break;
    }
}

export function putLikes(userId, user, user2, commentIdx, val) {
    return (dispatch) => {
        dispatch(request(user, user2));

        userService.put_likes(userId, user, user2, commentIdx, val)
        .then(
            (data) => { 
                getLikes(userId, user, user2)(dispatch);
            },
            error => {
                dispatch(failure(user, user2, error.toString()));
            }
        );
    };
  
  function request(user, user2) { return { type: LIKES_PUT_LOADING, user, user2, isPutLoading: true } }
  function failure(user, user2, error) { return { type: LIKES_PUT_ERRORED, user, user2, error } }
}

export function getLikes(userId, user, user2) {
  return (dispatch) => {
      dispatch(request(user, user2));

      userService.get_likes(userId, user, user2)
      .then(
          items => { 
              dispatch(success(user, user2, items));
              //window.history.push('/');
          },
          error => {
              dispatch(failure(user, user2, error.toString()));
              // dispatch(alertActions.error(error.toString()));
          }
      );
  };
    
  function request(user, user2) { return { type: LIKES_GET_LOADING, user, user2 } }
  function success(user, user2, items) { return { type: LIKES_GET_SUCCESS, user, user2, items } }
  function failure(user, user2, error) { return { type: LIKES_GET_ERRORED, user, user2, error } }
}