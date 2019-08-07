import { userService } from '../../services';

const DIARY_GET_ERRORED = "api/DIARY_GET_ERRORED";
const DIARY_GET_LOADING = "api/DIARY_GET_LOADING";
const DIARY_GET_SUCCESS = "api/DIARY_GET_SUCCESS";
const DIARY_PUT_ERRORED = "api/DIARY_PUT_ERRORED";
const DIARY_PUT_LOADING = "api/DIARY_PUT_LOADING";

const initState = {
    items: {}
};

export default function reducer(state = initState, action) {
    switch (action.type) {
      case DIARY_PUT_ERRORED:
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
            isPutLoading: false,
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
  
      case DIARY_PUT_LOADING:
        return {
          ...state,
          [action.date]: {
            isPutLoading: true,
            isLoaded: false,
          }
        };

      default:
        return state;
        break;
    }
}

export function putDiary(userId, date, val) {
    return (dispatch) => {
        dispatch(request(date));

        userService.put_diary(userId, date, val)
        .then(
            (data) => { 
                getDiary(userId, date)(dispatch);
            },
            error => {
                dispatch(failure(error.toString(), date));
            }
        );
    };
  
  function request(date) { return { type: DIARY_PUT_LOADING, date, isPutLoading: true } }
  function failure(error, date) { return { type: DIARY_PUT_ERRORED, date, error } }
}

export function getDiary(userId, date) {
  return (dispatch) => {
      dispatch(request(date));

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
    
  function request(date) { return { type: DIARY_GET_LOADING, date } }
  function success(items, date) { return { type: DIARY_GET_SUCCESS, items, date } }
  function failure(error, date) { return { type: DIARY_GET_ERRORED, error, date } }
}