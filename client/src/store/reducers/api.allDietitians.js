import { userService } from '../../services';

const ALL_DIETITIANS_GET_ERRORED = "api/ALL_DIETITIANS_GET_ERRORED";
const ALL_DIETITIANS_GET_LOADING = "api/ALL_DIETITIANS_GET_LOADING";
const ALL_DIETITIANS_GET_SUCCESS = "api/ALL_DIETITIANS_GET_SUCCESS";

const initState = {
};

export default function reducer(state = initState, action) {
    switch (action.type) {
      case ALL_DIETITIANS_GET_ERRORED:
        return {
          error: action.error
        }

      case ALL_DIETITIANS_GET_LOADING:
        return {
          ...state,
          isGetLoading: true,
        }
  
      case ALL_DIETITIANS_GET_SUCCESS:
        return {
          isGetLoading: false,
          data: action.items,
        }

      default:
        break;
    }
    
    return state;
}

export function getAllDietitians() {
    return (dispatch) => {
        dispatch(request());

        userService.get_all_dietitians()
        .then(
            items => { 
                console.log(items)
                dispatch(success(items));
                //window.history.push('/');
            },
            error => {
                dispatch(failure(error.toString()));
                // dispatch(alertActions.error(error.toString()));
            }
        );
    };
    
  function request() { return { type: ALL_DIETITIANS_GET_LOADING } }
  function success(items) { return { type: ALL_DIETITIANS_GET_SUCCESS, items } }
  function failure(error) { return { type: ALL_DIETITIANS_GET_ERRORED, error } }
}