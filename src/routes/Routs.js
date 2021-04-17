// auth pages
import Login from "../pages/Login";

// admin pages
import Dashboard from "../pages/Dashboard";
import Services from "../pages/Services";
import Garages from "../pages/Garages";
import Users from "../pages/Users";

// garage owner pages
import Bookings from "../pages/Bookings";

// fontawesome icons
import {
  faSignInAlt,
  faHome,
  faUsers,
  faFileContract,
  faCar,
  faWarehouse,
} from "@fortawesome/free-solid-svg-icons";

const authRoutes = [
  {
    path: "/login",
    component: Login,
    icon: faSignInAlt,
    layout: "/auth",
  },
];

const adminRoutes = [
  {
    path: "/dashboard",
    component: Dashboard,
    icon: faHome,
    layout: "/admin",
  },
  {
    path: "/services",
    component: Services,
    icon: faCar,
    layout: "/admin",
  },
  {
    path: "/garages",
    component: Garages,
    icon: faWarehouse,
    layout: "/admin",
  },
  {
    path: "/users",
    component: Users,
    icon: faUsers,
    layout: "/admin",
  }
];

const garageOwnerRoutes = [
  {
    path: "/bookings",
    component: Bookings,
    icon: faFileContract,
    layout: "/garage-owner",
  }
]

export { adminRoutes, authRoutes, garageOwnerRoutes };
