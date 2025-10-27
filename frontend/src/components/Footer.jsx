
import styles from './Footer.module.css';

function Footer() {
  // Get the current year automatically
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        © {currentYear} StudyConnect. All rights reserved.
      </p>
      <p className={styles.text}>
        Built as a portfolio project.
      </p>
    </footer>
  );
}

export default Footer;