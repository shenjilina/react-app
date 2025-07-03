import { createBrowserRouter } from "react-router";
import Layout from "../layout/index.tsx";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/contact",
        Component: Contact,
      },
    ],
  },
]);
export default router;
