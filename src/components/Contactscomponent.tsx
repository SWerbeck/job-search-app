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
  const [allKeys, setAllKeys] = useState([])
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

    const ordered = {}
    Object.keys(contObj).sort().forEach(function(key) {ordered[key] = contObj[key]})
    
    setAlphabatized([ordered]);
    let alphKeys = Object.keys(contObj)
    setAllKeys(alphKeys)
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
      {Object.entries(alphabatized[0]).map(([category, items]) => (
    <div key={category}>
      <h2>{category}</h2>
      {items.map((item, index) => (
        <div key={item.contact_id}>
          {/* Display only the 'contactname' value */}
          {item.contactname && (
            <p>
              {item.contactname}
            </p>
           
          )}
          {item.contactname && (
            <p>
             {item.companyname}
            </p>
           
          )}
        </div>
      ))}
    </div>
  ))}
    </div>
  );
};

export default Contacts;
