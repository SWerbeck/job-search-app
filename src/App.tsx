import Users from './components/Userscomponent';
import Companies from './components/Companiescomponent';
import './App.css';
import Navbar from './components/Navbar';

import Login from './components/Login';

import Applications from './components/Applicationscomponent';
import HomePage from './components/Homepage';
import { Route, Routes } from 'react-router-dom';
import GuestHome from './components/GuestHome';

function App() {
  // const fetchCompanys = async () => {
  //   try {
  //     const fetchedCompanys = await axios.get(
  //       'http://localhost:3000/api/companies'
  //     );
  //     //console.log('companies from app file', fetchedCompanys.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // useEffect(() => {
  //   fetchUsers();
  //   fetchCompanys();
  // }, []);

  // console.log(users, 'outside usestate hook');

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<GuestHome />} />
        <Route path="/home/:user_id" element={<HomePage />} />
        {/* <Applications />
        <HomePage /> */}
      </Routes>
    </>
  );
}

export default App;
