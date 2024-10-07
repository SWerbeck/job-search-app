import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { RootState } from '../store';
import { setUserApps } from '../store/userAppsSlice';
import useRefreshToken from '../custom-hooks/useRefreshToken';
import useAxiosPrivate from '../custom-hooks/useAxiosPrivate';
import useAuth from '../custom-hooks/useAuth';
import axios from '../../server/api/axios';

const Applications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, setAuth } = useAuth();

  const from = location.state?.from?.pathname || '/login';

  const usersList = useSelector((state: RootState) => state.users.users);
  const userApplications = useSelector(
    (state: RootState) => state.userApps.userApps
  );
  const [loaded, setIsLoaded] = useState(false);
  const userId = usersList[0]?.user_id;

  const axiosPrivate = useAxiosPrivate();
  const refresh = useRefreshToken();

  // THIS IS WHERE YOU STARTED COMMENTING OUT THR FETCH APPLICATIONS 
  //   const fetchApplications = async () => {
  //   if (auth?.id) {
  //     try {
  //       const fetchedApps = await axiosPrivate.get(
  //         `/api/applications/user/${userId}`
  //       );
  //       console.log('fetched apps from application', fetchedApps);
  //       dispatch(setUserApps(fetchedApps?.data?.userapplications));
  //       setIsLoaded(true);
  //     } catch (err) {
  //       console.log(err.response.data);
  //       navigate('/', { state: { from: location }, replace: true });
  //     }
  //   } else {
  //     try {
  //       const guestApps = await axios.get('/api/guest/applications');
  //       dispatch(setUserApps(guestApps?.data?.userapplications));
  //       setIsLoaded(true);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  const deleteApplication = async (appId) => {
    try {
      const applicationToDelete = await axiosPrivate.delete(
        `/api/applications/${appId}`
      );
      console.log('deleted apps from application', applicationToDelete);
      //fetchApplications();
      setIsLoaded(true);
    } catch (err) {
      console.log(err.response.data);
      navigate('/', { state: { from: location }, replace: true });
    }
  };

  useEffect(() => {
    //console.log('dependency useEffect');
  }, [userApplications]);
  // if (!loaded) {
  //   return <div>LOADING...</div>;
  // }
  //console.log('for mapping ref ', userApplications);

  return (
    <div className="grid place-content-center">
      {userApplications.map((userApp) => {
        return (
          <div key={userApp.company_id}>
            <ul>COMPANY: {userApp.company}</ul>

            {userApp.applications?.map((applica) => {
              return (
                <div key={applica.Application_ID}>
                  <Link to={`${location.pathname}/${applica.Application_ID}`}>
                    APPLICATIONS : {applica.Position} {applica.Applied_Date}
                  </Link>{' '}
                  <button
                    onClick={() => deleteApplication(applica.Application_ID)}
                    className="bg-button1 text-white"
                  >
                    delete app
                  </button>
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
