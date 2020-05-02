import {
  NEXT_STEP,
  PREV_STEP,
  TO_HOME,
  SET_ABOUT,
} from "../actions/AuthAction";

const AuthState = {
  step: 0,
  industryType: "",
  industryName: "",
  npwpNumber: "",
};

export default (state = AuthState, action) => {
  let step;
  let industryName;
  let industryType;
  let npwpNumber;
  switch (action.type) {
    case NEXT_STEP:
      step = action.step + 1;
      return {
        ...state,
        step,
      };
    case PREV_STEP:
      step = action.step - 1;
      return {
        ...state,
        step,
      };
    case TO_HOME:
      step = state.step;
      return {
        ...state,
        step,
      };
    case SET_ABOUT:
      industryName = action.companyName;
      industryType = action.companyType;
      npwpNumber = action.nwpwNumber;
      return {
        ...state,
        industryName,
        industryType,
        npwpNumber,
      };
    default:
      return state;
  }
};
