import { useEffect, useState } from 'react';
import Login from './Login';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../store/userSlice';
import { RootState } from '../store';
import useAxiosPrivate from '../custom-hooks/useAxiosPrivate';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const usersList = useSelector((state: RootState) => state.users.users);
  const [isLoaded, setIsLoaded] = useState(false);
  const [useId, setUseId] = useState('');
  const grabUseId = (id) => {
    setUseId(id);
  };

  const fetchUserInfo = async () => {
    try {
      const fetchedUserInfo = await axiosPrivate.get(
        `http://localhost:3000/api/users/${useId}`
      );
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
      {useId ? (
        <Link to={`/home/${useId}/applications`}>applications</Link>
      ) : (
        <Link to="unauthorized">applications</Link>
      )}
      <br/>
      <Link to="home/:user_id/contacts">contacts - needs auth to access</Link>
      <br />
      <Link to="home/:user_id/companies">companies - needs auth to access</Link>
      <br />
      <Link to="/lounge">lounge - needs auth to access</Link>
      <br />
      <Link to="/testroute">Test Route - no auth needed</Link>
      {/* <h2>companies applied to, contacts</h2> */}
      <div>{useId}</div>
      <Login grabUseId={grabUseId} />
    </>
  );
};

export default Navbar;
