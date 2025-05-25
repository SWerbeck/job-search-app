import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import SingleCompanyCard from "./cards/SingleCompanyCard";
import EditCompanyCard from "./cards/EditCompanyCard";
import { useEffect, useState } from "react";
import axios from "../../server/api/axios";


const SingleContact = () => {
  const { contact_id } = useParams();
  const userApplications = useSelector(
    (state: RootState) => state.userApps.userApps
  );

  //will toggle between edit mode and read
  const [editMode, setEditMode] = useState(false);

  //used the application from the db and checks against the url parameter
  // const singleCompanyFilter = userApplications.filter(
  //   (app) => app.company_id === company_id
  // );
  // const singleCompanyFilter = userApplications.filter(
  //   (app) => app.company_id === company_id
  // );

  const contactFilter = userApplications?.flatMap(contact => contact?.contacts?.filter(c => c?.CONTACT_ID === contact_id && c !== undefined) || [])

  console.log('does contact filter return anything?',contactFilter)
console.log('user applications from single contact routeeee',userApplications)
  //const singleCompany = singleCompanyFilter[0];
  // gets the position that the user applied to
  // const singleApplication = singleCompany?.applications.map(
  //   (application) => application
  // );


  const fetchContacts = async () => {
    try {
      const fetchedContacts = await axios.get(
        `/api/contacts/${contactFilter[0]?.CONTACT_ID}`
      );
      console.log('fetched CONTACT SINGLE', fetchedContacts);
      //dispatch(setContacts(fetchedContacts?.data?.userContacts));
      //setIsLoaded(true);
    } catch (err) {
      console.log(err.response.data);
      //navigate("/", { state: { from: location }, replace: true });
    }
  };
  //const singleApplication = singleCompany?.applications;

  // gets the contatcs if any the user has for the company
  // const contactsDisplay = singleCompany?.contacts?.map(
  //   (contact) => contact.CONTACT_NAME
  // );

  //   const companyId = singleCompanyFilter[0].company_id;

  //   const applicationId = singleCompanyFilter[0]?.applications[0]?.Application_ID;

  //   const contacts = singleCompany?.contacts?.map((contact) => contact);
  //console.log('contact display??',contactsDisplay)

  useEffect(()=> {
    fetchContacts()
  })
  return (
    <div>
      <p>hello {contactFilter[0]?.CONTACT_NAME}</p>
      <h1>Single contact page</h1>
      <h1>Single contact page</h1>
      <h1>Single contact page</h1>
      <h1>Single contact page</h1>
      <h1>Single contact page</h1>
      <h1>Single contact page</h1>
      <h1>Single contact page</h1>
      <h1>Single contact page</h1>
      <h1>Single contact page</h1>
      <h1>Single contact page</h1>
      <h1>Single contact page</h1>
      
    </div>
  );
};

export default SingleContact;
