
// 1. Import 'useContext'
import { useState, useContext } from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// 2. Import our AuthContext
import AuthContext from '../context/AuthContext'; 

import pageStyles from './Page.module.css';
import formStyles from './Form.module.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  
  // 3. Get the 'login' function from our global context
  const { login } = useContext(AuthContext); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/login/', 
        {
          email: email,
          password: password,
        }
      );
      
      // 4. If successful, our API sends back a "token"
      //    e.g., response.data = { token: "..." }
      const token = response.data.token;
      
      // 5. THIS IS THE MAGIC:
      //    We call our global 'login' function with the token
      login(token);
      
      // 6. Now we can redirect to the home page
      navigate('/'); 
      
    } catch (err) {
      console.error('Login error:', err.response.data);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  // ... (the rest of the file, the 'return' with the form, is identical) ...
  return (
    <div className={pageStyles.container}>
      <form className={formStyles.form} onSubmit={handleSubmit}>
        <h1 className={pageStyles.title}>Login to Your Account</h1>
        
        {error && <p className={formStyles.error}>{error}</p>}
        
        <div className={formStyles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className={formStyles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className={formStyles.submitButton}>
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;