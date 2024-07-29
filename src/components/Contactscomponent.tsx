import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { RootState } from '../store';
import { setUserApps } from '../store/userAppsSlice';
import { setContacts } from '../store/contactsSlice';
import useRefreshToken from '../custom-hooks/useRefreshToken';
import useAxiosPrivate from '../custom-hooks/useAxiosPrivate';

const Contacts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // const from = location.state?.from?.pathname || '/login';

  const usersList = useSelector((state: RootState) => state.users.users);
  const contacts = useSelector(
    (state: RootState) => state.contacts.contacts
  );
  const [loaded, setIsLoaded] = useState(false);
  //const [fetchedUsers, setFetchedUsers] = useState('');
  const userId = usersList[0]?.user_id;

  const axiosPrivate = useAxiosPrivate();
  const refresh = useRefreshToken();

  const fetchContacts = async () => {
    try {
      const fetchedContacts = await axiosPrivate.get(
        `/api/contacts/user/${userId}`
      );
      console.log('fetched apps from application', fetchedContacts);
      dispatch(setContacts(fetchedContacts?.data?.userContacts));
      setIsLoaded(true);
    } catch (err) {
      console.log(err.response.data);
      navigate('/', { state: { from: location }, replace: true });
    }
  };

  console.log("location",location)

  useEffect(() => {
    fetchContacts();
  }, [userId]);

  useEffect(() => {
    //console.log('dependency useEffect');
  }, [contacts]);
  if (!loaded) {
    return <div>LOADING...</div>;
  }
  console.log('for mapping ref ', contacts[0]);

  return (
    <div>
      <>
        <button onClick={refresh}>refresh token?</button>
      </>
      <>
      <h1>CONTACTS</h1>
      
      </>
      <div>
       {contacts?.map((cont) => {
        return (<div key={cont.contact_id}>{cont.contactname}</div>)
       })}
      </div>
    </div>
  );
};

export default Contacts;
