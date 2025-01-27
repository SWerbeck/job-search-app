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

  // useEffect(() => {
  //   console.log('useEffect triggered fromt he form');
  // }, [userApplications]);
  // Map over the contacts for each application otherwise it breaks :(
  const contactsMap = contactsList?.map((contact: Contacts) => (
    <p key={contact.CONTACT_ID}>{contact?.CONTACT_NAME}</p>
  ));

  console.log('contactsList from card', contactsList);
  console.log('mapped contacts in card', contactsMap);
  return (
    <div className="flex justify-center items-center">
      <button
        onClick={() => setEditMode(true)}
        className="bg-button1 text-mainbody"
      >
        Edit
      </button>

      {/* <h1>single Application card</h1> */}
      <div className="m-10">
        <p className="text-lg">Company: {singleApp?.company_name}</p>
        <p className="text-sm">Job Title: {singleApp?.Position}</p>
        <div>
          Contact List:{' '}
          {contactsMap.length > 0 ? contactsMap : <p>No Contacts</p>}
        </div>
      </div>
    </div>
  );
};

export default SingleApplicationCard;
