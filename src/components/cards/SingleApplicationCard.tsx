import useAuth from '../../custom-hooks/useAuth';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useEffect } from 'react';

type Contacts = {
  COMPANY_ID: string;
  CONTACT_ID: string;
  CONTACT_NAME: string;
};

const SingleApplicationCard = ({
  singleApp,
  contactsList,
  editMode,
  setEditMode,
}) => {
  const { auth, setAuth } = useAuth();

  const usersList = useSelector((state: RootState) => state.users.users);
  console.log('this is from the singleApp card', singleApp);

  const userApplications = useSelector(
    (state: RootState) => state.userApps.userApps
  );

  // DATE FORMATTING
  const appliedDate = new Date(singleApp?.Applied_Date);
  const lastUpdatedDate = new Date(singleApp?.Last_Updated_Date);

  // useEffect(() => {
  //   console.log('useEffect triggered fromt he form');
  // }, [userApplications]);
  // Map over the contacts for each application otherwise it breaks :(
  const contactsMap = contactsList?.map((contact: Contacts) => (
    <p key={contact.CONTACT_ID}>{contact?.CONTACT_NAME}</p>
  ));

  //console.log('contactsList from card', contactsList);
  //console.log('mapped contacts in card', contactsMap);
  return (
    <div className="flex justify-center items-center">
      <button
        onClick={() => setEditMode(true)}
        className="bg-button1 text-mainbody"
      >
        Edit
      </button>
      <div className="m-10">
        <p className="text-lg">Company: {singleApp?.company_name}</p>
        <p className="text-sm">Job Title: {singleApp?.Position}</p>
        <p className="text-sm">
          Website:{' '}
          {singleApp?.Company_Website
            ? singleApp?.Company_Website
            : 'No website plz add'}{' '}
          {singleApp?.Company_Website}
        </p>
        <p className="text-sm">Status: {singleApp?.Status}</p>
        <div className="flex items-center">
          <p className="text-sm">
            Applied Date:{' '}
            {appliedDate.toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
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
        <div className="flex justify-center items-center">
          <p className="text-sm">
            Last updated date:{' '}
            {lastUpdatedDate.toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <p className="text-xs pl-1">
            {lastUpdatedDate.toLocaleString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              timeZoneName: 'short',
            })}
          </p>
        </div>
        <p className="text-sm">
          Application Info:{' '}
          {singleApp?.application_info
            ? singleApp?.application_info
            : 'No info plz update'}
        </p>
        <div>
          Contact List:{' '}
          {contactsMap.length > 0 ? contactsMap : <p>No Contacts</p>}
        </div>
      </div>
    </div>
  );
};

export default SingleApplicationCard;
