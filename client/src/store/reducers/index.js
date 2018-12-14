import stepCounter from "./stepCounter";
import settings from "./settings";
import auth from "./authenticate";
import api from "./api";
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

const reducers = combineReducers({
  stepCounter,
  settings,
  auth,
  api,
  form: formReducer
});

export default reducers;
