import stepCounter from "./stepCounter";
import settings from "./settings";
import auth from "./authenticate";
import apiAllFieldList from "./api.allFieldList";
import apiMaterials from "./api.materials";
import apiMaterialHeaders from "./api.materialHeaders";
import apiEnvanter from "./api.envanter";
import apiDiary from "./api.diary";
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

var reds = {
}
const reducers = combineReducers({
  settings,
  auth,
  form: formReducer,
  apiEnvanter,
});

export default reducers;
