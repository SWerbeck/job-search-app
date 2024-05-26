import Users from './components/Userscomponent';
import Companies from './components/Companiescomponent';
import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';

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

      <>
        <Login />
        <Users />
        <Companies />
      </>
    </>
  );
}

export default App;
