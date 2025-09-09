import React from "react";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import Menuitems from "./MenuItems";
import { useAuth } from "../../hooks/useAuth";

interface MenuItem {
  id: string | number;
  title: string;
  href: string;
  icon: React.ElementType;
}

interface SidebarItemsProps {
  isCollapsed: boolean;
  toggleMobileSidebar: () => void;
}

const SidebarItems: React.FC<SidebarItemsProps> = ({
  isCollapsed,
  toggleMobileSidebar,
}) => {
  const { logout } = useAuth();
  return (
    <>
      <List>
        {Menuitems.slice(0, -1).map((item: MenuItem) => (
          <NavItem
            item={item}
            key={item.id}
            isCollapsed={isCollapsed}
            onClick={toggleMobileSidebar}
          />
        ))}
      </List>
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          bottom: 0,
        }}
      >
        <NavItem
          item={Menuitems[Menuitems.length - 1]}
          isCollapsed={isCollapsed}
          isLast={true}
          onClick={logout}
        />
      </Box>
    </>
  );
};

export default SidebarItems;
