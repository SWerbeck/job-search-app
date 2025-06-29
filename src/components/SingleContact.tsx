import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import SingleCompanyCard from "./cards/SingleCompanyCard";
import EditCompanyCard from "./cards/EditCompanyCard";
import { useEffect, useState } from "react";
import axios from "../../server/api/axios";
import useAuth from "../custom-hooks/useAuth";

const SingleContact = () => {
  const { contact_id } = useParams();
  const userApplications = useSelector(
    (state: RootState) => state.userApps.userApps
  );
  const { auth, setAuth } = useAuth();
  console.log("from single contact", auth);
  //will toggle between edit mode and read
  const [editMode, setEditMode] = useState(false);
  const [singleContact, setSingleContact] = useState([]);

  const fetchContacts = async () => {
    if (auth?.id?.length) {
      try {
        const fetchedContacts = await axios.get(
          `/api/contacts/user/${auth.id}`
        );
        setSingleContact(fetchedContacts.data.userContacts);
        //setIsLoaded(true);
      } catch (err) {
        console.log(err.response.data);
        //navigate("/", { state: { from: location }, replace: true });
      }
    } else {
      try {
        const fetchedContacts = await axios.get(`/api/guest/contacts`);
        setSingleContact(fetchedContacts.data.userContacts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const filteredContact = singleContact?.filter((contact) => {
    return contact.contact_id === contact_id;
  });

  // console.log("FILTERRR", filteredContact);
  // console.log("new console log", singleContact);

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div>
      <p>Info for {filteredContact[0]?.contactname}</p>
      <h1>{filteredContact[0]?.reply_status}</h1>
      <h1>
        {filteredContact[0]?.contact_email
          ? filteredContact[0]?.contact_email
          : `No email for ${filteredContact[0]?.contactname} was provided`}
      </h1>
      <h1>
        {filteredContact[0]?.contact_phone
          ? filteredContact[0]?.contact_phone
          : `No phone number was provided`}
      </h1>
    </div>
  );
};

export default SingleContact;
