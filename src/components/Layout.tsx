import { Box, DarkMode } from "@chakra-ui/react";
import React from "react";
import { NavBar } from "./NavBar";
import { Wrapper } from "./Wrapper";

interface LayoutProps {
  varient?: "small" | "regular";
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  varient = "regular",
}) => {
  return (
    <Box>
      <NavBar />
      
        <Wrapper varient={varient}>{children}</Wrapper>
    </Box>
  );
};
