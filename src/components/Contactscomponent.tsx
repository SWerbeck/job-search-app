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
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
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

  const deleteContact = async (appId) => {
    try {
      const contactToDelete = await axiosPrivate.delete(
        `/api/applications/${appId}`
      );
      console.log('deleted apps from application', applicationToDelete);
      fetchApplications();
      setIsLoaded(true);
    } catch (err) {
      console.log(err.response.data);
      navigate('/', { state: { from: location }, replace: true });
    }
  };

  console.log('location', location);

  useEffect(() => {
    fetchContacts();
  }, [userId]);

  useEffect(() => {
    //console.log('dependency useEffect');
  }, [contacts]);
  if (!loaded) {
    return <div>LOADING...</div>;
  }
  console.log('for mapping ref in contacts ', contacts);

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
          return (
            <div key={cont.contact_id}>
              <h3>Name: {cont.contactname}</h3>
              <h4>Current company: {cont.companyname}</h4>
              {cont.past_jobs?.map((job, idx) => {
                return (
                  <div key={idx}>
                    <p>Used to work for: {job.COMPANY}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Contacts;
