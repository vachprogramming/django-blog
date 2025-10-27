
// Import the Outlet component from React Router
import { Outlet } from 'react-router-dom';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.appContainer}>
      {/* We'll put our real Navbar here soon */}
      <div className={styles.navbarPlaceholder}>
        My Navigation Bar
      </div>

      {/* This is the main content area */}
      <main className={styles.mainContent}>
        {/* The <Outlet> is where our pages (HomePage, etc.)
            will be injected by React Router. */}
        <Outlet />
      </main>

      {/* We'll put a real Footer here later */}
      <div className={styles.footerPlaceholder}>
        © 2025 StudyConnect
      </div>
    </div>
  );
}

export default App;