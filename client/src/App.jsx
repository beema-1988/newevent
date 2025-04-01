import { createBrowserRouter, RouterProvider } from "react-router-dom"

import './App.css'
import Homepage from "./user/Homepage"
import Layout from "./components/Layout";
import About from "./user/About";
import Events from "./user/Events";
import Login from "./user/Login";
import Signup from "./user/Signup";
import EventDetails from "./user/eventdetails";
import Ticket from "./user/ticket";
// import TicketPricesByEvent from "./user/ticketprice";
import Tickets from "./user/ticketprice1";
import AdminDashboard from "./components/admindashboard";
import Userdahboard from "./components/userdahboard";
import CreateEvent from "./components/createevents";
import EventList from "./components/manageevents";
import EventUpdate from "./components/updateevent";
import CreateEventTicket from "./components/createticket";
import PaymentForm from "./components/payment";
import UsersList from "./components/userslist";

import Ticketlist from "./components/ticketlist";
import  UpdateTicket  from "./components/ticketupdate";




function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "about",
          element: <About />,
        },
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "events",
          element: <Events />,
        },
        //  {
        //    path: "event/:id", // Dynamic route for event details
        //     element: <EventDetails />, // Render EventDetails component
        //  },
        // {
        //   path: "event/:id", // Dynamic route for event details
        //   element: <EventDetails />, // Render EventDetails component
        // },
        {
          path: "/api/events/eventdetails/:eventId",
          element: <EventDetails />
        },
        // {
        //   path:"/api/tickets/event/:eventId",
        //   element: <TicketPricesByEvent />
        // },
        {
          path: "/api/tickets/event/:eventId",
          element: <Tickets />
        },



        {
          path: "login",
          element: <Login />,
        },
        {
          path: "/admin-dashboard",
          element: <AdminDashboard />
        },
        {
          path: "/createevents",
          element: <CreateEvent />
        },
        {
          path: "/eventlist",
          element: <EventList />
        },
        {
          path: "/api/events/update/:eventId",
          element: <EventUpdate />
        },
        {
          path: "/createticket",
          element: <CreateEventTicket />
        },
        {
          path: "/user-dashboard",
          element: < Userdahboard />
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "tickets",
          element: <Ticket />,
        },
        {
          path: "/payment",
          element: <PaymentForm />,
        },
        {
          path: "/userslist",
          element: < UsersList />,
        },
        
        {
          path: "/ticketlist",
          element: <Ticketlist />
        },
        {
          path: "/tickets/update/:ticketId",
          element: < UpdateTicket />
        }
      ]
    }
  ])


  return <RouterProvider router={router} />;
}

export default App
