import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUsers } from '../store/userSlice';
import { RootState } from '../store';
import { useParams } from 'react-router-dom';

const Navbar = () => {
  // const dispatch = useDispatch();
  // const usersList = useSelector((state: RootState) => state.users.users);
  // const [isLoaded, setIsLoaded] = useState(false);
  // const [guestId, setGuestId] = useState('');
  // const [userParam, setUserParam] = useState('');

  // const { id } = useParams();
  // console.log('param id', id);

  // const fetchGuestId = async () => {
  //   try {
  //     const fetchedGuestId = await axios.get(
  //       `http://localhost:3000/api/users/guest`
  //     );
  //     setGuestId(fetchedGuestId.data.users[0].user_id);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const getParam = () => {
  //   const token = window.localStorage.getItem('token');
  //   if (!token) {
  //     setUserParam(guestId);
  //   } else {
  //     setUserParam(id);
  //   }
  // };

  // const loginWithToken = async () => {
  //   const token = window.localStorage.getItem('token');
  //   if (!token) {
  //     const response = await axios.get('/api/user/guest_id', {
  //       headers: {
  //         authorization: token,
  //       },
  //     });
  //     dispatch(setUser(response.data));
  //   }
  // };

  // const attemptLogin = async (event) => {
  //   event.preventDefault();
  //   const response = await axios.post('/api/auth', credentials);
  //   const token = response.data;
  //   window.localStorage.setItem('token', token);
  //   loginWithToken(token);
  //   navigate('/');
  // };

  // const fetchUserInfo = async () => {
  //   try {
  //     const fetchedUserInfo = await axios.get(
  //       `http://localhost:3000/api/users/${userParam}`
  //     );
  //     dispatch(setUsers(fetchedUserInfo.data.users));
  //     setIsLoaded(true);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   fetchGuestId();
  // }, []);

  // useEffect(() => {
  //   getParam();
  // }, [guestId]);

  // useEffect(() => {
  //   fetchUserInfo();
  // }, [userParam]);

  // console.log('user info ', usersList);

  return <div>applications, companies applied to, contacts</div>;
};

export default Navbar;
