import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NEXT_STEP, PREV_STEP } from "../../../store/actions/AuthAction";

const Landing = React.lazy(() => import("../auth/landing/LandingContainer"));
const Term = React.lazy(() => import("../auth/term/TermContainer"));
const About = React.lazy(() => import("../auth/about/AboutContainer"));
const Nasabah = React.lazy(() => import("../auth/nasabah/NasabahContainer"));
const Otp = React.lazy(() => import("../auth/otp/OtpContainer"));
const Refferal = React.lazy(() => import("../auth/refferal/RefferalContainer"));

const AuthContainer = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const step = auth.step;

  useEffect(() => {
    //console.log(auth.step);
  }, [dispatch, auth.step]);

  const nextStep = () => {
    dispatch({ type: NEXT_STEP, step });
  };

  const prevStep = () => {
    dispatch({ type: PREV_STEP, step });
  };

  switch (auth.step) {
    case 0:
      return <Landing nextStep={nextStep} />;
    case 1:
      return <Term nextStep={nextStep} />;
    case 2:
      return <About nextStep={nextStep} prevStep={prevStep} />;
    case 3:
      return <Nasabah nextStep={nextStep} prevStep={prevStep} />;
    case 4:
      return <Otp nextStep={nextStep} />;
    case 5:
      return <Refferal />;
    default:
      return <Landing />;
  }
};

export default AuthContainer;
