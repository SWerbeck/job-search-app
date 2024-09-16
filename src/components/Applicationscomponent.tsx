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

  const deleteApplication = async (appId) => {
    try {
      const applicationToDelete = await axiosPrivate.delete(
        `/api/applications/${appId}`
      );
      console.log('deleted apps from application', applicationToDelete);
      fetchApplications()
      setIsLoaded(true);
    } catch (err) {
      console.log(err.response.data);
      navigate('/', { state: { from: location }, replace: true });
    }
  };

  //Delete Application by application id
// router.delete('/:id', async (req, res) => {
//   try {
//     const id = req.params.id;
//     //query to get id passed from req.params.id
//     const singleApplication = await pool.query(singleApplicationById, [id]);
//     //getting that value and storing it into a variable
//     const toDeleteApplication = singleApplication.rows[0].applied_id;
//     //check if the query matches the req.params.id || if so delete that application
//     if (toDeleteApplication === id) {
//       await pool.query(deleteApplicationById, [id]);
//       res.status(200).send(`Application deleted with ID: ${id}`);
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'no application in db with this id' });
//   }
// });


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
                  </Link> <button onClick={ ()=> deleteApplication(applica.Application_ID)}className='bg-button1 text-white'>delete app</button>
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
