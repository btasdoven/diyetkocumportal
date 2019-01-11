import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from 'redux-thunk';

import { envService } from '../services/env.service'
import rootReducer from "./reducers";

export default envService.isProduction 
    ? createStore(rootReducer, applyMiddleware(thunk))
    : createStore(rootReducer, applyMiddleware(logger, thunk));
