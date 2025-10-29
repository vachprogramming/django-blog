
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Import our shared styles
import pageStyles from './Page.module.css';
import formStyles from './Form.module.css';

function LoginPage() {
  // 1. Create state for the email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State for holding error messages
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // 2. This function runs when the form is submitted
  // studyconnect/frontend/src/pages/LoginPage.jsx

const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);

  try {
    // 3. We send a POST request to OUR NEW login endpoint
    const response = await axios.post(
      'http://127.0.0.1:8000/api/login/', 
      {
        email: email, // Our backend view handles this
        password: password,
      }
    );

    // 4. If successful, our API sends back a "token"
    console.log(response.data); // Should show { token: "..." }

    // --- THIS IS THE NEXT BIG STEP ---
    // We need to save this token!

    navigate('/'); 

  } catch (err) {
    // 5. If the API sends an error
    console.error('Login error:', err.response.data);

    if (err.response && err.response.data && err.response.data.error) {
      // Our new API sends a simple error message
      setError(err.response.data.error);
    } else {
      setError('An unexpected error occurred. Please try again.');
    }
  }
};

  return (
    <div className={pageStyles.container}>
      {/* 6. We reuse our existing form styles! Clean code. */}
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