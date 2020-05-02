import { combineReducers } from "redux";
import authReducer from "./reducers/AuthReducer";
import stepReducer from "./reducers/StepperReducer";
import stakeHolderReducer from "./reducers/StakeHolderReducer";
export default combineReducers({
  auth: authReducer,
  stepper: stepReducer,
  stakeHolder: stakeHolderReducer
});
