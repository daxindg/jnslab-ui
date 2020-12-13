import { ArrowUpIcon } from "@chakra-ui/icons";
import { Box, Button, DarkMode, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import { isServer } from "../utils/isServer";
import { NavBar } from "./NavBar";
import { Wrapper } from "./Wrapper";

interface LayoutProps {
  varient?: "small" | "regular" | "large";
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  varient = "large",
}) => {
  const [ws, setws] = useState(0);
  if (!isServer()) window.onscroll = () => setws(window.scrollY);
  return (
    <Box onScroll={() => console.log(window.scrollY)}>
      <NavBar />

      <Wrapper varient={varient}>{children}</Wrapper>
      {!isServer() && ws > 500 ? (
        <IconButton
          onClick={() => {
            window.scrollTo({ top: 0 });
          }}
          position="sticky"
          bottom={10}
          left="90vw"
          aria-label="to top"
          icon={<ArrowUpIcon />}
        />
      ) : null}
    </Box>
  );
};
