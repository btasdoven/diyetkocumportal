// import stepCounter from "./stepCounter";
import settings from "./settings";
import auth from "./authenticate";
import apiMessagePreviews from "./api.messagePreviews";
import apiDanisanPreviews from "./api.danisanPreviews";
import apiDanisanProfile from "./api.danisanProfile";
import apiDietitianProfile from "./api.dietitianProfile";
import apiDietitianComments from "./api.dietitianComments";
import apiDanisanNotes from "./api.danisanNotes";
import apiDanisanDietList from './api.danisanDietList';
import apiAllDietitians from './api.allDietitians';
import apiAllPosts from './api.allPosts';
import apiLinks from './api.links';
import apiDanisanFiles from "./api.danisanFiles";
import apiDietitianAppointments from './api.dietitianAppointments'
import apiDanisanMeasurements from './api.danisanMeasurements'
import apiDanisanMessages from './api.danisanMessages'
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
  apiDietitianComments,
  apiAllDietitians,
  apiAllPosts,
  apiDietitianAppointments,
  apiDanisanMeasurements,
  apiLinks,
  apiDanisanFiles,
  apiDanisanMessages,
});

export default reducers;
