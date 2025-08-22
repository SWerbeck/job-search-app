import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { RootState } from "../store";
import { deleteUserApps } from "../store/userAppsSlice";
import useRefreshToken from "../custom-hooks/useRefreshToken";
import useAxiosPrivate from "../custom-hooks/useAxiosPrivate";
import useAuth from "../custom-hooks/useAuth";
import axios from "../../server/api/axios";

const Applications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, setAuth } = useAuth();

  const from = location.state?.from?.pathname || "/login";

  const usersList = useSelector((state: RootState) => state.users.users);
  const userApplications = useSelector(
    (state: RootState) => state.userApps.userApps
  );

  //sorting alphabetically by company name
  const sortUserApps = [...userApplications].sort((a, b) =>
    a.COMPANYNAME.localeCompare(b.COMPANYNAME)
  );

  const [loaded, setIsLoaded] = useState(false);
  const userId = usersList[0]?.user_id;

  const axiosPrivate = useAxiosPrivate();
  const refresh = useRefreshToken();

  useEffect(() => {}, [userApplications]);

  // if (!loaded) {
  //   return <div>LOADING...</div>;
  // }

  console.log("from aplications for adding", userId);

  console.log("FROM ALL APPS", userApplications);

  const applicationData = sortUserApps?.map((userApp) => (
    <div key={userApp?.company_id}>
      <ul className=" bg-headline text-white h-10 w-50 border-spacing-x-7 border mx-3 border-white grid place-content-left content-center p-10 mt-10 rounded-xl  text-center text-2xl xs:text-3xl sm:text-4xl md:text-left">
        {userApp?.COMPANYNAME}
      </ul>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mx-3 mt-10 gap-x-4 gap-y-8">
        {userApp?.applications?.map((app) => {
          const appliedDate = new Date(app?.Applied_Date); // Create a single Date instance

          return (
            <div
              key={app?.Application_ID}
              className="bg-gray-100 border-spacing-x-5 mx-3 place-content-center p-20 drop-shadow-lg rounded-xl"
            >
              <div className="flex justify-center items-center pb-2 text-2xl sm:text-2xl md:text-3xl lg:text-4xl">
                {/* Job Title */}
                <p className="text-center">{app?.Position}</p>
              </div>
              <div className="flex justify-center items-center pb-4">
                <p className="sm:text-sm md:text-md lg:text-lg">
                  {/* Date applied*/}
                  {appliedDate.toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
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
                <Link to={`${location.pathname}/${app.Application_ID}`}>
                  <button className="bg-button1 text-white text-base p-2">
                    More info
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ));

  const appData = userApplications?.map((userApp) =>
    userApp?.applications?.map((app) => app.Position)
  );

  return (
    <div className="grid place-content-center">
      <Link
        to={`/home/${userId}/applications/addapplications`}
        className="mx-auto"
      >
        {/* <Link
        to={`/home/${auth.id}/applications/addapplications`}
        className="mx-auto"
      > */}
        <button className="bg-button1 text-white">Add new Application</button>
      </Link>
      <div className="h-20 w-50 border-spacing-x-5 border border: mx-3 border-white grid place-content-center mt-8 text-2xl sm:text-4xl">
        Applications
      </div>
      {applicationData}
      {/* {userApplications.map((userApp) => {
        return <div key={userApp?.company_id}></div>;
      })} */}
    </div>
  );
};

export default Applications;
