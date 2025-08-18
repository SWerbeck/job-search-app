import { Link } from "react-router-dom";
import useAuth from "../../custom-hooks/useAuth";
import { useSelector } from "react-redux";

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
  const jobPosition = singleApplication.map((app) =>
    auth.id ? (
      <div className="bg-gray-100 border-spacing-x-5 mx-3 place-content-center p-20 drop-shadow-lg rounded-xl m-10">
        <Link to={`/home/${auth.id}/applications/${app.Application_ID}`}>
          {app.Position}
        </Link>
      </div>
    ) : (
      <div className="bg-gray-100 border-spacing-x-5 mx-3 place-content-center p-20 drop-shadow-lg rounded-xl m-10">
        <Link
          to={`/home/${usersList[0].user_id}/applications/${app.Application_ID}`}
        >
          {app.Position}
        </Link>
      </div>
    )
  );
  // const singleJob = jobPosition.map((position) => (
  //   <p className="text-white text-2xl mx-5"> {position}</p>
  // ));

  //console.log("job position", jobPosition);
  console.log("single company...", singleCompany);

  return (
    <>
      <div className="h-20 w-50 border-spacing-x-5 border border: mx-3 border-white grid place-content-center mt-8 text-2xl sm:text-4xl">
        {singleCompany?.company}
      </div>
      <h1 className=" bg-headline text-white h-10 w-50 border-spacing-x-7 border mx-3 border-white grid place-content-left content-center p-10 mt-10 rounded-xl  text-center text-2xl xs:text-3xl sm:text-4xl md:text-left mb-10">
        Applications
      </h1>
      {auth?.id?.length ? (
        <div className="bg-mainbody h-50 w-50 border-spacing-x-7 border border: mx-3 border-white">
          <button
            onClick={() => setEditMode(true)}
            className="bg-button1 text-mainbody"
          >
            Edit Company info
          </button>

          {/* <Link to={`/home/${auth.id}/companies/${companyId}`}>
            <p className="text-white text-2xl mx-5">{singleCompany?.company}</p>
          </Link>
          {singleJob} */}
          <div>{jobPosition}</div>
          {contacts ? (
            <div className="text-black text-2xl mx-5">
              <h1 className=" bg-headline text-white h-10 w-50 border-spacing-x-7 border mx-3 border-white grid place-content-left content-center p-10 mt-10 rounded-xl  text-center text-2xl xs:text-3xl sm:text-4xl md:text-left mb-10">
                Contacts
              </h1>
              {contacts.map((contact) => (
                <p
                  className="text-black text-2xl mx-5"
                  key={contact.CONTACT_ID}
                >
                  {contact.CONTACT_NAME}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-black text-2xl mx-5">
              No Contacts for {singleCompany?.company}
            </p>
          )}
          <div className="flex-auto"></div>
        </div>
      ) : (
        <div className="h-50 w-50 border-spacing-x-7 border border: mx-3 border-white mb-12">
          <p className="text-black text-2xl mx-5">{jobPosition}</p>
          <h1 className=" bg-headline text-white h-10 w-50 border-spacing-x-7 border mx-3 border-white grid place-content-left content-center p-10 mt-10 rounded-xl  text-center text-2xl xs:text-3xl sm:text-4xl md:text-left mb-10">
            Contacts
          </h1>
          {contacts ? (
            <p className="text-black text-2xl mx-5">
              Contacts:{" "}
              {contacts.map((contact) => (
                <p>{contact.CONTACT_NAME}</p>
              ))}
            </p>
          ) : (
            <p className="text-black text-2xl mx-5">
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
