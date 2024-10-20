import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import SingleCompanyCard from './cards/SingleCompanyCard';
import EditCompanyCard from './cards/EditCompanyCard';
import { useEffect, useState } from 'react';

const SingleCompany = () => {
  const { company_id } = useParams();
  const userApplications = useSelector(
    (state: RootState) => state.userApps.userApps
  );

  console.log('from single copany userApplications', userApplications);
  //will toggle between edit mode and read
  const [editMode, setEditMode] = useState(false);

  //used the application from the db and checks against the url parameter
  const singleCompanyFilter = userApplications.filter(
    (app) => app.company_id === company_id
  );

  const singleCompany = singleCompanyFilter[0];
  // gets the position that the user applied to
  const jobPosition = singleCompany?.applications.map(
    (application) => application.Position
  );

  // gets the contatcs if any the user has for the company
  const contacts = singleCompany?.contacts?.map(
    (contact) => contact.CONTACT_NAME
  );

  const applicationId = singleCompanyFilter[0]?.applications[0]?.Application_ID;

  return (
    <>
      {editMode ? (
        <EditCompanyCard
          editMode={editMode}
          setEditMode={setEditMode}
          singleCompany={singleCompany}
          applicationId={applicationId}
          jobPosition={jobPosition}
          contacts={contacts}
        />
      ) : (
        <SingleCompanyCard
          singleCompany={singleCompany}
          jobPosition={jobPosition}
          contacts={contacts}
          setEditMode={setEditMode}
        />
      )}
    </>
  );
};

export default SingleCompany;
