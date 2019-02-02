import { userService } from '../../services';

const GROUPS_GET_ERRORED = "api/GROUPS_GET_ERRORED";
const GROUPS_GET_LOADING = "api/GROUPS_GET_LOADING";
const GROUPS_GET_SUCCESS = "api/GROUPS_GET_SUCCESS";

const initState = {
    items: {}
};

export default function reducer(state = initState, action) {
    switch (action.type) {
      case GROUPS_GET_ERRORED:
        return {
          ...state,
          error: action.error
        };
  
      case GROUPS_GET_LOADING:
        return {
          ...state,
          isGetLoading: action.isGetLoading
        };
  
      case GROUPS_GET_SUCCESS:
        return {
          ...state,
          items: action.items
        };

      default:
        return state;
        break;
    }
}

export function groupsFetchData(userId, groupId) {
    return (dispatch) => {
        dispatch(request(true));

        userService.get_groups(userId, groupId)
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
    
  function request(bool) { return { type: GROUPS_GET_LOADING, isGetLoading: bool } }
  function success(items) { return { type: GROUPS_GET_SUCCESS, items } }
  function failure(error) { return { type: GROUPS_GET_ERRORED, error } }
}