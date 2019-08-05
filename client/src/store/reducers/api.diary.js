import { userService } from '../../services';

const DIARY_GET_ERRORED = "api/DIARY_GET_ERRORED";
const DIARY_GET_LOADING = "api/DIARY_GET_LOADING";
const DIARY_GET_SUCCESS = "api/DIARY_GET_SUCCESS";

const initState = {
    items: {}
};

export default function reducer(state = initState, action) {
    switch (action.type) {
      case DIARY_GET_ERRORED:
        return {
          ...state,
          [action.date]: {
            isLoaded: true,
            error: action.error,
          }
        };
  
      case DIARY_GET_LOADING:
        return {
          ...state,
          [action.date]: {
            isLoaded: false,
          }
        };
  
      case DIARY_GET_SUCCESS:
        return {
          ...state,
          [action.date]: {
            items: action.items,
            isLoaded: true,
          }
        };

      default:
        return state;
        break;
    }
}

export function getDiary(userId, date) {
    return (dispatch) => {
        dispatch(request());

        userService.get_diary(userId, date)
        .then(
            items => { 
                dispatch(success(items, date));
                //window.history.push('/');
            },
            error => {
                dispatch(failure(error.toString(), date));
                // dispatch(alertActions.error(error.toString()));
            }
        );
    };
    
  function request(bool) { return { type: DIARY_GET_LOADING } }
  function success(items, date) { return { type: DIARY_GET_SUCCESS, items, date } }
  function failure(error, date) { return { type: DIARY_GET_ERRORED, error, date } }
}