import { useEffect, useState } from "react";
import Login from "./Login";
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../store/userSlice';
import { RootState } from '../store';
import axios from 'axios';

const Navbar = () => {

  const dispatch = useDispatch();
  const usersList = useSelector((state: RootState) => state.users.users);
  const [isLoaded, setIsLoaded] = useState(false);
  const [useId, setUseId] = useState('')  
  const grabUseId = (id) => {
    setUseId(id)
  }

  const fetchUserInfo = async () => {
    try {
      const fetchedUserInfo = await axios.get(
        `http://localhost:3000/api/users/${useId}`
      );
      console.log('from home fetch users', fetchedUserInfo.data.users);
      dispatch(setUsers(fetchedUserInfo.data.users));
      setIsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
 
    fetchUserInfo();
  }, [useId]);

  

  return (
    
    <>
      <h2>applications, companies applied to, contacts</h2>
      <div>{useId}</div>
      <Login grabUseId={grabUseId}/>
    </>
  );
};

export default Navbar;
