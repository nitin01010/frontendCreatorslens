import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivatedRouter = () => {
  const user = Cookies.get("user");
  return user ? <Outlet /> : <Navigate to="/account" />;
};

export default PrivatedRouter;
