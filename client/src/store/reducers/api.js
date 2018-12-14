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
          hasErrored: action.hasErrored
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
  
  export function itemsHasErrored(bool) {
    return {
        type: ITEMS_HAS_ERRORED,
        hasErrored: bool
    };
}
export function itemsIsLoading(bool) {
    return {
        type: ITEMS_IS_LOADING,
        isLoading: bool
    };
}
export function itemsFetchDataSuccess(items) {
    return {
        type: ITEMS_FETCH_DATA_SUCCESS,
        items
    };
}

export function itemsFetchData(url) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(itemsIsLoading(false));
                return response;
            })
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((items) => dispatch(itemsFetchDataSuccess(items)))
            .catch((ex) => {
                console.log(ex);
                dispatch(itemsHasErrored(true));
            });
    };
}