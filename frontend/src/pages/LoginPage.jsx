import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';

// Import our shared styles
import pageStyles from './Page.module.css';
import formStyles from './Form.module.css';
import loginStyles from './LoginPage.module.css'; // We created this

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); 

  // This is our email/password login handler
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
      
      const token = response.data.token;
      login(token);
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

  // This is our Google login handler
  const handleGoogleSuccess = async (credentialResponse) => {
    setError(null);
    const googleToken = credentialResponse.credential;

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/google-login/',
        { token: googleToken }
      );
      
      const appToken = response.data.token;
      login(appToken);
      navigate('/');
      
    } catch (err) {
      console.error('Google login error:', err);
      setError('Google login failed. Please try again.');
    }
  };

  const handleGoogleError = () => {
    console.error('Google login failed');
    setError('Google login failed. Please try again.');
  };

  return (
    <div className={pageStyles.container}>
      <form className={formStyles.form} onSubmit={handleSubmit}>
        <h1 className={pageStyles.title}>Login to Your Account</h1>
        
        {error && <p className={formStyles.error}>{error}</p>}
        
        {/* --- HERE ARE THE MISSING FIELDS --- */}
        
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
        
        {/* --- END OF MISSING FIELDS --- */}

        <button type="submit" className={formStyles.submitButton}>
          Login
        </button>
        
        <div className={loginStyles.divider}>
          <span>OR</span>
        </div>
        
        <div className={loginStyles.googleButtonContainer}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap
          />
        </div>
        
      </form>
    </div>
  );
}

export default LoginPage;