import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { RootState } from '../store';
import { deleteUserApps } from '../store/userAppsSlice';
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

  const deleteApplication = async (appId) => {
    try {
      const applicationToDelete = await axiosPrivate.delete(
        `/api/applications/${appId}`
      );
      console.log('deleted apps from application', applicationToDelete);
      dispatch(deleteUserApps(appId));
      setIsLoaded(true);
    } catch (err) {
      console.log(err.response.data);
      navigate('/', { state: { from: location }, replace: true });
    }
  };

  useEffect(() => {}, [userApplications]);

  // if (!loaded) {
  //   return <div>LOADING...</div>;
  // }

  const applicationData = userApplications?.map((userApp) => (
    <div key={userApp?.company_id}>
      <ul>COMPANY: {userApp?.company}</ul>
      {userApp?.applications?.map((app) => (
        <div key={app?.Application_ID}>
          <Link to={`${location.pathname}/${app.Application_ID}`}>
            APPLICATIONS : {app?.Position} {app?.Applied_Date}
          </Link>{' '}
          <button
            onClick={() => deleteApplication(app.Application_ID)}
            className="bg-button1 text-white"
          >
            delete app
          </button>
        </div>
      ))}
    </div>
  ));

  const appData = userApplications?.map((userApp) =>
    userApp?.applications?.map((app) => app.Position)
  );

  const displayData = appData?.map((data) => data);

  console.log('DATA from applications', displayData);

  return (
    <div className="grid place-content-center">
      <Link
        to={`/home/${auth.id}/applications/addapplications`}
        className="mx-auto"
      >
        <button className="bg-button1 text-white">Add new Application</button>
      </Link>
      {applicationData}
      {userApplications.map((userApp) => {
        return (
          <div key={userApp?.company_id}>
            {/* <ul>COMPANY: {userApp.company}</ul> */}

            {/* {userApp?.applications?.map((applica) => {
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
              })} */}

            {/* {currentContacts} */}
            {/* {userApp.contacts?.map((cont) => {
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
            })} */}
          </div>
        );
      })}
    </div>
  );
};

export default Applications;
