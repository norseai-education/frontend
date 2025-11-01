import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Loading from './pages/Loading';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import Account from './pages/Account';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Logout from './pages/Logout';
import Assessment from './pages/Assessment';
import Access from './pages/Access';
import NotFound from './pages/NotFound';
import UserDetails from './pages/UserDetails';
import PlaceholderPage from './pages/PlaceholderPage';
import Courses from './pages/Courses';
import Analysis from './pages/Analysis';
import Materials from './pages/Materials';
import EndLesson from './pages/EndLesson';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/loading",
    element: <Loading />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/account",
    element: <Account />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/assessment",
    element: <Assessment />,
  },
  {
    path: "/access",
    element: <Access />,
  },
  {
    path: "/user/:id",
    element: <UserDetails />,
  },
  {
    path: "/apps",
    element: <PlaceholderPage title="Apps" />,
  },
  {
    path: "/materials",
    element: <Materials />,
  },
  {
    path: "/courses",
    element: <Courses />,
  },
  {
    path: "/analysis",
    element: <Analysis />,
  },
  {
    path: "/endlesson",
    element: <EndLesson />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;