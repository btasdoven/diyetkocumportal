import stepCounter from "./stepCounter";
import settings from "./settings";
import auth from "./authenticate";
import apiMessagePreviews from "./api.messagePreviews";
import apiDanisanPreviews from "./api.danisanPreviews";
import apiDanisanProfile from "./api.danisanProfile";
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

const reducers = combineReducers({
  settings,
  auth,
  form: formReducer,
  apiMessagePreviews,
  apiDanisanPreviews,
  apiDanisanProfile,
});

export default reducers;
