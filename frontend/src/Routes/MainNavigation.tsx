
import { Route, Routes, } from "react-router-dom";
import { RoutePaths } from "@/utils/enum";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import Home from "@/pages/Home";
import Aboutus from "@/pages/Aboutus";

const AppRoutes: React.FC = () => {
    return (
      <Routes>
        <Route  path={RoutePaths.Login} Component={Login} />
        <Route  path={RoutePaths.Register} Component={SignUp} />
        <Route  path={RoutePaths.Home} Component={Home} />
        <Route  path={RoutePaths.Aboutus} Component={Aboutus}/>
       
      </Routes>
    );
  };
  
  export default AppRoutes;