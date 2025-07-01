import { Link } from "react-router-dom";
import useAuth from "../../custom-hooks/useAuth";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const SingleContactCard = ({ singleContact, setEditMode, filteredContact }) => {
  const { auth, setAuth } = useAuth();

  const usersList = useSelector((state: RootState) => state.users.users);

  // DATE FORMATTING
  const appliedDate = new Date(filteredContact[0]?.last_contacted);
  const lastUpdatedDate = new Date(filteredContact[0]?.last_updated);

  useEffect(() => {}, [filteredContact]);
  console.log("fileterd contact from CARDDD", filteredContact);

  return (
    <div className="flex justify-center items-center">
      <div className="m-10 bg-gray-100 border-spacing-x-5 mx-5 place-content-center p-20 drop-shadow-lg rounded-xl">
        <div className="bg-button2 rounded-tl-xl rounded-tr-xl rounded-br-sm rounded-bl-sm absolute inset-x-0 top-0 h-16 flex justify-center items-center drop-shadow-lg">
          <p className="text-xl text-white">
            {filteredContact[0]?.contactname}
          </p>
        </div>
        <p className="text-lg">Company: {filteredContact[0]?.companyname}</p>
        <p className="text-sm">
          Email:{" "}
          {filteredContact[0]?.contact_email
            ? filteredContact[0]?.contact_email
            : "No email address was provided"}{" "}
        </p>
        <p className="text-sm">
          Linkedin:{" "}
          {filteredContact[0]?.contact_linkedin
            ? filteredContact[0]?.contact_linkedin
            : "Linkedin was not provided"}{" "}
        </p>
        <p className="text-sm">
          Phone number:{" "}
          {filteredContact[0]?.contact_phone
            ? filteredContact[0]?.contact_phone
            : "No phone number was provided"}{" "}
        </p>
        <p className="text-sm">
          Past companies:{" "}
          {filteredContact[0]?.past_jobs
            ? filteredContact[0]?.past_jobs.map((contact) => contact.COMPANY)
            : `No past companies for ${filteredContact[0]?.contactname}`}{" "}
        </p>
        <p className="text-sm">
          reply status: {filteredContact[0]?.reply_status}
        </p>
        <div className="flex items-center">
          <p className="text-sm">
            Message last sent:{" "}
            {appliedDate.toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-xs pl-1">
            {appliedDate.toLocaleString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              timeZoneName: "short",
            })}
          </p>
        </div>
        <div className="flex justify-center items-center">
          <p className="text-sm">
            Last update:{" "}
            {lastUpdatedDate.toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-xs pl-1">
            {lastUpdatedDate.toLocaleString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              timeZoneName: "short",
            })}
          </p>
        </div>
        {/* <p className="text-sm">
          Application Info:{" "}
          {singleApp?.application_info
            ? singleApp?.application_info
            : "No info plz update"}
        </p>
        <div>
          Contacts:
          {contactsMap.length > 0 ? (
            contactsMap
          ) : (
            <p className="ml-4">No Contacts</p>
          )}
        </div> */}
        <div className="flex justify-center items-center mt-6">
          <button
            onClick={() => setEditMode(true)}
            className="bg-button1 text-mainbody"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleContactCard;
