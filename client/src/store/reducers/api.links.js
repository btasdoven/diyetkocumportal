import { userService } from '../../services';

const LINKS_GET_ERRORED = "api/LINKS_GET_ERRORED";
const LINKS_GET_LOADING = "api/LINKS_GET_LOADING";
const LINKS_GET_SUCCESS = "api/LINKS_GET_SUCCESS";

const LINKS_PUT_ERRORED = "api/LINKS_PUT_ERRORED";
const LINKS_PUT_LOADING = "api/LINKS_PUT_LOADING";

const initState = {
};

export default function reducer(state = initState, action) {
    switch (action.type) {
      case LINKS_GET_ERRORED:
      case LINKS_PUT_ERRORED:
        return {
          ...state,
          [action.linkId]: {
            error: action.error
          }
        }

      case LINKS_GET_LOADING:
        return {
          ...state,
          [action.linkId]: {
            ...state[action.linkId],
            isGetLoading: true,
          }
        }
  
      case LINKS_GET_SUCCESS:
        return {
          ...state,
          [action.linkId]: {
            lastStateChangeTime: (state[action.linkId].lastStateChangeTime ? state[action.linkId].lastStateChangeTime : 0) + 1,
            isGetLoading: false,
            isPutLoading: false,
            data: action.items,
          }
        }

      case LINKS_PUT_LOADING:
        return {
          ...state,
          [action.linkId]: {
            ...state[action.linkId],
            isPutLoading: true
          }
        }

      default:
        break;
    }
    
    return state;
}

export function getLinkInfo(linkId) {
    return (dispatch) => {
        dispatch(request(linkId));

        userService.get_link_info(linkId)
        .then(
            items => { 
                dispatch(success(items, linkId));
                //window.history.push('/');
            },
            error => {
                dispatch(failure(error.toString(), linkId));
                // dispatch(alertActions.error(error.toString()));
            }
        );
    };
    
  function request(linkId) { return { type: LINKS_GET_LOADING, linkId } }
  function success(items, linkId) { return { type: LINKS_GET_SUCCESS, linkId, items } }
  function failure(error, linkId) { return { type: LINKS_GET_ERRORED, linkId, error } }
}