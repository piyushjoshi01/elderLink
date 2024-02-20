import React from "react";
import { Route, RouteProps, redirect } from "react-router-dom";

import { RoutePaths } from "../utils/enum";

const PrivateRoute = ({ element: element, path }: RouteProps) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken == "") {
    return redirect("/login");
  }
  return <Route element={element} path={path} />;
};

export default PrivateRoute;
