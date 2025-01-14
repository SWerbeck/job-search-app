import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAxiosPrivate from '../custom-hooks/useAxiosPrivate';
import { RootState } from '../store';
import SingleApplicationCard from './cards/SingleApplicationCard';
import { deleteUserApps } from '../store/userAppsSlice';
import EditApplicationCard from './cards/EditApplicationCard';

const Singleapplicationcomponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const applied_id = useParams().applied_id;
  const axiosPrivate = useAxiosPrivate();
  const [singleApp, setSingleApp] = useState(null);
  const [loaded, setIsLoaded] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const userApplications = useSelector(
    (state: RootState) => state.userApps.userApps
  );

  const usersList = useSelector((state: RootState) => state.users.users);
  const userId = usersList[0]?.user_id;

  const deleteApplication = async (applied_id: string) => {
    try {
      const applicationToDelete = await axiosPrivate.delete(
        `/api/applications/${applied_id}`
      );
      dispatch(deleteUserApps(applied_id));
      navigate(`/home/${userId}/applications`);
      setIsLoaded(true);
    } catch (err) {
      console.log(err.response.data);
      navigate('/', { state: { from: location }, replace: true });
    }
  };

  const singleApplicationFilter = userApplications
    ?.flatMap((app) => app.applications) // Flatten the applications array
    ?.filter((app) => app.Application_ID === applied_id); // Filter by ID

  const contactsList = userApplications
    ?.flatMap((app) => app.contacts || [])
    ?.filter(
      (contact) =>
        contact &&
        singleApp?.company_id &&
        contact.COMPANY_ID === singleApp.company_id
    );

  useEffect(() => {
    setSingleApp(singleApplicationFilter?.[0] || null); // Safely set singleApp
  }, [userApplications, applied_id]); // Added dependencies

  return (
    <>
      {' '}
      {editMode ? (
        <EditApplicationCard
          singleApp={singleApp}
          contactsList={contactsList}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      ) : (
        <SingleApplicationCard
          singleApp={singleApp}
          contactsList={contactsList}
          editMode={editMode}
          setEditMode={setEditMode}
        />

        // <button
        //   onClick={() => deleteApplication(applied_id)}
        //   className="bg-button1 text-white"
        // >
        //   delete app
        // </button>
      )}
    </>
  );
};

export default Singleapplicationcomponent;
