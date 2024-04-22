import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setUsers } from '../store/userSlice';
import { RootState } from '../store';

const Users = () => {
  const dispatch = useDispatch();
  const usersList = useSelector((state: RootState) => state.users.users);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await axios.get('http://localhost:3000/api/users');
      dispatch(setUsers(fetchedUsers.data.users));
      setIsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  });

  if (!isLoaded) {
    return <div>loading</div>;
  }
  return (
    <div>
      <div>
        {usersList.map((user) => {
          return (
            <div key={user.user_id}>
              <h1>{`${user.first_name + user.last_name}`}</h1>
              <h3>{user.username}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Users;
