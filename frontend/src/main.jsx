
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import './index.css';

// Component Imports
import App from './App.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx'; // <-- 1. IMPORT

// Page Imports
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import MobilePage from './pages/MobilePage.jsx';
import ProfilePage from './pages/ProfilePage.jsx'; // <-- 2. IMPORT

// 3. We will update the 'children' array
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // --- Public Routes ---
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/mobile',
        element: <MobilePage />,
      },
      
      // --- Protected Routes ---
      // Any route nested inside here will be protected
      // by the 'ProtectedRoute' component
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/profile',
            element: <ProfilePage />,
          },
          // We'll add more protected routes here later,
          // like '/create-group'
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);