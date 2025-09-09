import * as React from "react";
import {
  Grid,
  Box,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Divider,
  ListItemIcon,
  Button,
  Tooltip,
  Avatar,
} from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { AdminIcon, LogoutIcon } from "../../components/icons";
import { useNavigate } from "react-router-dom";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const { user } = useAuth();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Profile">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{
              ml: 2,
              padding: "6px",
              borderRadius: "8px",
            }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Grid
              container
              spacing={2}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Avatar src={user?.photoURL || ""}>
                {user?.displayName?.[0]}
              </Avatar>
              <Grid
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
              >
                <Typography variant="body1">{user?.displayName}</Typography>
                <Typography variant="body2" color="primary">
                  {user?.email}
                </Typography>
              </Grid>
            </Grid>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/profile");
          }}
        >
          <ListItemIcon>
            <AdminIcon size={"22px"} />
          </ListItemIcon>
          Profile
        </MenuItem>
        <Divider />

        <MenuItem>
          <Button
            variant="outlined"
            color="primary"
            onClick={logout}
            fullWidth
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
