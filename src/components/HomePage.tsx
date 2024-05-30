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
  const [userParam, setUserParam] = useState('');
  const [guestName, setGuestName] = useState('');
  const [id, setId] = useState('');

  // const getParam = () => {
  //   const token = window.localStorage.getItem('token');
  //   if (!token) {
  //     setUserParam(guestId);
  //   } else {
  //     setUserParam(id);
  //   }
  // };

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

  // useEffect(() => {
  //   getParam();
  // }, [guestId]);

  useEffect(() => {
    fetchUserInfo();
  }, [userParam]);

  ////////////////////////////////////
  // const [id, setId] = useState('');

  // const fetchId = async () => {
  //   try {
  //     const fetchedUserId = await axios.get(
  //       `http://localhost:3000/api/users/${user_id}`
  //     );
  //     setId(fetchedUserId.data.users[0].user_id);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   fetchId();
  // }, []);

  return (
    <div>
      <div>{user_id ? <p>welcome {usersList[0].first_name}</p> : ''}</div>
    </div>
  );
};

export default HomePage;
