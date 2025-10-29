
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Import our shared styles
import pageStyles from './Page.module.css';
import formStyles from './Form.module.css'; // We'll create this

function RegisterPage() {
  // 1. We create state variables for each form field
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  // A state for holding error messages from the API
  const [error, setError] = useState(null);

  // This is a hook from React Router that lets us redirect the user
  const navigate = useNavigate();

  // 3. This function runs when the form is submitted
  const handleSubmit = async (e) => {
    // Prevent the default browser form submission
    e.preventDefault();

    // Clear any previous errors
    setError(null);

    // Check if passwords match
    if (password !== password2) {
      setError("Passwords do not match.");
      return; // Stop the function
    }

    // 4. We try to send the data to our backend
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/register/',
// ...
        {
          username: username,
          email: email,
          password: password,
          password2: password2,
        }
      );

      // 5. If registration is successful:
      console.log(response.data);
      // Redirect the user to the login page
      navigate('/login'); 

    // ...
    // ...
} catch (err) {
  // 6. If the API sends back an error
  console.error('Registration error:', err.response.data);

  if (err.response && err.response.data && err.response.data.error) {
    // Our new API sends a simple error message
    setError(err.response.data.error);
  } else {
    // This handles network errors, etc.
    setError('An unexpected error occurred. Please try again.');
  }
}
// ...
    // ...
  };

  return (
    <div className={pageStyles.container}>
      <form className={formStyles.form} onSubmit={handleSubmit}>
        <h1 className={pageStyles.title}>Create an Account</h1>

        {/* Show an error message if 'error' state is not null */}
        {error && <p className={formStyles.error}>{error}</p>}

        <div className={formStyles.formGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            // 2. This 'onChange' updates the state on every keystroke
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

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

        <div className={formStyles.formGroup}>
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            id="password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        </div>

        <button type="submit" className={formStyles.submitButton}>
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;