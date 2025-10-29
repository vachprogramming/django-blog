
import { useState, useEffect } from 'react';
import axios from 'axios';

// 1. Import our new component
import StudyGroupCard from '../components/StudyGroupCard';

// 2. We can use styles from two files!
import pageStyles from './Page.module.css';
import homeStyles from './HomePage.module.css'; // We will create this

function HomePage() {
  const [studyGroups, setStudyGroups] = useState([]);

  useEffect(() => {
    async function fetchGroups() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/groups/');
        setStudyGroups(response.data);
      } catch (error) {
        console.error('Error fetching study groups:', error);
      }
    }
    fetchGroups();
  }, []); 

  return (
    // 3. We use our imported page styles
    <div className={pageStyles.container}>
      <h1 className={pageStyles.title}>Available Study Groups</h1>

      {/* 4. This is our new responsive grid container */}
      <div className={homeStyles.gridContainer}>

        {/* 5. We map over the groups */}
        {studyGroups.map((group) => (
          // 6. For each group, we render a Card
          //    and pass the group object as a prop
          <StudyGroupCard key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;