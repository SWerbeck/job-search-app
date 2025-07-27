import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect, useState } from "react";
import axios from "../../server/api/axios";
import useAuth from "../custom-hooks/useAuth";
import SingleContactCard from "./cards/SingleContactCard";
import EditContactCard from "./cards/EditContactCard";

const SingleContact = () => {
  const { contact_id } = useParams();
  const userApplications = useSelector(
    (state: RootState) => state.userApps.userApps
  );
  const { auth, setAuth } = useAuth();

  //will toggle between edit mode and read
  const [editMode, setEditMode] = useState(false);
  const [singleContact, setSingleContact] = useState([]);

  //useEffect(() => {}, [singleContact]);
  console.log("From single contact just now", singleContact);
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

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <>
      {editMode ? (
        <EditContactCard
          editMode={editMode}
          setEditMode={setEditMode}
          filteredContact={filteredContact}
          setSingleContact={setSingleContact}
          singleContact={singleContact}
        />
      ) : (
        <SingleContactCard
          setEditMode={setEditMode}
          singleContact={singleContact}
          filteredContact={filteredContact}
        />
      )}
    </>
  );
};

export default SingleContact;
