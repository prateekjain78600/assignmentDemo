import React from "react";
import {
  ListItemIcon,
  ListItem,
  List,
  styled,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import Box from "@mui/material/Box";
import { Link, useLocation } from "react-router-dom";

interface NavItemProps {
  item: {
    id: string | number;
    title: string;
    href: string;
    icon: React.ElementType;
  };
  isCollapsed: boolean;
  isLast?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ item, isLast, onClick }) => {
  const Icon = item.icon;
  const itemIcon = <Icon stroke={1.5} />;
  const location = useLocation();
  const isNavLinkActive = location.pathname.startsWith(item.href);

  const ListItemStyled = styled(ListItem)(({ theme }) => ({
    padding: 0,
    maxWidth: "90%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    margin: "0 auto",
    ".MuiButtonBase-root": {
      whiteSpace: "nowrap",
      marginBottom: "12px",
     
      borderRadius: "24px",

      color: isNavLinkActive ? "#fff" : "#000",
      ".MuiListItemIcon-root": {
        color: "#000",
        
      },
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
        color: "#fff",
        ".MuiListItemIcon-root": {
          color: "#fff",
        },
      },
      "&.Mui-selected": {
        backgroundColor: theme.palette.primary.main,
        color: "#fff",
        ".MuiListItemIcon-root": {
          color: "#fff",
        },
        "&:hover": {
          backgroundColor: theme.palette.primary.main,
          color: "#fff",
          ".MuiListItemIcon-root": {
            color: "#fff",
          },
        },
      },
    },
  }));

  const logout = () => {};

  const MenuItemTextMetaWrapper = styled(Box)<{ active: boolean }>(
    ({ active }) => ({
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      transition: "opacity .25s ease-in-out",
      overflow: "hidden",
      fontWeight: active ? 600 : 300,
      lineHeight: 1.6,
    })
  );

  const handleItemClick = () => {
    if (isLast) {
      logout();
    } 
    if (onClick) onClick();
  };

  return (
    <List component="div" disablePadding key={item.id}>
      <ListItemStyled>
        <Box />
        <ListItemButton
          component={Link}
          to={item.href}
          selected={isNavLinkActive}
          onClick={handleItemClick}
        >
          <ListItemIcon
            sx={{
              minWidth: "36px",
              p: "3px 0",
              transition: "margin .25s ease-in-out",
              fontSize: "24px",
            }}
          >
            {itemIcon}
          </ListItemIcon>

          <ListItemText>
            <MenuItemTextMetaWrapper active={isNavLinkActive}>
              {item.title}
              {isNavLinkActive}
            </MenuItemTextMetaWrapper>
          </ListItemText>
        </ListItemButton>
      </ListItemStyled>
    </List>
  );
};

export default NavItem;
