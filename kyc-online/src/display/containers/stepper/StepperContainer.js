import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TOGGLE_STEPPER,
  NEXT_STEP,
  PREV_STEP,
} from "../../../store/actions/StepperAction";

const StakeHolder = React.lazy(() =>
  import("../stepper/stakeholder/StakeHolderContainer")
);
const CompanyDetails = React.lazy(() =>
  import("../stepper/companydetails/CompanyDetailsContainer")
);
const CompanyAddress = React.lazy(() =>
  import("../stepper/companyaddress/CompanyAddressContainer")
);
const BizChannel = React.lazy(() =>
  import("../stepper/bizchannel/BizChannelContainer")
);
const MeetRMSetting = React.lazy(() =>
  import("../stepper/meetrmsetting/MeetRMSettingContainer")
);
const ProductSummary = React.lazy(() =>
  import("../stepper/productsummary/ProductSummaryContainer")
);
const DocumentUpload = React.lazy(() =>
  import("../stepper/documentupload/DocumentUploadContainer")
);

const Finish = React.lazy(() => import("../stepper/finish/FinishContainer"));

const StepperContainer = (props) => {
  const dispatch = useDispatch();
  const stepper = useSelector((state) => state.stepper);
  const step = stepper.step;
  const [Company, setCompany] = useState(0);

  useEffect(() => {
    // if (window.sessionStorage.getItem("token") === null) {
    //   props.history.push("/");
    // } else {
    //   dispatch({ type: TOGGLE_STEPPER });
    // }
    dispatch({ type: TOGGLE_STEPPER, stepHeader: true });
  }, [dispatch, props.history]);

  const nextStep = () => {
    dispatch({ type: NEXT_STEP, step });
  };

  const prevStep = () => {
    dispatch({ type: PREV_STEP, step });
  };
  const goCmp = (sCmp) => {
    setCompany(sCmp);
  };
  const finishStep = () => {
    dispatch({ type: TOGGLE_STEPPER, stepHeader: false });
    props.history.push("/");
  }

  switch (step) {
    case 0:
      if (Company === 0) return <CompanyDetails goCmp={goCmp} />;
      else return <CompanyAddress nextStep={nextStep} goCmp={goCmp} />;
    case 1:
      return <ProductSummary nextStep={nextStep} prevStep={prevStep} />;
    case 2:
      return <StakeHolder nextStep={nextStep} prevStep={prevStep} />;
    case 3:
      return <BizChannel nextStep={nextStep} prevStep={prevStep} />;
    case 4:
      return <DocumentUpload nextStep={nextStep} prevStep={prevStep} />;
    case 5:
      return <MeetRMSetting nextStep={nextStep} prevStep={prevStep} />;
    case 6:
      return <Finish finishStep={finishStep}/>;
    // case 7:
    //   return <CompanyAddress />;
    default:
      return <CompanyDetails />;
  }
};

export default StepperContainer;
