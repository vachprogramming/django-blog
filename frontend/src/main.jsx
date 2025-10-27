
import React from 'react';
import ReactDOM from 'react-dom/client';
// Import the router functions
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Import our global styles
import './index.css';

// Import our page components
import App from './App.jsx'; // This will be our main layout
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';

// 1. We define our routes (our "sitemap")
const router = createBrowserRouter([
  {
    path: '/',        // The "root" path
    element: <App />, // The main component to load
    children: [
      // These are "child" routes. They will be displayed
      // *inside* the <App> component's <Outlet>
      {
        path: '/', // The default page (at '/')
        element: <HomePage />,
      },
      {
        path: '/login', // The /login page
        element: <LoginPage />,
      },
      {
        path: '/register', // The /register page
        element: <RegisterPage />,
      },
    ],
  },
]);

// 2. We tell React to render our app with this router
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);