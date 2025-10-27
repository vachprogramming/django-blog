
import { Outlet } from 'react-router-dom';
import styles from './App.module.css';

// 1. Import our components
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // <-- ADD THIS IMPORT

function App() {
  return (
    <div className={styles.appContainer}>

      <Navbar /> 

      <main className={styles.mainContent}>
        <Outlet />
      </main>

      {/* 2. Replace the placeholder div with our component */}
      <Footer /> 

    </div>
  );
}

export default App;