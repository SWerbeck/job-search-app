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

function App() {
  return (
    <>
    
      <Navbar />
   
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Layout />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/testroute" element={<TestRoute />} />
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
            </Route>
          </Route>

          {/* catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
      <Colortest />
    </>
  );
}

export default App;
