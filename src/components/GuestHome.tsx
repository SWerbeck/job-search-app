import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from './Signup';
import TestRoute from './TestRoute';
import Contacts from './Contactscomponent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import HomePage from './Homepage';
import Applications from './Applicationscomponent';
import Companies from './Companiescomponent';
import SingleCompany from './SingleCompany';

const GuestHome = () => {
  const dispatch = useDispatch();
  const usersList = useSelector((state: RootState) => state.users.users);
  const [isLoaded, setIsLoaded] = useState(false);

  const guestId = usersList[0].user_id;

  useEffect(() => {
    // fetchGuestId();
  }, []);

  // useEffect(() => {
  //   fetchUserInfo();
  // }, [guestId]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home/:user_id/applications" element={<Applications />} />
        <Route path={`/home/:guestId/contacts`} element={<Contacts />} />
        <Route path={`/home/:guestId/companies`} element={<Companies />} />
        <Route path={`/home/:guestId/companies/:companyId`} element={<SingleCompany />} />

        <Route path="/testroute" element={<TestRoute />} />
      </Routes>
    </div>
  );
};

export default GuestHome;
