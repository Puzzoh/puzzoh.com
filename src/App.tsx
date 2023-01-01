import React, { useContext, ReactNode } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContext } from "context/authContext";
import MainLandingPage from "pages/MainLandingPage";
import BusinessLandingPage from "pages/BusinessLandingPage";
import LogIn from "pages/LogIn";
import SignUp from "pages/SignUp";
import SideNavbar from "components/business-portal/SideNavbar";
import MyDashboard from "pages/MyDashboard";
import MyVouchers from "pages/MyVouchers";
import MyCustomers from "pages/MyCustomers";
import Files from "pages/Files";
import Settings from "pages/Settings";
import Support from "pages/Support";
import NotFound from "pages/404";

function App() {
  const { currentVendor } = useContext(AuthContext);

  const ProtectedRoute = ({ children }: { children: ReactNode | any }) => {
    if (!currentVendor || currentVendor === undefined) {
      return <Navigate to="/business/app/login" />;
    }

    return children;
  };

  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <SideNavbar />
        <Outlet />
      </QueryClientProvider>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLandingPage />,
    },
    {
      path: "/business",
      element: <BusinessLandingPage />,
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/business/app",
          element: <MyDashboard />,
        },
        {
          path: "/business/app/vouchers",
          element: <MyVouchers />,
        },
        {
          path: "/business/app/customers",
          element: <MyCustomers />,
        },
        {
          path: "/business/app/files",
          element: <Files />,
        },
        {
          path: "/business/app/settings",
          element: <Settings />,
        },
        {
          path: "/business/app/support",
          element: <Support />,
        },
      ],
    },
    {
      path: "/business/app/login",
      element: <LogIn />,
    },
    {
      path: "/business/app/register",
      element: <SignUp />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
