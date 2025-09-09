import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const GuestOnlyRoute = () => {
  const token = Cookies.get("authToken");
  return token ? <Navigate to="/" replace /> : <Outlet />;
};

export default GuestOnlyRoute;