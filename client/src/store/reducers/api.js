import { userService } from '../../services';

const ITEMS_GET_ERRORED = "api/ITEMS_GET_ERRORED";
const ITEMS_GET_LOADING = "api/ITEMS_GET_LOADING";
const ITEMS_GET_SUCCESS = "api/ITEMS_GET_SUCCESS";

const ITEMS_PUT_ERRORED = "api/ITEMS_PUT_ERRORED";
const ITEMS_PUT_LOADING = "api/ITEMS_PUT_LOADING";

const initState = {
  items: []
};

export default function reducer(state = initState, action) {
    switch (action.type) {
      case ITEMS_GET_ERRORED:
      case ITEMS_PUT_ERRORED:
        return {
          ...state,
          error: action.error
        };
  
      case ITEMS_GET_LOADING:
        return {
          ...state,
          isGetLoading: action.isGetLoading
        };
  
      case ITEMS_GET_SUCCESS:
        return {
          ...state,
          items: action.items
        };
  
        case ITEMS_PUT_LOADING:
        return {
          ...state,
          isPutLoading: action.isPutLoading
        };

      default:
        return state;
        break;
    }
}

export function itemsFetchData(userId) {
    return (dispatch) => {
        dispatch(request(true));

        userService.get_user_data(userId)
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
    
  function request(bool) { return { type: ITEMS_GET_LOADING, isGetLoading: bool } }
  function success(items) { return { type: ITEMS_GET_SUCCESS, items } }
  function failure(error) { return { type: ITEMS_GET_ERRORED, error } }
}

export function itemsPutData(userId, fieldId, val) {
    return (dispatch) => {
        console.log(fieldId);
        dispatch(request(true));

        userService.put_field_data(userId, fieldId, val)
        .then(
            () => { 
              itemsFetchData(userId);
            },
            error => {
                dispatch(failure(error.toString()));
                // dispatch(alertActions.error(error.toString()));
            }
        );
    };

    function request(bool) { return { type: ITEMS_PUT_LOADING, isPutLoading: bool } }
    function failure(error) { return { type: ITEMS_PUT_ERRORED, error } }
}