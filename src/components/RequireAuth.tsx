import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../custom-hooks/useAuth';
import GuestHome from './GuestHome';

// const RequireAuth = ({ allowedRoles }) => {
//   const { auth } = useAuth();
//   const location = useLocation();

//   return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
//     <Outlet />
//   ) : (
//      <Navigate to="/unauthorized" state={{ from: location }} replace />
//   );
// };
const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : (
    <GuestHome />
  );
  // return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
  //   <Outlet />
  // ) : (
  //    <Navigate to="/unauthorized" state={{ from: location }} replace />
  // );
};

export default RequireAuth;
