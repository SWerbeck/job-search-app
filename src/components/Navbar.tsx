import { useEffect, useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../store/userSlice";
import { RootState } from "../store";
import useAxiosPrivate from "../custom-hooks/useAxiosPrivate";
import axios from "../../server/api/axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../custom-hooks/useAuth";
import { setUserApps } from "../store/userAppsSlice";
import { useDisable } from "../context/DisableContext";

const Navbar = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const usersList = useSelector((state: RootState) => state.users.users);
  const userApplications = useSelector(
    (state: RootState) => state.userApps.userApps
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [useId, setUseId] = useState("");
  const [signUp, setSignup] = useState(false);
  const navigate = useNavigate();

  const { auth, setAuth } = useAuth();
  const { isDisabled } = useDisable();

  const location = useLocation();

  // const fetchUserInfo = async () => {
  //   if (auth?.id?.length) {
  //     try {
  //       const fetchedUserInfo = await axiosPrivate.get(
  //         `http://localhost:3000/api/users/${auth.id}`
  //       );
  //       dispatch(setUsers(fetchedUserInfo.data.users));
  //       setIsLoaded(true);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   } else {
  //     try {
  //       const fetchedGuestInfo = await axiosPrivate.get(
  //         `http://localhost:3000/api/guest`
  //       );
  //       //console.log('------------->', fetchedGuestInfo.data.users);
  //       dispatch(setUsers(fetchedGuestInfo.data.users));
  //       setIsLoaded(true);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };
  console.log("USER APP FROM NAV", userApplications);
  console.log("Auth FROM NAV", auth);
  console.log("list of users from nav", usersList);

  // all applications not protected
  // http://localhost:5173/home/3fa575b3-cff6-4275-821b-94ae28225620/applications

  // single application should be protected
  // http://localhost:5173/home/3fa575b3-cff6-4275-821b-94ae28225620/applications/f5e04814-a1e7-4160-b85c-610722cc2634

  const fetchUserInfo = async () => {
    try {
      if (auth?.id?.length) {
        const fetchedUserInfo = await axiosPrivate.get(
          `http://localhost:3000/api/users/${auth.id}`
        );
        dispatch(setUsers(fetchedUserInfo.data.users));
      } else {
        const fetchedGuestInfo = await axiosPrivate.get(
          `http://localhost:3000/api/guest`
        );
        dispatch(setUsers(fetchedGuestInfo.data.users));
      }
      setIsLoaded(true);
    } catch (err) {
      console.error("Error fetching user info:", err);
    }
  };

  const fetchApplications = async () => {
    if (auth?.id?.length) {
      try {
        const fetchedApps = await axiosPrivate.get(
          `/api/applications/user/${auth.id}`
        );
        //console.log('fetched apps from application', fetchedApps);
        dispatch(setUserApps(fetchedApps?.data?.userapplications));
        setIsLoaded(true);
      } catch (err) {
        console.log(err.response.data);
        navigate("/", { state: { from: location }, replace: true });
      }
    } else {
      try {
        const guestApps = await axios.get("/api/guest/applications");
        dispatch(setUserApps(guestApps?.data?.userapplications));
        setIsLoaded(true);
      } catch (error) {
        console.log(error);
      }
    }
  };
  console.log(usersList, "userslist from nav");
  useEffect(() => {
    fetchUserInfo();
    fetchApplications();
  }, [auth.id]);

  return (
    <div className="bg-navbar z-40 sticky top-0 flex-auto align-middle md:w-full mb-10">
      <div className="flex justify-evenly items-center space-x-5 px-4 pt-3 pb-3">
        {auth.id ? (
          <>
            <Link
              to={`/home/${auth.id}/applications`}
              className={
                isDisabled ? "pointer-events-none text-gray-500" : "text-white"
              }
            >
              applications
            </Link>
            <Link
              to={`home/${auth.id}/contacts`}
              className={
                isDisabled ? "pointer-events-none text-gray-500" : "text-white"
              }
            >
              contacts
            </Link>
            <Link
              to={`home/${auth.id}/companies`}
              className={
                isDisabled ? "pointer-events-none text-gray-500" : "text-white"
              }
            >
              companies
            </Link>
            {/* <Link
              to="/lounge"
              className={
                isDisabled ? 'pointer-events-none text-gray-500' : 'text-white'
              }
            >
              lounge
            </Link>

            <Link
              to="/testroute"
              className={
                isDisabled ? 'pointer-events-none text-gray-500' : 'text-white'
              }
            >
              Test Route
            </Link> */}
          </>
        ) : (
          <>
            <Link
              to={`/home/${usersList[0].user_id}/applications`}
              className={
                isDisabled ? "pointer-events-none text-gray-500" : "text-white"
              }
            >
              applications
            </Link>
            <Link
              to={`home/${usersList[0].user_id}/contacts`}
              className={
                isDisabled ? "pointer-events-none text-gray-500" : "text-white"
              }
            >
              contacts
            </Link>
            <Link
              to={`home/${usersList[0].user_id}/companies`}
              className={
                isDisabled ? "pointer-events-none text-gray-500" : "text-white"
              }
            >
              companies
            </Link>
            <Link to={"/login"} className="block md:hidden text-white">
              login
            </Link>
            {/* <Link
              to="/lounge"
              className={
                isDisabled ? 'pointer-events-none text-gray-500' : 'text-white'
              }
            >
              lounge
            </Link>

            <Link
              to="/testroute"
              className={
                isDisabled ? 'pointer-events-none text-gray-500' : 'text-white'
              }
            >
              Test Route
            </Link> */}
          </>
        )}

        {/* <h2>companies applied to, contacts</h2> */}
        {/* <div>{useId}</div>
      <Login grabUseId={grabUseId} /> */}
        {location.pathname === "/signup" ? (
          <></>
        ) : (
          <div className="hidden md:block">
            <Login />
          </div>
        )}
      </div>
      {auth?.id?.length ? (
        ""
      ) : (
        <div className="bg-button1 w-full flex justify-center pt-0.5 pb-0.5">
          <p className="text-white text-xs text-center">
            You are logged in as {usersList[0]?.first_name}. Please login or
            create an account{" "}
            <span className="underline hover:text-button3">
              <Link to="/signup">here</Link>
            </span>{" "}
            to get the full site experience.
          </p>
        </div>
      )}

      {/* <div className="bg-button1 sticky bottom-0 align-middle w-full">
        {auth?.id?.length ? (
          <p className="mt-8">Welcome {usersList[0]?.first_name}</p>
        ) : (
          <p className="mt-8">Welcome {usersList[0]?.first_name}</p>
        )}
      </div> */}
    </div>
  );
};

export default Navbar;
