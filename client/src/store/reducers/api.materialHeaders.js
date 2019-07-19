import { userService } from '../../services';

const MATERIAL_HEADERS_GET_ERRORED = "api/MATERIAL_HEADERS_GET_ERRORED";
const MATERIAL_HEADERS_GET_LOADING = "api/MATERIAL_HEADERS_GET_LOADING";
const MATERIAL_HEADERS_GET_SUCCESS = "api/MATERIAL_HEADERS_GET_SUCCESS";

const initState = {
    items: {}
};

export default function reducer(state = initState, action) {
    switch (action.type) {
      case MATERIAL_HEADERS_GET_ERRORED:
        return {
          ...state,
          isLoaded: true,
          error: action.error,
        };
  
      case MATERIAL_HEADERS_GET_LOADING:
        return {
          ...state,
          isLoaded: false,
        };
  
      case MATERIAL_HEADERS_GET_SUCCESS:
        return {
          ...state,
          items: action.items,
          isLoaded: true,
        };

      default:
        return state;
        break;
    }
}

export function getMaterialHeaders(userId) {
    return (dispatch) => {
        dispatch(request());

        userService.get_materials(userId)
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
    
  function request(bool) { return { type: MATERIAL_HEADERS_GET_LOADING } }
  function success(items) { return { type: MATERIAL_HEADERS_GET_SUCCESS, items } }
  function failure(error) { return { type: MATERIAL_HEADERS_GET_ERRORED, error } }
}