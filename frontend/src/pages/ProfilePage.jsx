
import styles from './Page.module.css';

function ProfilePage() {
  // We'll add logic here later to fetch the user's
  // joined groups and created groups.

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Profile</h1>
      <p>This page is protected. You can only see it if you are logged in.</p>
    </div>
  );
}

export default ProfilePage;