import { Route, Routes } from "react-router-dom";
import { RoutePaths } from "@/utils/enum";

import SignUp from "@/pages/SignUp";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import UserProfile from "@/pages/Userprofile";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={RoutePaths.Login} Component={Login} />
      <Route path={RoutePaths.Register} Component={SignUp} />
      <Route path={RoutePaths.Home} Component={Home} />
      <Route path={RoutePaths.Userprofile} Component={UserProfile} />
    </Routes>
  );
};

export default AppRoutes;
