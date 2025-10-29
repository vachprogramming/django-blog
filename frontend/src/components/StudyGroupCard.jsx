
import styles from './StudyGroupCard.module.css';

// 1. We receive 'props' as an argument.
//    We "destructure" it to get the 'group' object directly.
function StudyGroupCard({ group }) {

  // 2. A helper to format the date nicely
  const formattedDate = new Date(group.meeting_time).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    // 3. We use the 'group' prop to fill in the data
    <div className={styles.card}>
      <h3 className={styles.title}>{group.title}</h3>

      <div className={styles.details}>
        <span className={styles.code}>{group.course_code}</span>
        <span className={styles.university}>{group.university}</span>
      </div>

      <p className={styles.description}>{group.description}</p>

      <div className={styles.info}>
        <span>📍 {group.location}</span>
        <span>🕒 {formattedDate}</span>
      </div>

      <div className={styles.footer}>
        <span className={styles.creator}>
          Created by: {group.creator.username}
        </span>
        <span className={styles.members}>
          {group.members_count} Members
        </span>
      </div>

      <button className={styles.joinButton}>
        View Details
      </button>
    </div>
  );
}

export default StudyGroupCard;