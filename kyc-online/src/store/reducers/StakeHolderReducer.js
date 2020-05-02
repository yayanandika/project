import { GET_LIST } from "../actions/StakeHolderAction";

const StakeHolderState = {
  stakeListData: [],
  stakeCount: 1,
  receiverData: [],
};

export default (state = StakeHolderState, action) => {
  let stakeListData;
  let receiverData;
  switch (action.type) {
    case GET_LIST:
      stakeListData = action.data.stakeholder;
      receiverData = action.data.powerOfAttorney;
      return {
        ...state,
        stakeListData,
        receiverData,
      };
    default:
      return state;
  }
};
