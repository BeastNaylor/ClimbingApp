import React from "react";
import { Link } from "react-router-dom";

const NavMenu = () => {
  return (
    <header>
      <div>
        <Link to='/'>
          Home
        </Link>
        <Link to='/routes'>
          Routes
        </Link>
        <Link to='/summary'>Summary</Link>
      </div>
    </header>
  );
};

export default NavMenu;