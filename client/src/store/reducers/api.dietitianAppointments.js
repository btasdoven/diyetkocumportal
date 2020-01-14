import { userService } from '../../services';

const DIETITIAN_APPOINTMENT_GET_ERRORED = "api/DIETITIAN_APPOINTMENT_GET_ERRORED";
const DIETITIAN_APPOINTMENT_GET_LOADING = "api/DIETITIAN_APPOINTMENT_GET_LOADING";
const DIETITIAN_APPOINTMENT_GET_SUCCESS = "api/DIETITIAN_APPOINTMENT_GET_SUCCESS";

const DIETITIAN_APPOINTMENT_PUT_ERRORED = "api/DIETITIAN_APPOINTMENT_PUT_ERRORED";
const DIETITIAN_APPOINTMENT_PUT_LOADING = "api/DIETITIAN_APPOINTMENT_PUT_LOADING";

const initState = {
};

export default function reducer(state = initState, action) {
    switch (action.type) {
      case DIETITIAN_APPOINTMENT_GET_ERRORED:
      case DIETITIAN_APPOINTMENT_PUT_ERRORED:
        return {
          ...state,
          [action.userId]: {
            ...state[action.userId],
            [action.date]: {
              error: action.error
            },
          }
        }

      case DIETITIAN_APPOINTMENT_GET_LOADING:
        return {
          ...state,
          [action.userId]: {
            ...state[action.userId],
            [action.date]: {
              isGetLoading: true,
            },
          }
        }
  
      case DIETITIAN_APPOINTMENT_GET_SUCCESS:
        return {
          ...state,
          [action.userId]: {
            ...state[action.userId],
            [action.date]: {
              isGetLoading: false,
              isPutLoading: false,
              data: action.items,
            },
          }
        }

      case DIETITIAN_APPOINTMENT_PUT_LOADING:
        return {
          ...state,
          [action.userId]: {
              isPutLoading: true,
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

// export function putDietitianProfile(userId, dietitianProfile) {
//     return (dispatch) => {
//         dispatch(request(userId));

//         userService.put_dietitian_profile(userId, dietitianProfile)
//         .then(
//             (data) => { 
//               getDietitianProfile(userId)(dispatch);
//             },
//             error => {
//                 dispatch(failure(userId, error.toString()));
//             }
//         );
//     };
  
//   function request(userId) { return { type: DIETITIAN_APPOINTMENT_PUT_LOADING, userId, isPutLoading: true } }
//   function failure(userId, error) { return { type: DIETITIAN_APPOINTMENT_PUT_ERRORED, userId, error } }
// }