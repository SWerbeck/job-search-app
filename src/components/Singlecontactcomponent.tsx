import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useAxiosPrivate from "../custom-hooks/useAxiosPrivate";
import { RootState } from '../store';


const Singlecontactcomponent = () => {
const applied_id = useParams().applied_id
const axiosPrivate = useAxiosPrivate();
const [singleContact, setSingleContact] = useState ([])

const userApplications = useSelector(
    (state: RootState) => state.userApps.userApps
  );
  const fetchSingleContact = async () => {
    try {
      const singleContact = await axiosPrivate.get(
        `/api/contacts/${applied_id}`
      );
      setSingleContact(singleContact?.data?.contact[0])
    } catch (err) {
      console.log(err.response.data);
      //navigate('/', { state: { from: location }, replace: true });
    }
  };


useEffect(() => {
  fetchSingleContact();
  }, [applied_id]);
  return (
    <>
      <h1>
        {singleContact?.contactname}
      </h1>
    </>
  )
}

export default Singlecontactcomponent