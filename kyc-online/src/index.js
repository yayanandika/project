import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import configureStore from "./store/ContainerReducer";

// Route
import { BrowserRouter, Route, Switch } from "react-router-dom";
import routes from "./config/routes";


// Default Styles
import "./assets/css/general.scss";

const loading = () => {
  return <div></div>;
};
const ContentLayout = React.lazy(() => import("./display/layouts/Content"));

ReactDOM.render(
  <Provider store={configureStore()}>
    <BrowserRouter>
      <Switch>
        <Suspense fallback={loading()}>
          {routes.map((route, idx) => {
            return route.component ? (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                render={props => (
                  <Suspense fallback={loading()}>
                    <ContentLayout
                      title={route.title}
                      path={route.path}
                      viewLogged={route.component}
                      {...props}
                    />
                  </Suspense>
                )}
              />
            ) : null;
          })}
        </Suspense>
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
