import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await axios.get('http://localhost:3000/api/users');
      setUsers(fetchedUsers.data.users);
      console.log(users, 'from usestate hook');
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCompanys = async () => {
    try {
      const fetchedCompanys = await axios.get(
        'http://localhost:3000/api/companies'
      );
      //console.log('companies from app file', fetchedCompanys.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUsers();
    fetchCompanys();
  }, []);

  console.log(users, 'outside usestate hook');

  return (
    <>
      <div>
        {users.map((user) => {
          return (
            <div key={user.user_id}>
              <h1>{`${user.first_name + user.last_name}`}</h1>
              <h3>{user.username}</h3>
            </div>
          );
        })}
      </div>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
