import stepCounter from "./stepCounter";
import settings from "./settings";
import auth from "./authenticate";
import apiAllFieldList from "./api.allFieldList";
import apiMaterials from "./api.materials";
import apiMaterialHeaders from "./api.materialHeaders";
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

var reds = {
}
const reducers = combineReducers({
  stepCounter,
  settings,
  auth,
  apiAllFieldList,
  form: formReducer,
  apiMaterials,
  apiMaterialHeaders,
});

export default reducers;
