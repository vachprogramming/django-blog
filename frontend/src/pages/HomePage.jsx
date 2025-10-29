// 1. Import the hooks we need from React
import { useState, useEffect } from 'react';
// 2. Import axios
import axios from 'axios';

import styles from './Page.module.css';

function HomePage() {
  // 3. Create a state variable to hold our list of groups
  // It starts as an empty array []
  const [studyGroups, setStudyGroups] = useState([]);

  // 4. This useEffect hook runs once when the component loads
  useEffect(() => {
    // 5. We define an async function inside to fetch data
    async function fetchGroups() {
      try {
        // 6. We try to get data from our Django API
        // This is the full URL to our backend endpoint
        const response = await axios.get('http://127.0.0.1:8000/api/groups/');
        // 7. If successful, we update our state
        setStudyGroups(response.data);
      } catch (error) {
        // 8. If there's an error, we log it
        console.error('Error fetching study groups:', error);
      }
    }

    // 9. We call the function
    fetchGroups();
  }, []); // The empty array [] means "only run this effect once"

  // 10. We render our component
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Available Study Groups</h1>
      
      {/* We'll add styles for this list later */}
      <div>
        {/* We map over the studyGroups array */}
        {studyGroups.map((group) => (
          // We must provide a unique 'key' for each item in a list
          <div key={group.id}>
            <h3>{group.title}</h3>
            <p>{group.course_code}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;