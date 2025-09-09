import { type ReactNode } from "react";
import { Box } from "@mui/material";

interface BlankLayoutProps {
  children: ReactNode;
}

const BlankLayout = ({ children }: BlankLayoutProps) => {
  return <Box>{children}</Box>;
};

export default BlankLayout;
