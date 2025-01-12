import { Link } from 'react-router-dom';
import useAuth from '../../custom-hooks/useAuth';
import { useSelector } from 'react-redux';

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
  console.log("this is from the singleApp card", singleApp);

  // Map over the contacts for each application otherwise it breaks :(
  const contactsMap = contactsList?.map((contact: Contacts) => (
    <p key={contact.CONTACT_ID}>{contact?.CONTACT_NAME}</p>
  ));
  console.log("contactsList from card", contactsList);
  console.log("mapped contacts in card", contactsMap);
  return (
    <>
      <button
        onClick={() => setEditMode(true)}
        className="bg-button1 text-mainbody"
      >
        Edit
      </button>

      {/* <h1>single Application card</h1> */}
      <p>{singleApp?.company_name}</p>
      <p>{singleApp?.Position}</p>
      {contactsMap.length > 0 ? contactsMap : <p>No Contacts</p>}
    </>
  );
};

export default SingleApplicationCard;
