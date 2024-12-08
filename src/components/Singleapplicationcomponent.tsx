import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useAxiosPrivate from '../custom-hooks/useAxiosPrivate';
import { RootState } from '../store';
import SingleApplicationCard from './cards/SingleApplicationCard';

const Singleapplicationcomponent = () => {
  const applied_id = useParams().applied_id;
  const axiosPrivate = useAxiosPrivate();
  const [singleApp, setSingleApp] = useState([]);

  const userApplications = useSelector(
    (state: RootState) => state.userApps.userApps
  );

  const singleApplicationFilter = userApplications.filter(
    (app) => app.applications[0]?.Application_ID === applied_id
  );

  useEffect(() => {
    setSingleApp(singleApplicationFilter);
  }, []);
  return (
    <>
      <SingleApplicationCard singleApp={singleApp} />
    </>
  );
};

export default Singleapplicationcomponent;
