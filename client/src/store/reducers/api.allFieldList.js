import { userService } from '../../services';

const ALL_FIELD_GET_ERRORED = "api/ALL_FIELD_GET_ERRORED";
const ALL_FIELD_GET_LOADING = "api/ALL_FIELD_GET_LOADING";
const ALL_FIELD_GET_SUCCESS = "api/ALL_FIELD_GET_SUCCESS";

const initState = {
};

export default function reducer(state = initState, action) {
    switch (action.type) {
      case ALL_FIELD_GET_ERRORED:
        return {
          ...state,
          error: action.error,
        };
  
      case ALL_FIELD_GET_LOADING:
        return {
          ...state,
          isGetLoading: action.isGetLoading
        };
  
      case ALL_FIELD_GET_SUCCESS:
        return {
          items: action.items,
        };

      default:
        return state;
        break;
    }
}

export function allFieldItemsFetchData(userId) {
    return (dispatch) => {
        dispatch(request(true));

        userService.get_all_field_list(userId)
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
    
  function request(bool) { return { type: ALL_FIELD_GET_LOADING, isGetLoading: bool } }
  function success(items) { return { type: ALL_FIELD_GET_SUCCESS, items } }
  function failure(error) { return { type: ALL_FIELD_GET_ERRORED, error } }
}