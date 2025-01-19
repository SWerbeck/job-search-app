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

  useEffect(() => {}, [userApplications]);

  // if (!loaded) {
  //   return <div>LOADING...</div>;
  // }

  console.log('from aplications for adding', userId);

  const postgresDate = '2024-12-20T14:07:26.738041-05:00';
  const parsedDate = new Date(postgresDate);
  const formattedDate = parsedDate.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  });

  console.log(formattedDate);

  const applicationData = userApplications?.map((userApp) => (
    <div key={userApp?.company_id}>
      <ul>COMPANY: {userApp?.company}</ul>
      APPLICATIONS :
      {userApp?.applications?.map((app) => (
        <div key={app?.Application_ID}>
          <Link to={`${location.pathname}/${app.Application_ID}`}>
            <li className="flex justify-center items-center">
              {app?.Position} {/* parse data to look better  */}
              {new Date(app?.Applied_Date).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                // hour: '2-digit',
                // minute: '2-digit',
                // second: '2-digit',
                // timeZoneName: 'short',
              })}{' '}
              <p className="text-xs">
                {new Date(app?.Applied_Date).toLocaleString('en-US', {
                  // year: 'numeric',
                  // month: 'long',
                  // day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  timeZoneName: 'short',
                })}
              </p>
            </li>
          </Link>{' '}
        </div>
      ))}
    </div>
  ));

  const appData = userApplications?.map((userApp) =>
    userApp?.applications?.map((app) => app.Position)
  );

  const displayData = appData?.map((data) => data);

  //console.log('DATA from applications', displayData);

  return (
    <div className="grid place-content-center">
      <Link
        to={`/home/${userId}/applications/addapplications`}
        className="mx-auto"
      >
        {/* <Link
        to={`/home/${auth.id}/applications/addapplications`}
        className="mx-auto"
      > */}
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
            {/* {userApp.contacts?.map((cont) => {`
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
