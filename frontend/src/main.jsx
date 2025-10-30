
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import { GoogleOAuthProvider } from '@react-oauth/google';

import './index.css';

// Component Imports
import App from './App.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx'; 

// Page Imports
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import MobilePage from './pages/MobilePage.jsx';
import ProfilePage from './pages/ProfilePage.jsx'; 


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

const GOOGLE_CLIENT_ID = "890893853188-pvdqfjj055g8cnfrmgmiojr5nnn610uk.apps.googleusercontent.com"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 3. Wrap your app in the Google provider */}
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);