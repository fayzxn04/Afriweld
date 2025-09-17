import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Users from "./pages/Users";
import App from "./App";
import Banner from "./pages/Banner";
import Address from "./pages/Address";
import Categories from "./pages/Categories";
import Product from "./pages/Product";
import Coupon from "./pages/Coupon";
import Orders from "./pages/Orders";
import Support from "./pages/Support";
import Settings from "./pages/Settings";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import User from "./components/User";
import Login from "./pages/Login";
import ResetPassword from "./pages/Resetpassword";
import PortalUser from "./pages/PortalUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // {
      //   path: "/user",
      //   element: <User />,
      //   children: [
      //     { path: "login", element: <Login /> },
      //     { path: "resetPassword", element: <ResetPassword /> },
      //   ],
      // },
      {
        path: "/PortalUsers",
        element: <PortalUser />,
        children: [
          {
            path: "addPortalUser",
            element: <PortalUser />,
          },
          {
            path: "editPortalUser",
            element: <PortalUser />,
          },
        ],
      },
      // {
      //   path: "/users",
      //   element: <Users />,
      //   children: [
      //     { path: "addUser", element: <Users /> },
      //     { path: "editUser", element: <Users /> },
      //   ],
      // },

      {
        path: "/address",
        element: <Address />,
        children: [
          { path: "addAddress", element: <Address /> },
          { path: "editAddress", element: <Address /> },
        ],
      },

      {
        path: "/categories",
        element: <Categories />,
        children: [
          { path: "addCategory", element: <Categories /> },
          { path: "editCategory", element: <Categories /> },
        ],
      },

      {
        path: "/banners",
        element: <Banner />,
        children: [
          { path: "addBanner", element: <Banner /> },
          { path: "editBanner", element: <Banner /> },
        ],
      },

      {
        path: "/products",
        element: <Product />,
        children: [
          { path: "addProduct", element: <Product /> },
          { path: "editProduct", element: <Product /> },
        ],
      },

      {
        path: "/coupons",
        element: <Coupon />,
        children: [
          { path: "addCoupon", element: <Coupon /> },
          { path: "editCoupon", element: <Coupon /> },
        ],
      },

      {
        path: "/orders",
        element: <Orders />,
        children: [
          { path: "addOrder", element: <Orders /> },
          { path: "editOrder", element: <Orders /> },
        ],
      },

      {
        path: "/support",
        element: <Support />,
      },

      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <MantineProvider
        theme={{
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <RouterProvider router={router} />
      </MantineProvider>
    </Provider>
  </StrictMode>
);
