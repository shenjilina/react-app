import React from "react";
import { Outlet } from "react-router";
import Navigation from "../components/Navigation";

const Layout: React.FC = () => {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
};

export default Layout;
