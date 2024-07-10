import { useSelector } from 'react-redux';
import { useState } from 'react';
import { RootState } from '../store';

const Users = () => {
  // Can use this route for more testing auth
  const usersList = useSelector((state: RootState) => state.users.users);
  const [isLoaded, setIsLoaded] = useState(false);

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
