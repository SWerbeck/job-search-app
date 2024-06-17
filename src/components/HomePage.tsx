import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import axios from '../../server/api/axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setUsers } from '../store/userSlice';
import Applications from './Applicationscomponent';
import AuthContext from '../context/AuthProvider';
import axios from 'axios';

const HomePage = () => {
  const { user_id } = useParams();

  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const usersList = useSelector((state: RootState) => state.users.users);
  const [isLoaded, setIsLoaded] = useState(false);

  // const getToken = () => {
  //   const token = window.localStorage.getItem('token');
  //   if (token) {
  //     console.log('got it in home page', token);
  //   } else {
  //     navigate('/');
  //     console.log('cant get token on home page');
  //   }
  // };
  const fetchUserInfo = async () => {
    try {
      const fetchedUserInfo = await axios.get(
        `http://localhost:3000/api/users/${user_id}`
      );
      console.log('from home fetch users', fetchedUserInfo.data.users);
      dispatch(setUsers(fetchedUserInfo.data.users));
      setIsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log('auth?', auth);
    //getToken();
    fetchUserInfo();
  }, []);

  return (
    <div>
      <div>{user_id ? <p>welcome {usersList[0].first_name}</p> : ''}</div>
      <Applications />
    </div>
  );
};

export default HomePage;
