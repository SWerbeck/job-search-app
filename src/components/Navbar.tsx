import { useEffect, useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../store/userSlice';
import { RootState } from '../store';
import useAxiosPrivate from '../custom-hooks/useAxiosPrivate';
import axios from '../../server/api/axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../custom-hooks/useAuth';
import { setUserApps } from '../store/userAppsSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const usersList = useSelector((state: RootState) => state.users.users);
  const userApplications = useSelector(
    (state: RootState) => state.userApps.userApps
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [useId, setUseId] = useState('');
  const [signUp, setSignup] = useState(false);
  const navigate = useNavigate();

  const { auth, setAuth } = useAuth();
  const location = useLocation();

  // const fetchUserInfo = async () => {
  //   if (auth?.id?.length) {
  //     try {
  //       const fetchedUserInfo = await axiosPrivate.get(
  //         `http://localhost:3000/api/users/${auth.id}`
  //       );
  //       dispatch(setUsers(fetchedUserInfo.data.users));
  //       setIsLoaded(true);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   } else {
  //     try {
  //       const fetchedGuestInfo = await axiosPrivate.get(
  //         `http://localhost:3000/api/guest`
  //       );
  //       //console.log('------------->', fetchedGuestInfo.data.users);
  //       dispatch(setUsers(fetchedGuestInfo.data.users));
  //       setIsLoaded(true);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };
  console.log('USER APP FROM NAV', userApplications);

  const fetchUserInfo = async () => {
    try {
      if (auth?.id?.length) {
        const fetchedUserInfo = await axiosPrivate.get(
          `http://localhost:3000/api/users/${auth.id}`
        );
        dispatch(setUsers(fetchedUserInfo.data.users));
      } else {
        const fetchedGuestInfo = await axiosPrivate.get(
          `http://localhost:3000/api/guest`
        );
        dispatch(setUsers(fetchedGuestInfo.data.users));
      }
      setIsLoaded(true);
    } catch (err) {
      console.error('Error fetching user info:', err);
    }
  };

  const fetchApplications = async () => {
    if (auth?.id) {
      try {
        const fetchedApps = await axiosPrivate.get(
          `/api/applications/user/${auth.id}`
        );
        //console.log('fetched apps from application', fetchedApps);
        dispatch(setUserApps(fetchedApps?.data?.userapplications));
        setIsLoaded(true);
      } catch (err) {
        console.log(err.response.data);
        navigate('/', { state: { from: location }, replace: true });
      }
    } else {
      try {
        const guestApps = await axios.get('/api/guest/applications');
        dispatch(setUserApps(guestApps?.data?.userapplications));
        setIsLoaded(true);
      } catch (error) {
        console.log(error);
      }
    }
  };
  console.log(usersList, 'userslist from nav');
  useEffect(() => {
    fetchUserInfo();
    fetchApplications();
  }, [auth.id]);

  return (
    <div className="bg-navbar flex-auto align-middle w-full h-20 mb-5">
      <div className="flex justify-center items-center space-x-5 px-4">
        {auth.id ? (
          <>
            <Link to={`/home/${auth.id}/applications`} className="text-white">
              applications
            </Link>
            <Link to={`home/${auth.id}/contacts`} className="text-white">
              contacts
            </Link>
            <Link to={`home/${auth.id}/companies`} className="text-white">
              companies
            </Link>

            <Link to="/lounge" className="text-white">
              lounge
            </Link>

            <Link to="/testroute" className="text-white">
              Test Route
            </Link>
          </>
        ) : (
          <>
            <Link
              to={`/home/${usersList[0].user_id}/applications`}
              className="text-white"
            >
              applications
            </Link>
            <Link
              to={`home/${usersList[0].user_id}/contacts`}
              className="text-white"
            >
              contacts
            </Link>
            <Link
              to={`home/${usersList[0].user_id}/companies`}
              className="text-white"
            >
              companies
            </Link>

            <Link to="/lounge" className="text-white">
              lounge
            </Link>

            <Link to="/testroute" className="text-white">
              Test Route
            </Link>
          </>
        )}

        {/* <h2>companies applied to, contacts</h2> */}
        {/* <div>{useId}</div>
      <Login grabUseId={grabUseId} /> */}
        {location.pathname === '/signup' ? <></> : <Login />}
      </div>
    </div>
  );
};

export default Navbar;
