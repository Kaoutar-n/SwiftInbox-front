import {  Outlet } from "react-router-dom";

import { MainHome } from "./MainHome";


interface ProtectedRoutesProps {
  isLogged: boolean;
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ isLogged }) => {
  return isLogged ? <Outlet /> : <MainHome />;
};

export default ProtectedRoutes;
