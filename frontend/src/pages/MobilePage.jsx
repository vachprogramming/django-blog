
// We can reuse the same simple styles from our other pages
import styles from './Page.module.css';

function MobilePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Get the StudyConnect App</h1>
      <p>
        The mobile app is coming soon!
      </p>
      <p>
        When it's ready, you'll be able to download it here for 
        Android or try it on any device with Expo Go.
      </p>
    </div>
  );
}

export default MobilePage;