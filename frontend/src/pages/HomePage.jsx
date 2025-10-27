
import styles from './Page.module.css';

function HomePage() {
  // 'return ()' holds the component's HTML (called JSX)
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Home Page</h1>
      <p>Welcome to StudyConnect!</p>
    </div>
  );
}

// We must 'export default' so other files can import it
export default HomePage;