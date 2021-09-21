import React from "react";
import { Flex } from "theme-ui";
import { Link } from "react-router-dom";

const NavMenu = () => {
  return (
    <header>
      <Flex as='nav' sx={{ width: "100%" }}>
        <Link to='/' sx={{ color: "primary" }}>
          Home
        </Link>
        <Link to='/routes' sx={{ color: "primary" }}>
          Routes
        </Link>
        <Link to='/summary'>Summary</Link>
      </Flex>
    </header>
  );
};

export default NavMenu;
