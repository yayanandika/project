import React from "react";

const Auth = React.lazy(() =>
  import("../display/containers/auth/AuthContainer")
);

const Cont = React.lazy(() =>
  import("../display/containers/auth/ContContainer")
);

const Stepper = React.lazy(() =>
  import("../display/containers/stepper/StepperContainer")
);

const routes = [
  {
    path: "/",
    exact: true,
    name: "Landing",
    component: Auth,
    title: "Landing",
    mustLogged: false
  },
  {
    path: "/cont",
    exact: true,
    name: "Continue",
    component: Cont,
    title: "Continue",
    mustLogged: false
  },
  {
    path: "/ntb",
    exact: true,
    name: "Stepper",
    component: Stepper,
    title: "Stepper",
    mustLogged: true
  }
];

export default routes;
