import userReducer from "./userReducer";
import classMembersReducer from "./classMembersReducer";
import trainingSeriesReducer from "./trainingSeriesReducer";
import messagesReducer from "./messagesReducer";
import stripeReducer from "./stripeReducer";
import notificationsReducer from "./notificationsReducer";
import responsesReducer from "./responsesReducer";
import classesReducer from './classesReducer';

import { combineReducers } from "redux";


const rootReducer = combineReducers({
  userReducer,
  classMembersReducer,
  trainingSeriesReducer,
  messagesReducer,
  stripeReducer,
  notificationsReducer,
  responsesReducer,
  classesReducer
});

export default rootReducer;
