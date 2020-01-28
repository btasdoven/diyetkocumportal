import { userService } from '../../services';
import { getDanisanPreviews } from './api.danisanPreviews'

const DIETITIAN_APPOINTMENT_GET_ERRORED = "api/DIETITIAN_APPOINTMENT_GET_ERRORED";
const DIETITIAN_APPOINTMENT_GET_LOADING = "api/DIETITIAN_APPOINTMENT_GET_LOADING";
const DIETITIAN_APPOINTMENT_GET_SUCCESS = "api/DIETITIAN_APPOINTMENT_GET_SUCCESS";

const DIETITIAN_APPOINTMENT_PUT_ERRORED = "api/DIETITIAN_APPOINTMENT_PUT_ERRORED";
const DIETITIAN_APPOINTMENT_PUT_LOADING = "api/DIETITIAN_APPOINTMENT_PUT_LOADING";

const initState = {
};

const ModifyKeys = (items) => {
  console.log(items)
  var ret = {}
  Object.keys(items).map((k) => {
    ret[k] = {
      data: items[k],
      isGetLoading: false,
      isPutLoading: false,
    }
  })

  console.log(ret)
  return ret
}

const getValue = (obj, arr) => {
  if (!obj)
    return {};

  if (arr.length == 0) {
    return obj;
  }

  var key = arr.shift()
  return getValue(obj[key], arr)
}

export default function reducer(state = initState, action) {
    switch (action.type) {
      case DIETITIAN_APPOINTMENT_GET_ERRORED:
      case DIETITIAN_APPOINTMENT_PUT_ERRORED:
        if (action.date) {
          return {
            ...state,
            [action.userId]: {
              ...state[action.userId],
              [action.date]: {
                error: action.error
              },
            }
          }
        } else {
          return {
            ...state,
            [action.userId]: {
              error: action.error
            }
          }
        }
      case DIETITIAN_APPOINTMENT_GET_LOADING:
        if (action.date) {
          return {
            ...state,
            [action.userId]: {
              ...state[action.userId],
              [action.date]: {
                isGetLoading: true,
              },
            }
          }
        } else {
          return {
            ...state,
            [action.userId]: {
              ...state[action.userId],
              isGetLoading: true,
            }
          }
        }
      case DIETITIAN_APPOINTMENT_GET_SUCCESS:
        if (action.date) {
          return {
            ...state,
            [action.userId]: {
              ...state[action.userId],
              data: {
                ...state[action.userId].data,
                [action.date]: {
                  isGetLoading: false,
                  isPutLoading: false,
                  data: action.items,
                } 
              },
            }
          }
        } else {
          return {
            ...state,
            [action.userId]: {
                isGetLoading: false,
                isPutLoading: false,
                data: ModifyKeys(action.items),
            }
          }
        }
      case DIETITIAN_APPOINTMENT_PUT_LOADING:
        return {
          ...state,
          [action.userId]: {
            ...state[action.userId],
            data: {
              ...state[action.userId].data,
              [action.date]: {
                ...(getValue(state, [action.userId, 'data', action.date])),
                isPutLoading: true,
              }
            },
          }
        };

      default:
        break;
    }
    
    return state;
}

export function getDietitianAppointments(userId, date) {
    return (dispatch) => {
        dispatch(request(userId, date));

        userService.get_dietitian_appointments(userId, date)
        .then(
            items => { 
                dispatch(success(items, userId, date));
            },
            error => {
                dispatch(failure(error.toString(), userId, date));
            }
        );
    };
    
  function request(userId, date) { return { type: DIETITIAN_APPOINTMENT_GET_LOADING, userId, date } }
  function success(items, userId, date) { return { type: DIETITIAN_APPOINTMENT_GET_SUCCESS, userId, date, items } }
  function failure(error, userId, date) { return { type: DIETITIAN_APPOINTMENT_GET_ERRORED, userId, date, error } }
}

export function putDietitianAppointment(userId, date, time, values) {
    return (dispatch) => {
        dispatch(request(userId, date, time));

        userService.put_dietitian_appointment(userId, date, time, values)
        .then(
            (data) => { 
              getDietitianAppointments(userId, date)(dispatch);
              getDanisanPreviews(userId)(dispatch);
            },
            error => {
                dispatch(failure(userId, date, time, error.toString()));
            }
        );
    };
  
  function request(userId, date, time) { return { type: DIETITIAN_APPOINTMENT_PUT_LOADING, userId, date, time, isPutLoading: true } }
  function failure(userId, date, time, error) { return { type: DIETITIAN_APPOINTMENT_PUT_ERRORED, userId, date, time, error } }
}