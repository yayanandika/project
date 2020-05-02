import React, { useState } from "react";

const Otp = React.lazy(() => import("../auth/otp/OtpContainer"));
const LogReff = React.lazy(() => import("../auth/continue/LogReffContainer"));
const Denied = React.lazy(() => import("../auth/continue/DeniedContainer"));

const ContContainer = () => {
  const [step, setStep] = useState(0);

  const checkData = () => {
    setStep(1);
  };

  const sendOtp =() => {
      setStep(2);
  }

  switch (step) {
    case 0:
      return <LogReff check={checkData} />;
    case 1:
      return <Otp isCont={true} check={sendOtp} />;
    case 2:
      return <Denied />;

    default:
      return <LogReff />;
  }
};

export default ContContainer;
