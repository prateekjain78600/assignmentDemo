import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { RouteConfig } from "./index"; // Adjust import if needed
import { type ReactNode } from "react";
import Cookies from "js-cookie";
import { useAuth } from "../hooks/useAuth";

interface RouteItem {
  path: string;
  element: ReactNode;
  children?: RouteItem[];
}

interface RouteConfigResult {
  routesForAuthenticatedOnly: RouteItem[];
  routesForNotAuthenticatedOnly: RouteItem[];
}
const renderRoutes = (routes: RouteItem[]) =>
  routes.map((route, index) => (
    <Route key={index} path={route.path} element={route.element}>
      {route.children && renderRoutes(route.children)}
    </Route>
  ));

const AppRoutes: React.FC = () => {
  const navigate = useNavigate();
  const { sheetData } = useAuth();
  const location = useLocation();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const authToken = Cookies.get("authToken");
    setToken(authToken ?? null);
  }, []);
  useEffect(() => {
    if (location.pathname === "/") {
      if (token) {
        if (sheetData.length !== 0) {
          navigate("/dashboard", { replace: true });
        } else {
          navigate("/upload", { replace: true }); 
        }
      } else {
        navigate("/login", { replace: true });
      }
    }
  }, [token, sheetData, location.pathname, navigate]);

  const { routesForAuthenticatedOnly, routesForNotAuthenticatedOnly } =
    RouteConfig() as RouteConfigResult;

  return (
    <>
      <Routes>
        {renderRoutes(routesForAuthenticatedOnly)}
        {renderRoutes(routesForNotAuthenticatedOnly)}
      </Routes>
    </>
  );
};

export default AppRoutes;
