import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PublicRouter = () => {
  const user = Cookies.get("user");
  return user ? <Navigate to="/account/admin" /> : <Outlet />
};

export default PublicRouter;
