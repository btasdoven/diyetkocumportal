import stepCounter from "./stepCounter";
import settings from "./settings";
import auth from "./authenticate";
import apiFields from "./api.fields";
import apiAllFieldList from "./api.allFieldList";
import apiGroups from "./api.groups";
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

const reducers = combineReducers({
  stepCounter,
  settings,
  auth,
  apiAllFieldList,
  apiFields,
  apiGroups,
  form: formReducer
});

export default reducers;
