import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { RootState } from '../store';
import { setUserApps } from '../store/userAppsSlice';
import useRefreshToken from '../custom-hooks/useRefreshToken';
import useAxiosPrivate from '../custom-hooks/useAxiosPrivate';

const Applications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/login';

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
      navigate('/', { state: { from: location }, replace: true });
    }
  };

  //console.log('location', location);

  useEffect(() => {
    fetchApplications();
  }, [userId]);

  useEffect(() => {
    //console.log('dependency useEffect');
  }, [userApplications]);
  if (!loaded) {
    return <div>LOADING...</div>;
  }
  //console.log('for mapping ref ', userApplications);

  return (
    <div>
      <>
        <button onClick={refresh}>refresh token?</button>
      </>
      {userApplications.map((userApp) => {
        return (
          <div key={userApp.company_id}>
            <ul>COMPANY: {userApp.company}</ul>

            {userApp.applications?.map((applica) => {
              return (
                <div key={applica.Application_ID}>
                  <Link to={`${location.pathname}/${applica.Application_ID}`}>
                    APPLICATIONS : {applica.Position} {applica.Applied_Date}
                  </Link>
                </div>
              );
            })}

            {userApp.contacts?.map((cont) => {
              return (
                <div key={cont.CONTACT_ID}>
                  <p>CURRENTLY WORKS HERE : {cont.CONTACT_NAME}</p>
                </div>
              );
            })}

            {userApp.past_job_contacts?.map((pastcont) => {
              return (
                <div key={pastcont.CONTACT_ID}>
                  <p>USED TO WORK HERE : {pastcont.CONTACT_NAME}</p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Applications;
