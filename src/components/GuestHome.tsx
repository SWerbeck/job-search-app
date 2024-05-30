import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setUsers } from '../store/userSlice';

const GuestHome = () => {
  const dispatch = useDispatch();
  const usersList = useSelector((state: RootState) => state.users.users);
  const [isLoaded, setIsLoaded] = useState(false);
  const [guestId, setGuestId] = useState('');
  const [guestName, setGuestName] = useState('');

  const fetchGuestId = async () => {
    try {
      const fetchedGuestId = await axios.get(
        `http://localhost:3000/api/users/guest`
      );
      setGuestId(fetchedGuestId.data.users[0].user_id);
      setGuestName(fetchedGuestId.data.users[0].username);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserInfo = async () => {
    try {
      if (guestId) {
        const fetchedUserInfo = await axios.get(
          `http://localhost:3000/api/users/${guestId}`
        );
        dispatch(setUsers(fetchedUserInfo.data.users));
        setIsLoaded(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const getParam = () => {
  //   const token = window.localStorage.getItem('token');
  //   if (!token) {
  //     setUserParam(guestId);
  //   } else {
  //     setUserParam(id);
  //   }
  // };

  useEffect(() => {
    fetchGuestId();
  }, []);

  useEffect(() => {
    fetchUserInfo();
  }, [guestId]);

  return (
    <div>
      <div>
        <h1>welcome {usersList[0].username}</h1>
      </div>
    </div>
  );
};

export default GuestHome;
