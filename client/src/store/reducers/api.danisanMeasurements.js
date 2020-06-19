import { userService } from '../../services';

const DANISAN_MEASUREMENTS_GET_ERRORED = "api/DANISAN_MEASUREMENTS_GET_ERRORED";
const DANISAN_MEASUREMENTS_GET_LOADING = "api/DANISAN_MEASUREMENTS_GET_LOADING";
const DANISAN_MEASUREMENTS_GET_SUCCESS = "api/DANISAN_MEASUREMENTS_GET_SUCCESS";

const DANISAN_MEASUREMENTS_PUT_ERRORED = "api/DANISAN_MEASUREMENTS_PUT_ERRORED";
const DANISAN_MEASUREMENTS_PUT_LOADING = "api/DANISAN_MEASUREMENTS_PUT_LOADING";

const DANISAN_MEASUREMENTS_DELETE_ERRORED = "api/DANISAN_MEASUREMENTS_DELETE_ERRORED";
const DANISAN_MEASUREMENTS_DELETE_LOADING = "api/DANISAN_MEASUREMENTS_DELETE_LOADING";

const initState = {
};

export default function reducer(state = initState, action) {
    switch (action.type) {
      case DANISAN_MEASUREMENTS_GET_ERRORED:
      case DANISAN_MEASUREMENTS_PUT_ERRORED:
      case DANISAN_MEASUREMENTS_DELETE_ERRORED:
        return {
          ...state,
          [action.userId]: {
            ...state[action.userId],
            [action.danisanUserName]: {
              error: action.error
            },
          }
        }

      case DANISAN_MEASUREMENTS_GET_LOADING:
        return {
          ...state,
          [action.userId]: {
            ...state[action.userId],
            [action.danisanUserName]: {
              isGetLoading: true,
            },
          }
        }
  
      case DANISAN_MEASUREMENTS_GET_SUCCESS:
        return {
          ...state,
          [action.userId]: {
            ...state[action.userId],
            [action.danisanUserName]: {
              lastStateChangeTime: (state[action.userId][action.danisanUserName].lastStateChangeTime ? state[action.userId][action.danisanUserName].lastStateChangeTime : 0) + 1,
              isGetLoading: false,
              isPutLoading: false,
              data: action.items,
            },
          }
        }

      case DANISAN_MEASUREMENTS_PUT_LOADING:
        return {
          ...state,
          [action.userId]: {
            ...state[action.userId],
            [action.danisanUserName]: {
              isPutLoading: true,
            },
          }
        };

        case DANISAN_MEASUREMENTS_DELETE_LOADING:
          return {
            ...state,
            [action.userId]: {
              ...state[action.userId],
              [action.danisanUserName]: {
                ...state[action.userId][action.danisanUserName],
                data: {
                  ...state[action.userId][action.danisanUserName].data,
                  [action.date]: {
                    ...state[action.userId][action.danisanUserName].data[action.date],
                    [action.time]: {
                      ...state[action.userId][action.danisanUserName].data[action.date][action.time],
                      isDeleteLoading: true
                    }
                  }
                }
              },
            }
          };

      default:
        break;
    }
    
    return state;
}

export function getDanisanMeasurements(userId, danisanUserName) {
    return (dispatch) => {
        dispatch(request(userId, danisanUserName));

        userService.get_danisan_measurements(userId, danisanUserName)
        .then(
            items => { 
                dispatch(success(items, userId, danisanUserName));
                //window.history.push('/');
            },
            error => {
                dispatch(failure(error.toString(), userId, danisanUserName));
                // dispatch(alertActions.error(error.toString()));
            }
        );
    };
    
  function request(userId, danisanUserName) { return { type: DANISAN_MEASUREMENTS_GET_LOADING, userId, danisanUserName } }
  function success(items, userId, danisanUserName) { return { type: DANISAN_MEASUREMENTS_GET_SUCCESS, userId, danisanUserName, items } }
  function failure(error, userId, danisanUserName) { return { type: DANISAN_MEASUREMENTS_GET_ERRORED, userId, danisanUserName, error } }
}

export function deleteDanisanMeasurement(userId, danisanUserName, date, time) {
  return (dispatch) => {
    dispatch(request(userId, danisanUserName, date, time));

    userService.delete_danisan_measurement(userId, danisanUserName, date, time)
      .then(
        (data) => { 
          getDanisanMeasurements(userId, danisanUserName)(dispatch);
        },
        error => {
            dispatch(failure(userId, danisanUserName, date, time, error.toString()));
        }
    );
  };

  function request(userId, danisanUserName, date, time) { return { type: DANISAN_MEASUREMENTS_DELETE_LOADING, userId, danisanUserName, date, time, isDeleteLoading: true } }
  function failure(userId, danisanUserName, date, time, error) { return { type: DANISAN_MEASUREMENTS_DELETE_ERRORED, userId, danisanUserName, date, time, error } }  
}

export function addDanisanMeasurement(userId, danisanUserName, danisanMeasurement) {
    return (dispatch) => {
        dispatch(request(userId, danisanUserName));

        userService.add_danisan_measurement(userId, danisanUserName, danisanMeasurement)
        .then(
            (data) => { 
              getDanisanMeasurements(userId, danisanUserName)(dispatch);
            },
            error => {
                dispatch(failure(userId, danisanUserName, error.toString()));
            }
        );
    };
  
  function request(userId, danisanUserName) { return { type: DANISAN_MEASUREMENTS_PUT_LOADING, userId, danisanUserName, isPutLoading: true } }
  function failure(userId, danisanUserName, error) { return { type: DANISAN_MEASUREMENTS_PUT_ERRORED, userId, danisanUserName, error } }
}

export function addDanisanMeasurementWithPhoto(userId, danisanUserName, danisanMeasurement) {
    return (dispatch) => {
        dispatch(request(userId, danisanUserName));

        userService.add_danisan_measurement_with_photo(userId, danisanUserName, danisanMeasurement)
        .then(
            (data) => { 
              getDanisanMeasurements(userId, danisanUserName)(dispatch);
            },
            error => {
                dispatch(failure(userId, danisanUserName, error.toString()));
            }
        );
    };
  
  function request(userId, danisanUserName) { return { type: DANISAN_MEASUREMENTS_PUT_LOADING, userId, danisanUserName, isPutLoading: true } }
  function failure(userId, danisanUserName, error) { return { type: DANISAN_MEASUREMENTS_PUT_ERRORED, userId, danisanUserName, error } }
}