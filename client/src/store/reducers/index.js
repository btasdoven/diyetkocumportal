import stepCounter from "./stepCounter";
import settings from "./settings";
import auth from "./authenticate";
import apiMessagePreviews from "./api.messagePreviews";
import apiDanisanPreviews from "./api.danisanPreviews";
import apiDanisanProfile from "./api.danisanProfile";
import apiDietitianProfile from "./api.dietitianProfile";
import apiDanisanNotes from "./api.danisanNotes";
import apiDanisanDietList from './api.danisanDietList';
import apiLinks from './api.links';
import apiDanisanFiles from "./api.danisanFiles";
import apiDietitianAppointments from './api.dietitianAppointments'
import apiDanisanMeasurements from './api.danisanMeasurements'
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

const reducers = combineReducers({
  settings,
  auth,
  form: formReducer,
  apiMessagePreviews,
  apiDanisanPreviews,
  apiDanisanProfile,
  apiDanisanNotes,
  apiDanisanDietList,
  apiDietitianProfile,
  apiDietitianAppointments,
  apiDanisanMeasurements,
  apiLinks,
  apiDanisanFiles,
});

export default reducers;
