import { userService } from '../../services';

const ITEMS_HAS_ERRORED = "api/ITEMS_HAS_ERRORED";
const ITEMS_IS_LOADING = "api/ITEMS_IS_LOADING";
const ITEMS_FETCH_DATA_SUCCESS = "api/ITEMS_FETCH_DATA_SUCCESS";

const initState = {
  hasErrored: false,
  isLoading: false,
  items: []
};

export default function reducer(state = initState, action) {
    switch (action.type) {
      case ITEMS_HAS_ERRORED:
        return {
          ...state,
          error: action.error
        };
  
      case ITEMS_IS_LOADING:
        return {
          ...state,
          isLoading: action.isLoading
        };
  
      case ITEMS_FETCH_DATA_SUCCESS:
        return {
          ...state,
          items: action.items
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
    
  function request(bool) { return { type: ITEMS_IS_LOADING, isLoading: bool } }
  function success(items) { return { type: ITEMS_FETCH_DATA_SUCCESS, items } }
  function failure(error) { return { type: ITEMS_HAS_ERRORED, error } }
}