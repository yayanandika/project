import {
  TOGGLE_STEPPER,
  CHANGE_STEP,
  NEXT_STEP,
  PREV_STEP
} from "../actions/StepperAction";

const StepperState = {
  stepHeader: false,
  step: 2,
  lastStep: 6
};

export default (state = StepperState, action) => {
  let stepHeader;
  let step;
  let lastStep;
  switch (action.type) {
    case TOGGLE_STEPPER:
      stepHeader = action.stepHeader;
      return {
        ...state,
        stepHeader
      };
    case NEXT_STEP:
      step = action.step + 1;
      if (lastStep < step) {
        lastStep = step;
      }
      return {
        ...state,
        step,
        lastStep
      };

    case PREV_STEP:
      step = action.step - 1;
      return {
        ...state,
        step
      };

    case CHANGE_STEP:
      step = action.index;
      return {
        ...state,
        step
      };

    default:
      return state;
  }
};
