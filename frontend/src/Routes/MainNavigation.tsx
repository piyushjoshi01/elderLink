import { Route, Routes } from "react-router-dom";
import { RoutePaths } from "@/utils/enum";

import SignUp from "@/pages/SignUp";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import UserProfile from "@/pages/Userprofile";
import Requests from "@/pages/Requests";
import Posthelp from "@/pages/Posthelp";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={RoutePaths.Login} Component={Login} />
      <Route path={RoutePaths.Register} Component={SignUp} />
      <Route path={RoutePaths.Home} Component={Home} />
      <Route path={RoutePaths.Userprofile} Component={UserProfile} />
      <Route path={RoutePaths.Posthelp} Component={Posthelp} />
      <Route path={RoutePaths.Requests} Component={Requests} />
    </Routes>
  );
};

export default AppRoutes;
