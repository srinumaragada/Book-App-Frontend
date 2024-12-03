import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import Home from "../pages/home/home"
import Login from "../components/auth/login"
import Register from "../components/auth/register"
import Cart from "../pages/cart/cart"
import Checkout from "../pages/checkout/checkout"
import SinglePage from "../pages/home/singlePage"
import PrivateRoute from "./privateRoute"
import Orders from "../pages/orders/order"
import AdminRoute from "./AdminRoute"
import AdminPage from "../components/Admins/AdminPage"
import DashboardLayout from "../pages/dashboard/dashboardLayout"
import UserDashBoard from "../pages/dashboard/user-dashboard"
import Dashboard from "../pages/dashboard/dashboard"

import UpdateBook from "../pages/dashboard/updateBook"
import ManageBooks from "../pages/dashboard/manageBooks"
import AddBook from "../pages/dashboard/addbook/AddBook"

const routes=createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[{
            path:"/",
            element:<Home/>
        },{
            path:"/login",
            element:<Login/>
        },
        {
            path:"/register",
            element:<Register/>
        },{
            path:"/basket",
            element:<Cart/>
        },
        {
            path:"/checkout",
            element:<PrivateRoute><Checkout/></PrivateRoute>
        },
        {
            path:"/singleBook/:id",
            element:<SinglePage/>
        },{
            path:"/orders",
            element:<PrivateRoute><Orders/></PrivateRoute>
        },{
            path:"/user-dashboard",
            element:<UserDashBoard/>
        }
    ]
    },

    {
        path: "/admin",
        element: <AdminPage/>
      },
      {
        path: "/dashboard",
        element: <AdminRoute>
          <DashboardLayout/>
        </AdminRoute>,
        children:[
          {
            path: "",
            element: <AdminRoute><Dashboard/></AdminRoute>
          },
          {
            path: "add-new-book",
            element: <AdminRoute>
              <AddBook/>
            </AdminRoute>
          },
          {
            path: "edit-book/:id",
            element: <AdminRoute>
              <UpdateBook/>
            </AdminRoute>
          },
          {
            path: "manage-books",
            element: <AdminRoute>
              <ManageBooks/>
            </AdminRoute>
          }
        ]
      }
])
export default routes
