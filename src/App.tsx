import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Applications from './components/Applicationscomponent';
import HomePage from './components/Homepage';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import PersistantLogin from './components/PersistantLogin';
import { Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import TestRoute from './components/TestRoute';
import Lounge from './components/Lounge';
import Singleapplicationcomponent from './components/Singleapplicationcomponent';
import Contacts from './components/Contactscomponent';
import Companies from './components/Companiescomponent';
import Colortest from './components/Colortestcomponent';
import SingleCompany from './components/SingleCompany';
import ApplicationForm from './components/ApplicationForm';
import { ToastContainer, toast } from 'react-toastify';
import { useDisable } from './context/DisableContext';

function App() {
  const { isDisabled, setIsDisabled } = useDisable();

  if (toast.isActive('confirmation-toast')) {
    setIsDisabled(true); // Disable everything
  }
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/testroute" element={<TestRoute />} />
          <Route
            path="/home/:user_id/applications/:applied_id"
            element={<Singleapplicationcomponent />}
          />
          <Route
            path="/home/:user_id/applications/addapplications"
            element={<ApplicationForm />}
          />
          <Route path="/unauthorized" element={<Unauthorized />} />
          {/* These are protected routes */}
          <Route element={<PersistantLogin />}>
            <Route element={<RequireAuth allowedRoles={['User']} />}>
              <Route path="/lounge" element={<Lounge />} />
              <Route path="/home/:user_id" element={<HomePage />} />
              <Route
                path="/home/:user_id/applications/:applied_id"
                element={<Singleapplicationcomponent />}
              />
              <Route path="/home/:user_id/contacts" element={<Contacts />} />
              <Route path="/home/:user_id/companies" element={<Companies />} />

              <Route
                path="/home/:user_id/applications"
                element={<Applications />}
              />
              <Route
                path="/home/:user_id/applications/addapplications"
                element={<ApplicationForm />}
              />
              <Route
                path="/home/:user_id/companies/:company_id"
                element={<SingleCompany />}
              />
            </Route>
          </Route>

          {/* catch all */}
          <Route path="/*" element={<Missing />} />
        </Route>
      </Routes>
      <Colortest />
    </>
  );
}

export default App;
