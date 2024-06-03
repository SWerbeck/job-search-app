import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setUsers } from '../store/userSlice';

const HomePage = () => {
  const { user_id } = useParams();

  const dispatch = useDispatch();
  const usersList = useSelector((state: RootState) => state.users.users);
  const [isLoaded, setIsLoaded] = useState(false);

  const getParam = () => {
    const token = window.localStorage.getItem('token');
    if (token) {
      console.log('got it in home page', token);
    } else {
      console.log('cant get token on home page');
    }
  };
  const fetchUserInfo = async () => {
    try {
      const fetchedUserInfo = await axios.get(
        `http://localhost:3000/api/users/${user_id}`
      );
      dispatch(setUsers(fetchedUserInfo.data.users));
      setIsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getParam();
  }, []);

  return (
    <div>
      <div>{user_id ? <p>welcome {usersList[0].first_name}</p> : ''}</div>
    </div>
  );
};

export default HomePage;
