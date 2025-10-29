
import { createContext, useState } from 'react';

// 1. Create the context itself
const AuthContext = createContext();

// 2. Create the "Provider" component
// This is the component that will "provide" the auth data
// to all its children (our entire app)
export const AuthProvider = ({ children }) => {

  // 3. We'll store the auth token in state
  // For now, it starts as 'null' (logged out)
  const [authToken, setAuthToken] = useState(null);

  // 4. We'll create a 'login' function
  const login = (token) => {
    setAuthToken(token);
    // We'll also save it to localStorage soon
  };

  // 5. We'll create a 'logout' function
  const logout = () => {
    setAuthToken(null);
    // We'll also remove it from localStorage soon
  };

  // 6. This is the data we'll share with our app
  const contextData = {
    authToken: authToken,
    login: login,
    logout: logout,
  };

  // 7. We return the "Provider" with the data
  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};

// 8. Export the context so other components can use it
export default AuthContext;