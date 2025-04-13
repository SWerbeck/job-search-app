import { Link } from "react-router-dom";
import useAuth from "../../custom-hooks/useAuth";
import { useSelector } from "react-redux";

const Companiescard = ({ companyName, companyId }) => {
  const { auth, setAuth } = useAuth();

  const usersList = useSelector((state: RootState) => state.users.users);
  return (
    <>
      {auth?.id?.length ? (
        <div className="bg-mainbody h-10 w-50 border-spacing-x-7 border border: mx-3 border-white">
          <Link to={`/home/${auth.id}/companies/${companyId}`}>
            <p className="text-white text-2xl mx-5">{companyName}</p>
          </Link>
          <div className="flex-auto items-end"></div>
        </div>
      ) : (
        <div className="bg-mainbody h-10 w-50 border-spacing-x-7 border border: mx-3 border-white">
          <Link to={`/home/${usersList[0].user_id}/companies/${companyId}`}>
            <p className="text-white text-2xl mx-5">{companyName}</p>
          </Link>
          <div className="flex-auto items-end"></div>
        </div>
      )}
    </>
  );
};

export default Companiescard;
