import { userService } from '../../services';

const ITEMS_GET_ERRORED = "api/ITEMS_GET_ERRORED";
const ITEMS_GET_LOADING = "api/ITEMS_GET_LOADING";
const ITEMS_GET_SUCCESS = "api/ITEMS_GET_SUCCESS";

const ITEMS_PUT_ERRORED = "api/ITEMS_PUT_ERRORED";
const ITEMS_PUT_LOADING = "api/ITEMS_PUT_LOADING";

const initState = {
};

export default function reducer(state = initState, action) {
  
    switch (action.type) {
      case ITEMS_GET_ERRORED:
      case ITEMS_PUT_ERRORED:
        return {
          ...state,
          [action.groupId]: {
            error: action.error,
          }
        };
  
      case ITEMS_GET_LOADING:
        return {
          ...state,
          [action.groupId]: {
            isGetLoading: action.isGetLoading
          }
        };
  
      case ITEMS_GET_SUCCESS:
        return {
          ...state,
          lastStateChangeTime: (state.lastStateChangeTime ? state.lastStateChangeTime : 0) + 1,
          [action.groupId]: {
            isGetLoading: false,
            items: action.items,
          }
        };
  
        case ITEMS_PUT_LOADING:
        return {
          ...state,
          [action.groupId]: {
            isPutLoading: action.isPutLoading
          }
        };

      default:
        return state;
        break;
    }
}

export function getMaterial(userId, groupId) {
    return (dispatch) => {
        dispatch(request(true, groupId));

        userService.get_materials(userId, groupId)
        .then(
            items => { 
                dispatch(success(items, groupId));
                //window.history.push('/');
            },
            error => {
                dispatch(failure(error.toString(), groupId));
                // dispatch(alertActions.error(error.toString()));
            }
        );
    };
    
  function request(bool, groupId) { return { type: ITEMS_GET_LOADING, groupId, isGetLoading: bool } }
  function success(items, groupId) { return { type: ITEMS_GET_SUCCESS, groupId, items } }
  function failure(error, groupId) { return { type: ITEMS_GET_ERRORED, groupId, error } }
}

export function itemsPutData(userId, groupId, val) {
    return (dispatch) => {
        dispatch(request(true, groupId));

        userService.put_group_data(userId, groupId, val)
        .then(
            (data) => { 
              getMaterial(userId, groupId)(dispatch);
            },
            error => {
                dispatch(failure(error.toString(), groupId));
            }
        );
    };

    function request(bool, groupId) { return { type: ITEMS_PUT_LOADING, groupId, isPutLoading: bool } }
    function failure(error, groupId) { return { type: ITEMS_PUT_ERRORED, groupId, error } }
}