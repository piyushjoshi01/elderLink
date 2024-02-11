
import { Route, Routes, } from "react-router-dom";
import { RoutePaths } from "@/utils/enum";

import Home from "@/pages/Home";


const AppRoutes: React.FC = () => {
    return (
        <Routes>

            <Route path={RoutePaths.Home} Component={Home} />


        </Routes>
    );
};

export default AppRoutes;