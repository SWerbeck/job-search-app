import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const HomePage = () => {
  const { user_id } = useParams();
  const usersList = useSelector((state: RootState) => state.users.users);

  return (
    <div>
      <div>{user_id ? <p>welcome {usersList[0].first_name}</p> : ''}</div>
    </div>
  );
};

export default HomePage;
