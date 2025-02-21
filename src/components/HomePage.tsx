import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import useAuth from '../custom-hooks/useAuth';

const HomePage = () => {
  const { user_id } = useParams();
  const { auth, setAuth } = useAuth();

  const usersList = useSelector((state: RootState) => state.users.users);

  return (
    <div>
      {/* <div>{auth?.id ? <p>welcome {usersList[0].first_name}</p> : 'welcome'}</div> */}
      <img src="public/images/computer.webp" />
    </div>
  );
};

export default HomePage;
