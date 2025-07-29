import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import DashbordLayout from "../Layouts/DashbordLayout";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import PriveteRoute from "./PriveteRoute";
import AllUsers from "../Pages/Dashboard/AdminDashboard/Admin dashboardComponents/AllUsers";
import AdminRoute from "./AdminRoute";
import AllBloodRequest from "../Pages/Dashboard/AdminDashboard/Admin dashboardComponents/AllBloodRequest";
import ContentManagement from "../Pages/Dashboard/AdminDashboard/Admin dashboardComponents/ContentManagement";
import Addblog from "../Pages/Dashboard/AdminDashboard/Admin dashboardComponents/Addblog";
import CreateDonationRequest from "../Pages/Dashboard/DonerDashboard/CreateDonationRequest";
import MyDonationRequest from "../Pages/Dashboard/DonerDashboard/DonorDashboardComponents/MyDonationRequest";
import SearchPage from "../Pages/SearchPage/SearchPage";
import DonationRequests from "../Pages/DonationRequests/DonationRequests";
import Blog from "../Pages/Blog/Blog";
import Funding from "../Pages/Funding/Funding";
import DonationRequestsDetails from "../Pages/DonationRequests/DonationRequestsDetails";
import VolunteerRoute from "./VolunteerRoute";
import VolunteerAllBloodRequests from "../Pages/Dashboard/VlolunteerDashboard/VolunteerPages/VolunteerAllBloodRequests";
import UpdateRequests from "../Pages/UpdateRequests/UpdateRequests";
import EditBlog from "../Pages/Dashboard/AdminDashboard/Admin dashboardComponents/EditBlog";
import BlogDetails from "../Pages/Blog/BlogDetails";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children:[
        {
            index:true,
            element:<Home></Home>
        },
        {
            path:"login",
            element: <Login></Login>
        },
        {
            path:"signUp",
            element: <SignUp></SignUp>
        },
        {
            path:"blogs",
            element: <Blog></Blog>
        },
        {
            path:"blogs-details/:id",
            element: <BlogDetails></BlogDetails>
        },
        {
            path:"funding",
            element: <PriveteRoute><Funding></Funding></PriveteRoute>
        },
        {
            path:"searchDonors",
            element:<SearchPage></SearchPage>
        },
        {
            path:"all-donation-requests",
            element:<DonationRequests></DonationRequests>
        },
        {
            path:"donation-requests-details/:id",
            element:<PriveteRoute><DonationRequestsDetails></DonationRequestsDetails></PriveteRoute>
        }
        
        
    ]
  },
  {
            path:"/dashboard",
            element:<PriveteRoute><DashbordLayout></DashbordLayout></PriveteRoute>,
            children:[
                {
                    index:true,
                    element: <DashboardHome></DashboardHome>
                },
                {
                    path:"all-users",
                    element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
                },
                
                {
                    path:"all-blood-donation-request",
                    element:<AdminRoute><AllBloodRequest></AllBloodRequest></AdminRoute>
                },
                
                {
                    path:"content-management",
                    element:<AdminRoute><ContentManagement></ContentManagement></AdminRoute>
                },
                {
                    path:"add-blog",
                    element:<AdminRoute><Addblog></Addblog></AdminRoute>
                },
                {
                    path:"edit-blog/:id",
                    element:<AdminRoute><EditBlog></EditBlog></AdminRoute>
                },
                {
                    path:"create-donation-request",
                    element:<PriveteRoute><CreateDonationRequest></CreateDonationRequest></PriveteRoute>
                },
                {
                    path:"my-donation-requests",
                    element:<PriveteRoute><MyDonationRequest></MyDonationRequest></PriveteRoute>
                },
                {
                    path:"update-requests/:id",
                    element:<PriveteRoute><UpdateRequests></UpdateRequests></PriveteRoute>
                },
                {
                    path:"volunteer-all-blood-donation-request",
                    element:<VolunteerRoute><VolunteerAllBloodRequests></VolunteerAllBloodRequests></VolunteerRoute>
                },
            ]
        }
  


]);
