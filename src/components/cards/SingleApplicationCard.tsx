import { Link } from 'react-router-dom';
import useAuth from '../../custom-hooks/useAuth';
import { useSelector } from 'react-redux';

const SingleApplicationCard = ({ singleApp }) => {
  const { auth, setAuth } = useAuth();

  const usersList = useSelector((state: RootState) => state.users.users);
  console.log('this is from the singleApp card', singleApp);

  // Map over the contacts for each application otherwise it breaks :(
  const contactsMap = singleApp[0]?.contacts?.map(
    (contact) => contact.CONTACT_NAME
  );
  return (
    <>
      <h1>single Application card</h1>
      <p>{singleApp[0]?.company}</p>
      <p>{singleApp[0]?.applications[0].Position}</p>
      {contactsMap ? <p>{contactsMap}</p> : <p>No Contacts</p>}
    </>
  );
};

export default SingleApplicationCard;
