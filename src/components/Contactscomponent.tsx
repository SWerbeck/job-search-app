import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { RootState } from "../store";
import { setContacts } from "../store/contactsSlice";
import useRefreshToken from "../custom-hooks/useRefreshToken";
import useAxiosPrivate from "../custom-hooks/useAxiosPrivate";
import useAuth from "../custom-hooks/useAuth";

const Contacts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, setAuth } = useAuth();
  // const from = location.state?.from?.pathname || '/login';

  const usersList = useSelector((state: RootState) => state.users.users);
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const [loaded, setIsLoaded] = useState(false);
  const [alphabatized, setAlphabatized] = useState([]);
  const [allKeys, setAllKeys] = useState([]);
  //const [fetchedUsers, setFetchedUsers] = useState('');
  const userId = usersList[0]?.user_id;

  if (auth.id) {
    console.log("auth id", auth);
    const authId = auth.id;
  } else {
    console.log("guest id", usersList[0]);
  }

  const axiosPrivate = useAxiosPrivate();
  const refresh = useRefreshToken();

  const fetchContacts = async () => {
    try {
      const fetchedContacts = await axiosPrivate.get(
        `/api/contacts/user/${userId}`
      );
      //console.log('fetched apps from application', fetchedContacts);
      dispatch(setContacts(fetchedContacts?.data?.userContacts));
      setIsLoaded(true);
    } catch (err) {
      console.log(err.response.data);
      navigate("/", { state: { from: location }, replace: true });
    }
  };

  // I dont think this works yet...
  const deleteContact = async (appId) => {
    try {
      const contactToDelete = await axiosPrivate.delete(
        `/api/applications/${appId}`
      );
      console.log("deleted apps from application", applicationToDelete);
      fetchApplications();
      setIsLoaded(true);
    } catch (err) {
      console.log(err.response.data);
      navigate("/", { state: { from: location }, replace: true });
    }
  };

  const alphOrganize = (arr) => {
    if (!arr.length) {
      setAlphabatized([]);
      return;
    }

    const contObj = {};

    for (let contact of arr) {
      const contactName = contact.contactname;
      if (!contactName) continue;

      const nameParts = contactName.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName =
        nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";

      const letter = lastName[0]?.toUpperCase() || "#"; // fallback group for edge cases

      if (!contObj[letter]) {
        contObj[letter] = [];
      }

      contObj[letter].push({ ...contact, firstName, lastName });
    }

    // Sort each group by last name, then first name
    Object.keys(contObj).forEach((key) => {
      contObj[key].sort((a, b) => {
        const firstCompare = a.lastName
          .toLowerCase()
          .localeCompare(b.lastName.toLowerCase());
        if (firstCompare !== 0) return firstCompare;
        return a.firstName
          .toLowerCase()
          .localeCompare(b.firstName.toLowerCase());
      });
    });

    // Sort the letter groups A-Z
    const ordered = {};
    Object.keys(contObj)
      .sort()
      .forEach((key) => {
        ordered[key] = contObj[key];
      });

    setAlphabatized([ordered]);
    setAllKeys(Object.keys(ordered));
  };

  useEffect(() => {
    fetchContacts();
  }, [userId]);

  useEffect(() => {
    if (contacts.length) {
      alphOrganize(contacts);
    }
  }, [contacts]);

  if (!loaded) {
    return <div>LOADING...</div>;
  }

  console.log("Alphabatized", alphabatized);
  return (
    <div>
      <div className="grid place-content-center">
        <Link to={`/home/${userId}/contacts/addcontacts`} className="mx-auto">
          {/* <Link
        to={`/home/${auth.id}/applications/addapplications`}
        className="mx-auto"
        > */}
          <button className="bg-button1 text-white">Add new Contact</button>
        </Link>
      </div>
      {alphabatized.length
        ? Object.entries(alphabatized[0]).map(([category, items]) => (
            <div key={category}>
              <h2 className="bg-headline text-white h-10 w-50 border-spacing-x-7 border mx-3 border-white grid place-content-left content-center p-10 mt-10 rounded-xl  text-center text-2xl xs:text-3xl sm:text-4xl md:text-left">
                {category}
              </h2>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mx-3 mt-10 gap-x-4 gap-y-8">
                {items.map((item) => (
                  <div key={item.contact_id}>
                    <div className="bg-gray-100 h-full border-spacing-x-5 mx-3 place-content-center p-20 drop-shadow-lg rounded-xl">
                      <div className="flex justify-center items-center pb-2 text-2xl sm:text-2xl md:text-3xl lg:text-4xl">
                        {/* contact name */}
                        <p className="text-center">{item.contactname}</p>
                      </div>
                      {/* company name */}
                      <div className="flex justify-center items-center pb-4">
                        {" "}
                        <p className="text-center">{item.companyname}</p>
                      </div>
                      <div className="flex justify-center items-center fixed bottom-8 left-0 right-0">
                        <Link to={`${location.pathname}/${item.contact_id}`}>
                          <button className="bg-button1 text-white text-base p-2">
                            More info
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        : "No contacts"}
    </div>
  );
};

export default Contacts;
