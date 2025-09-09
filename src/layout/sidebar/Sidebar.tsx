import React, { useState, useEffect } from "react";
import { useMediaQuery, Box, Drawer, useTheme, Grid, Typography } from "@mui/material";
import SidebarItems from "./SidebarItems";

interface SidebarProps {
  isCollapsed: boolean;
  isMobileSidebarOpen: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  onSidebarClose: () => void;
  isSidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  isMobileSidebarOpen,
  setIsCollapsed,
  onSidebarClose,
  isSidebarOpen,
}) => {
  const theme = useTheme();
  const [sidebarVariant, setSidebarVariant] = useState<
    "permanent" | "temporary"
  >("permanent");
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const sidebarWidth = "260px";

  useEffect(() => {
    setSidebarVariant(lgUp ? "permanent" : "temporary");
  }, [lgUp]);

  const handleCollapseToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Box sx={{ width: sidebarWidth }}>
      <Drawer
        anchor="left"
        open={lgUp ? isSidebarOpen : isMobileSidebarOpen}
        onClose={!lgUp ? onSidebarClose : undefined}
        variant={sidebarVariant}
        PaperProps={{
          sx: {
            width: sidebarWidth,
            boxSizing: "border-box",
            border: 0,
            overflow: "hidden",
            backgroundColor: "#fff",
            borderRadius: "0px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            height: "100%",
          }}
        >
          <Grid container justifyContent="center" mt={2}>
            <Typography fontFamily={"cursive"} variant="h4" color="primary">Frontend Assessment</Typography>
          </Grid>
          <Box mt={4}>
            <SidebarItems
              isCollapsed={isCollapsed}
              toggleMobileSidebar={handleCollapseToggle}
            />
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
