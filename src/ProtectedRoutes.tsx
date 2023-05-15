import { Outlet } from "react-router-dom";
import { MainHome } from "./MainHome";

const useAuth= () =>{
    const user= {loggedIn: true};
    return user && user.loggedIn;
}
const ProtectedRoutes = () =>{
    const isAuth = useAuth();

return isAuth? <Outlet/>: <MainHome/>
}
export default ProtectedRoutes;
