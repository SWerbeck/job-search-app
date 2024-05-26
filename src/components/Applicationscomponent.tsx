import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState } from '../store';
import { setUserApps } from '../store/userAppsSlice';

const Applications = () => {
  const dispatch = useDispatch();
  const userApplications = useSelector(
    (state: RootState) => state.userApps.userApps
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const userId = '42f3b132-dd24-4e6f-a65d-c9216a5d056a';

  const fetchApplications = async () => {
    try {
      const fetchedApps = await axios.get(
        `http://localhost:3000/api/applications/user/${userId}`
      );
      dispatch(setUserApps(fetchedApps.data.userapplications));
      if (userApplications.length > 1) {
        setIsLoaded(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  console.log('user apps', userApplications);

  if (!isLoaded) {
    return <div>LOADING...</div>;
  }
  return (
    <div>
      <div>
        {userApplications.map((userApp) => {
          return (
            <div key={userApp.company_id}>
              <h1>{`${userApp.company}`}</h1>
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
    </div>
  );
};

export default Applications;
