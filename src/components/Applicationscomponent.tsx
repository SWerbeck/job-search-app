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

  console.log('FROM ALL APPS', userApplications);

  const applicationData = userApplications?.map((userApp) => (
    <div key={userApp?.company_id}>
      <ul className="bg-button2 text-white h-10 w-50 border-spacing-x-7 border mx-3 border-white grid place-content-left content-center text-4xl p-10 mt-10">
        {userApp?.company}
      </ul>

      {userApp?.applications?.map((app) => {
        const appliedDate = new Date(app?.Applied_Date); // Create a single Date instance

        return (
          <div
            key={app?.Application_ID}
            className="bg-mainbody h-20 w-50 border-spacing-x-5 border mx-3 border-white grid place-content-center text-button3 text-4xl p-20"
          >
            <Link to={`${location.pathname}/${app.Application_ID}`}>
              <div className="flex justify-center items-center pb-2">
                <p>Job title: {app?.Position}</p>
              </div>
              <div className="flex justify-center items-center pb-4">
                <p className="text-lg">
                  Date applied:{' '}
                  {appliedDate.toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}{' '}
                </p>
                <p className="text-xs pl-1">
                  {appliedDate.toLocaleString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    timeZoneName: 'short',
                  })}
                </p>
              </div>
            </Link>{' '}
            <div className="flex justify-center items-center">
              <Link to={`${location.pathname}/${app.Application_ID}`}>
                <button className="bg-button1 text-white text-base p-2">
                  More info
                </button>
              </Link>
            </div>
          </div>
        );
      })}
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
      <div className="bg-headline h-20 w-50 border-spacing-x-5 border border: mx-3 border-white grid place-content-center text-white text-4xl mt-8">
        APPLICATIONS :
      </div>
      {applicationData}
      {userApplications.map((userApp) => {
        return <div key={userApp?.company_id}></div>;
      })}
    </div>
  );
};

export default Applications;
