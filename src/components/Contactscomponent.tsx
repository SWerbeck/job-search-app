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
    let contObj = {};
    if (!arr.length) {
      setAlphabatized([]);
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      const contactName = arr[i]?.contactname;
      if (!contactName) continue; // skip if name is undefined/null
      const splitNames = arr[i]?.contactname.split(" ");
      const singleContactObj = arr[i];
      if (contObj.hasOwnProperty(`${splitNames[1][0]}`)) {
        contObj[splitNames[1][0]].push(singleContactObj);
      } else {
        contObj[splitNames[1][0]] = [];
        contObj[splitNames[1][0]].push(singleContactObj);
      }
    }
    console.log("our object ", contObj);
    setAlphabatized([contObj]);
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
  const newArrAplha = alphabatized.map((letter) => letter);
  console.log("new returned arr", newArrAplha);

  // const data = {
  //   fruits: [
  //     { name: 'Apple', color: 'Red' },
  //     { name: 'Banana', color: 'Yellow' },
  //   ],
  //   vegetables: [
  //     { name: 'Carrot', color: 'Orange' },
  //     { name: 'Broccoli', color: 'Green' },
  //   ],
  // };
  // JSX to display it
  // jsx
  // Copy
  // Edit
  // <div>
  //   {Object.entries(data).map(([category, items]) => (
  //     <div key={category}>
  //       <h2>{category}</h2>
  //       {items.map((item, index) => (
  //         <div key={index}>
  //           {/* Display all key-value pairs of the item */}
  //           {Object.entries(item).map(([key, value]) => (
  //             <p key={key}>
  //               <strong>{key}:</strong> {value}
  //             </p>
  //           ))}
  //         </div>
  //       ))}
  //     </div>
  //   ))}
  // </div>

  console.log("ALPHA OUTSIDE FUNCTION ", alphabatized);
  return (
    <div>
      <>
        <div className="h-20 w-50 border-spacing-x-5 border border: mx-3 border-white grid place-content-center mt-8 text-2xl sm:text-4xl">
          CONTACTS
        </div>
      </>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mx-3 mt-10 gap-x-4 gap-y-8">
        {/* {alphabatized?[0].map((letter) => letter.map((cont) => cont?.contactname))} */}

        {contacts?.map((cont) => {
          return auth.id ? (
            <div
              key={auth.id}
              className="bg-gray-100 border-spacing-x-5 mx-3 place-content-center p-20 drop-shadow-lg rounded-xl"
            >
              <div className="flex justify-center items-center pb-2 text-2xl sm:text-2xl md:text-3xl lg:text-4xl">
                {/* Contact name */}
                <p>{cont.contactname}</p>
              </div>
              <div className="flex justify-center items-center pb-4">
                {/* Company name */}
                <p className="sm:text-sm md:text-md lg:text-lg">
                  {cont.companyname}
                </p>
              </div>
              <div className="flex justify-center items-center">
                <Link to={`/home/${auth.id}/contacts/${cont.contact_id}`}>
                  <button className="bg-button2 text-white text-base p-2">
                    More info
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div
                key={cont.contact_id}
                className="bg-gray-100 border-spacing-x-5 mx-3 place-content-center p-20 drop-shadow-lg rounded-xl"
              >
                <div className="flex justify-center items-center pb-2 text-2xl sm:text-2xl md:text-3xl lg:text-4xl">
                  {/* Contact name */}
                  <p>{cont.contactname}</p>
                </div>
                <div className="flex justify-center items-center pb-4">
                  {/* Company name */}
                  <p className="sm:text-sm md:text-md lg:text-lg">
                    {cont.companyname}
                  </p>
                </div>
                <div className="flex justify-center items-center">
                  <Link
                    to={`/home/${usersList[0]?.user_id}/contacts/${cont.contact_id}`}
                  >
                    <button className="bg-button2 text-white text-base p-2">
                      More info
                    </button>
                  </Link>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Contacts;
