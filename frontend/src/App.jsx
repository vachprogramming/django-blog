
import { Outlet } from 'react-router-dom';
import styles from './App.module.css';

// 1. Import our new Navbar component
import Navbar from './components/Navbar'; 

function App() {
  return (
    <div className={styles.appContainer}>

      {/* 2. Replace the placeholder div with our component */}
      <Navbar /> 

      <main className={styles.mainContent}>
        <Outlet />
      </main>

      {/* We'll leave the footer placeholder for now */}
      <div className={styles.footerPlaceholder}>
        © 2025 StudyConnect
      </div>
    </div>
  );
}

export default App;