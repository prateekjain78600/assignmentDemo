import React, { useState } from "react";
import { styled, Box, Container } from "@mui/material";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PageWrapper = styled("div")({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "40px",
  flexDirection: "column",
});

interface RootLayoutProps {
  children?: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = () => {
  const [isSidebarOpen] = useState<boolean>(true);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  const { token } = useAuth();
  const location = useLocation();

  const isUploadPage = location.pathname === "/upload";

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <PageWrapper className="page-wrapper">
      {!isUploadPage && (
        <>
          <Sidebar
            isCollapsed={isCollapsed}
            isSidebarOpen={isSidebarOpen}
            setIsCollapsed={setIsCollapsed}
            isMobileSidebarOpen={isMobileSidebarOpen}
            onSidebarClose={() => setMobileSidebarOpen(false)}
          />
          <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
        </>
      )}

      <Box
        sx={{
          minHeight: "calc(100vh - 170px)",
          marginLeft: !isUploadPage
            ? { xs: "20px", sm: "20px", lg: "260px" }
            : "0px",
          marginRight: !isUploadPage ? "10px" : "0px",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            mt: !isUploadPage ? 12 : 2, // Adjust margin for upload page
            zIndex: -100,
          }}
        >
          <Outlet />
        </Container>
      </Box>
    </PageWrapper>
  );
};

export default RootLayout;
