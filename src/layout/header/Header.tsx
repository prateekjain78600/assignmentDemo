import React from "react";
import { AppBar, IconButton, styled, Grid } from "@mui/material";
import { MenuIcon } from "../../components/icons";
import Profile from "./profile";

const AppBarStyled = styled(AppBar)(() => ({
  boxShadow: "none",
  backgroundColor: "#fff",
  transition: "none",
  padding: "10px",
  color: "#000",
  borderRadius: "0px",
  height: "75px",
  justifyContent: "center",
  zIndex: 100,
}));

interface HeaderProps {
  toggleMobileSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleMobileSidebar }) => {
  return (
    <AppBarStyled position="fixed">
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid>
          <IconButton
            aria-label="menu"
            onClick={toggleMobileSidebar}
            sx={{
              display: { xs: "flex", lg: "none" },
            }}
          >
            <MenuIcon size={22} />
          </IconButton>
        </Grid>

        <Grid container justifyContent={"center"} alignItems={"center"}>
          <Profile />
        </Grid>
      </Grid>
    </AppBarStyled>
  );
};

export default Header;
