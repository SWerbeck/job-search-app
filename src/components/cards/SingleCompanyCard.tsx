import { Link } from 'react-router-dom';
import useAuth from '../../custom-hooks/useAuth';
import { useSelector } from 'react-redux';

const SingleCompanyCard = ({
  companyName,
  companyId,
  singleCompany,
  singleApplication,
  contacts,
  setEditMode,
}) => {
  const { auth, setAuth } = useAuth();

  const usersList = useSelector((state: RootState) => state.users.users);
  const jobPosition = singleApplication.map((app) => app.Position);
  const singleJob = jobPosition.map((position) => (
    <p className="text-white text-2xl mx-5"> {position}</p>
  ));
  console.log('job position', jobPosition);
  return (
    <>
      {auth?.id?.length ? (
        <div className="bg-mainbody h-50 w-50 border-spacing-x-7 border border: mx-3 border-white">
          <button
            onClick={() => setEditMode(true)}
            className="bg-button1 text-mainbody"
          >
            Edit
          </button>
          <Link to={`/home/${auth.id}/companies/${companyId}`}>
            <p className="text-white text-2xl mx-5">{singleCompany?.company}</p>
          </Link>
          {singleJob}
          {contacts ? (
            <div className="text-white text-2xl mx-5">
              Contacts:{' '}
              {contacts.map((contact) => (
                <p key={contact.CONTACT_ID}>{contact.CONTACT_NAME}</p>
              ))}
            </div>
          ) : (
            <p className="text-white text-2xl mx-5">
              No Contacts for {singleCompany?.company}
            </p>
          )}
          <div className="flex-auto"></div>
        </div>
      ) : (
        <div className="bg-mainbody h-50 w-50 border-spacing-x-7 border border: mx-3 border-white mb-12">
          <Link to={`/home/${usersList[0].user_id}/companies/${companyId}`}>
            <p className="text-white text-2xl mx-5">{singleCompany?.company}</p>
          </Link>
          <p className="text-white text-2xl mx-5">{jobPosition}</p>
          {contacts ? (
            <p className="text-white text-2xl mx-5">
              Contacts:{' '}
              {contacts.map((contact) => (
                <p>{contact.CONTACT_NAME}</p>
              ))}
            </p>
          ) : (
            <p className="text-white text-2xl mx-5">
              No Contacts for {singleCompany?.company}
            </p>
          )}
          <div className="flex-auto items-end"></div>
        </div>
      )}
    </>
  );
};

export default SingleCompanyCard;
