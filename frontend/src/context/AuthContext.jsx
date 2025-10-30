
import { createContext, useState, useEffect } from 'react';

// 1. Create the context
const AuthContext = createContext();

// 2. Create the "Provider" component
export const AuthProvider = ({ children }) => {
  
  // 3. We initialize our state by TRYING to get the token
  //    from localStorage. If it's there, the user is already
  //    logged in when they refresh the page.
  const [authToken, setAuthToken] = useState(() => 
    localStorage.getItem('authToken')
      ? localStorage.getItem('authToken')
      : null
  );

  // 4. Create a state for the user's data (like username)
  //    We'll add this feature later.
  const [user, setUser] = useState(null); 

  // 5. The login function is now more powerful
  const login = (token) => {
    // 5a. Update our React state
    setAuthToken(token);
    
    // 5b. Save the token to the browser's local storage
    localStorage.setItem('authToken', token);
    
    // We'll also fetch the user's data here soon
  };

  // 6. The logout function is also more powerful
  const logout = () => {
    // 6a. Clear our React state
    setAuthToken(null);
    setUser(null);
    
    // 6b. Remove the token from local storage
    localStorage.removeItem('authToken');
  };

  // 7. This is the data we'll share with our app
  const contextData = {
    authToken: authToken,
    user: user, // We'll use this soon
    login: login,
    logout: logout,
  };

  // 8. We return the "Provider" with the data
  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;