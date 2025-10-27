
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">StudyConnect</Link>
      </div>
      <div className={styles.navLinks}>
        <Link to="/" className={styles.navLink}>
          Home
        </Link>

        {/* ADD THIS NEW LINK */}
        <Link to="/mobile" className={styles.navLink}>
          Mobile App
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

export default Navbar;