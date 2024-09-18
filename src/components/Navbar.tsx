import { useEffect, useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../store/userSlice';
import { RootState } from '../store';
import useAxiosPrivate from '../custom-hooks/useAxiosPrivate';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../custom-hooks/useAuth';
const Navbar = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const usersList = useSelector((state: RootState) => state.users.users);
  const [isLoaded, setIsLoaded] = useState(false);
  const [useId, setUseId] = useState('');
  const [signUp, setSignup] = useState(false)
  // const grabUseId = (id) => {
  //   setUseId(id);
  // };
  const { auth, setAuth } = useAuth();
  console.log('auth from navbar ->', auth);
  const location = useLocation();
  console.log('from navbar',location)
  const fetchUserInfo = async () => {
    if (auth?.id?.length) {
      try {
        const fetchedUserInfo = await axiosPrivate.get(
          `http://localhost:3000/api/users/${auth.id}`
        );
        dispatch(setUsers(fetchedUserInfo.data.users));
        setIsLoaded(true);
        
      } catch (err) {
        console.log(err);
      }
    } else {
    try {
      console.log('from before guest api call')
      const fetchedGuestInfo = await axiosPrivate.get(
        `http://localhost:3000/api/guest`
      );
      console.log('------------->',fetchedGuestInfo.data.users)
      dispatch(setUsers(fetchedGuestInfo.data.users));
      setIsLoaded(true);
    } catch (error) {
      console.log(error);
    }
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [auth.id]);

  return (
    <div className='bg-navbar flex-auto align-middle w-full h-20 mb-5'>
    <div className='flex justify-center items-center space-x-5 px-4'>
      {auth.id ? (
        <Link to={`/home/${auth.id}/applications`}className='text-white'>applications</Link>
      ) : (
        <Link to="unauthorized" className='text-white'>applications</Link>
      )}
      
      <Link to="home/:user_id/contacts" className='text-white'>contacts</Link>
     
      <Link to="home/:user_id/companies" className='text-white'>companies</Link>
      
      <Link to="/lounge" className='text-white'>lounge</Link>
      
      <Link to="/testroute" className='text-white'>Test Route</Link>
      {/* <h2>companies applied to, contacts</h2> */}
      {/* <div>{useId}</div>
      <Login grabUseId={grabUseId} /> */}
      {location.pathname === '/signup' ?  <></> : <Login /> }
      </div>
    </div>
  );
};

export default Navbar;
