import { userService } from '../../services';

const ALL_POSTS_GET_ERRORED = "api/ALL_POSTS_GET_ERRORED";
const ALL_POSTS_GET_LOADING = "api/ALL_POSTS_GET_LOADING";
const ALL_POSTS_GET_SUCCESS = "api/ALL_POSTS_GET_SUCCESS";

const initState = {
};

export default function reducer(state = initState, action) {
    switch (action.type) {
      case ALL_POSTS_GET_ERRORED:
        return {
          error: action.error
        }

      case ALL_POSTS_GET_LOADING:
        return {
          ...state,
          isGetLoading: true,
        }
  
      case ALL_POSTS_GET_SUCCESS:
        return {
          isGetLoading: false,
          data: action.items,
        }

      default:
        break;
    }
    
    return state;
}

export function getAllPosts() {
    return (dispatch) => {
        dispatch(request());

        userService.get_all_posts()
        .then(
            items => { 
                console.log(items)
                dispatch(success(items));
            },
            error => {
                dispatch(failure(error.toString()));
            }
        );
    };
    
  function request() { return { type: ALL_POSTS_GET_LOADING } }
  function success(items) { return { type: ALL_POSTS_GET_SUCCESS, items } }
  function failure(error) { return { type: ALL_POSTS_GET_ERRORED, error } }
}