import React from "react";
import { RouterProvider } from "react-router";
import router from "./router/index.ts";
import "./App.css";

const App: React.FC = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
