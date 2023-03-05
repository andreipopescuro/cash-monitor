import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import UserProvider from "./Context/ContextProvider";
import Acces from "./Pages/Access";
import Home from "./Pages/Home";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    exact: true,
  },
  {
    path: "/auth",
    element: <Acces />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </ChakraProvider>
);
