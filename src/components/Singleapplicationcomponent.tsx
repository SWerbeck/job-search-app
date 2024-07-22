import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useAxiosPrivate from "../custom-hooks/useAxiosPrivate";
import { RootState } from '../store';


const Singleapplicationcomponent = () => {
const applied_id = useParams().applied_id
const axiosPrivate = useAxiosPrivate();
const [singleApp, setSingleApp] = useState ([])

const userApplications = useSelector(
    (state: RootState) => state.userApps.userApps
  );
  const fetchSingleApplication = async () => {
    try {
      const singleApplication = await axiosPrivate.get(
        `/api/applications/${applied_id}`
      );
      setSingleApp(singleApplication?.data?.application[0])
    } catch (err) {
      console.log(err.response.data);
      //navigate('/', { state: { from: location }, replace: true });
    }
  };

console.log("single app local hook",singleApp)

console.log('app id from single',applied_id)
useEffect(() => {
    fetchSingleApplication();
  }, [applied_id]);
  return (
    <>
      <h1>
        {singleApp?.job_title}
      </h1>
    </>
  )
}

export default Singleapplicationcomponent