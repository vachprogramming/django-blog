
// 1. Import Link from react-router-dom
import { Link } from 'react-router-dom';

// 2. Import this component's private styles
import styles from './Navbar.module.css';

function Navbar() {
  // 3. Return the JSX (the HTML)
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        {/* 4. The logo links back to the Home page */}
        <Link to="/">StudyConnect</Link>
      </div>
      <div className={styles.navLinks}>
        {/* 5. Our three main navigation links */}
        <Link to="/" className={styles.navLink}>
          Home
        </Link>
        <Link to="/login" className={styles.navLink}>
          Login
        </Link>
        <Link to="/register" className={styles.navLink}>
          Register
        </Link>
      </div>
    </nav>
  );
}

// 6. Export the component so other files can use it
export default Navbar;