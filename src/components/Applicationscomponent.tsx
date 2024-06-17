import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { RootState } from '../store';
import { setUserApps } from '../store/userAppsSlice';
import useRefreshToken from '../custom-hooks/useRefreshToken';
import useAxiosPrivate from '../custom-hooks/useAxiosPrivate';
import useAuth from '../custom-hooks/useAuth';

//import axios from 'axios';

const Applications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();

  // const from = location.state?.from?.pathname || '/login';

  const usersList = useSelector((state: RootState) => state.users.users);
  const userApplications = useSelector(
    (state: RootState) => state.userApps.userApps
  );
  let isMounted = true;
  const [loaded, setIsLoaded] = useState(false);
  const [apps, setApps] = useState(false);

  const id = usersList[0]?.user_id;
  const user_id = auth.user_id;

  console.log('error id?', auth);

  const axiosPrivate = useAxiosPrivate();
  const refresh = useRefreshToken();

  const fetchApplications = async () => {
    try {
      const fetchedApps = await axiosPrivate.get(
        `/api/applications/user/${user_id}`
      );
      dispatch(setUserApps(fetchedApps?.data?.userapplications));
      if (isMounted && fetchedApps) {
        setIsLoaded(true);
      }
    } catch (err) {
      console.log(err.response.data);
      navigate('/login', { state: { from: location }, replace: true });
    }
  };

  useEffect(() => {
    fetchApplications();
    return () => {
      isMounted = false;
    };
  }, [id]);

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
