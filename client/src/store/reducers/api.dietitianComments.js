import { userService } from '../../services';

const DIETITIAN_COMMENTS_GET_ERRORED = "api/DIETITIAN_COMMENTS_GET_ERRORED";
const DIETITIAN_COMMENTS_GET_LOADING = "api/DIETITIAN_COMMENTS_GET_LOADING";
const DIETITIAN_COMMENTS_GET_SUCCESS = "api/DIETITIAN_COMMENTS_GET_SUCCESS";

const DIETITIAN_COMMENTS_PUT_ERRORED = "api/DIETITIAN_COMMENTS_PUT_ERRORED";
const DIETITIAN_COMMENTS_PUT_LOADING = "api/DIETITIAN_COMMENTS_PUT_LOADING";

const DIETITIAN_COMMENTS_POST_ERRORED = "api/DIETITIAN_COMMENTS_POST_ERRORED";
const DIETITIAN_COMMENTS_POST_LOADING = "api/DIETITIAN_COMMENTS_POST_LOADING";

const initState = {
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case DIETITIAN_COMMENTS_GET_ERRORED:
    case DIETITIAN_COMMENTS_PUT_ERRORED:
    case DIETITIAN_COMMENTS_POST_ERRORED:
      return {
        ...state,
        [action.userId]: {
            error: action.error
        }
      }

    case DIETITIAN_COMMENTS_GET_LOADING:
      return {
        ...state,
        [action.userId]: {
          isGetLoading: true,
        }
      }

    case DIETITIAN_COMMENTS_GET_SUCCESS:
      return {
        ...state,
        [action.userId]: {
          isGetLoading: false,
          isPutLoading: false,
          data: action.items,
        }
    }

    case DIETITIAN_COMMENTS_PUT_LOADING:
    case DIETITIAN_COMMENTS_POST_LOADING:
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

export function getDietitianComments(userId) {
    return (dispatch) => {
        dispatch(request(userId));

        userService.get_dietitian_comments(userId)
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
    
  function request(userId) { return { type: DIETITIAN_COMMENTS_GET_LOADING, userId } }
  function success(items, userId) { return { type: DIETITIAN_COMMENTS_GET_SUCCESS, userId, items } }
  function failure(error, userId) { return { type: DIETITIAN_COMMENTS_GET_ERRORED, userId, error } }
}

export function putDietitianComments(userId, comments) {
  return (dispatch) => {
      dispatch(request(userId));

      userService.put_dietitian_comments(userId, comments)
      .then(
          (data) => { 
            getDietitianComments(userId)(dispatch);
          },
          error => {
            dispatch(failure(userId, error.toString()));
          }
      );
  };

function request(userId) { return { type: DIETITIAN_COMMENTS_PUT_LOADING, userId, isPutLoading: true } }
function failure(userId, error) { return { type: DIETITIAN_COMMENTS_PUT_ERRORED, userId, error } }
}

export function postDietitianComment(userId, comment) {
  return (dispatch) => {
      dispatch(request(userId));

      userService.post_dietitian_comment(userId, comment)
      .then(
          (data) => { 
            getDietitianComments(userId)(dispatch);
          },
          error => {
            dispatch(failure(userId, error.toString()));
          }
      );
  };

function request(userId) { return { type: DIETITIAN_COMMENTS_POST_LOADING, userId, isPutLoading: true } }
function failure(userId, error) { return { type: DIETITIAN_COMMENTS_POST_ERRORED, userId, error } }
}