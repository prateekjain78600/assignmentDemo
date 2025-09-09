import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./provider/authContext.tsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { baselightTheme } from "./utils/DefaultTheme.tsx/DefaultColos.tsx";
import AppRoutes from "./routes/routes";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={baselightTheme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
