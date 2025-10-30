import { Link, useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import { useContext } from 'react'; // 2. Import useContext
import AuthContext from '../context/AuthContext'; // 3. Import our context
import styles from './Navbar.module.css';

function Navbar() {
  // 4. Get the auth data and functions from our global context
  const { authToken, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // 5. This is our new logout handler
  const handleLogout = () => {
    logout(); // This clears the token from state and localStorage
    navigate('/login'); // Redirect the user to the login page
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">StudyConnect</Link>
      </div>
      <div className={styles.navLinks}>
        <Link to="/" className={styles.navLink}>
          Home
        </Link>
        <Link to="/mobile" className={styles.navLink}>
          Mobile App
        </Link>

        {/* 6. THIS IS THE DYNAMIC PART */}
        {/* We use a ternary operator ( a ? b : c ) */}
        {/* "Is authToken TRUE? (is the user logged in?)" */}
        
        {authToken ? (
          // --- If TRUE (User is logged in) ---
          <>
            <Link to="/profile" className={styles.navLink}>
              My Profile
            </Link>
            {/* This is a button, not a Link, because it performs an action */}
            <button onClick={handleLogout} className={styles.navLinkButton}>
              Logout
            </button>
          </>
        ) : (
          // --- If FALSE (User is a guest) ---
          <>
            <Link to="/login" className={styles.navLink}>
              Login
            </Link>
            <Link to="/register" className={styles.navLink}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;