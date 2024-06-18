import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { setUserApps } from '../store/userAppsSlice';
import useRefreshToken from '../custom-hooks/useRefreshToken';
import useAxiosPrivate from '../custom-hooks/useAxiosPrivate';

const Applications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // const from = location.state?.from?.pathname || '/login';

  const usersList = useSelector((state: RootState) => state.users.users);
  const userApplications = useSelector(
    (state: RootState) => state.userApps.userApps
  );
  const [loaded, setIsLoaded] = useState(false);
  //const [fetchedUsers, setFetchedUsers] = useState('');
  const userId = usersList[0]?.user_id;

  const axiosPrivate = useAxiosPrivate();
  const refresh = useRefreshToken();

  const fetchApplications = async () => {
    try {
      const fetchedApps = await axiosPrivate.get(
        `/api/applications/user/${userId}`
      );
      console.log('fetched apps from application', fetchedApps);
      dispatch(setUserApps(fetchedApps?.data?.userapplications));
      setIsLoaded(true);
    } catch (err) {
      console.log(err.response.data);
      navigate('/login', { state: { from: location }, replace: true });
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [userId]);
  console.log('outside use effext', userApplications);

  useEffect(() => {
    //console.log('dependency useEffect');
  }, [userApplications]);
  if (!loaded) {
    return <div>LOADING...</div>;
  }
  return (
    <div>
      <>
        <button onClick={refresh}>refresh token?</button>
      </>
      {userApplications?.map((userApp) => {
        return (
          <div key={userApp?.applications}>
            <h1>{`${userApp?.company}`}</h1>
            {/* {userApp.applications.map((app) => 
              <h3>{`${app.Position}`}</h3>)}
               {userApp.contacts.map((contact) => 
              <h3>{`${contact.CONTACT_NAME}`}</h3>)}
            {userApp.past_job_contacts.map((pastJobCont) => 
              <h3>{`${pastJobCont.CONTACT_NAME}`}</h3>)} */}
          </div>
        );
      })}
    </div>
  );
};

export default Applications;
