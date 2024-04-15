import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { setUsers } from '../store/userSlice';
import { RootState } from '../store';
import { setCompanies } from '../store/companiesSlice';


const Companies = () => {

  const dispatch = useDispatch();
  const companiesList  = useSelector((state: RootState) => state.companies.companies);
  const [isLoaded, setIsLoaded] = useState(false)

  const fetchCompanies = async () => {
    try {
      
      const fetchedCompanies = await axios.get('http://localhost:3000/api/companies');
      dispatch(setCompanies(fetchedCompanies.data.companies));
      setIsLoaded(true)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);
console.log("companies ", companiesList)
  if (!isLoaded){
  return <div>loading</div>
}
  return (
    <div>
      <div>
        {companiesList.map((company) => {
          return (
            
            <div key={company.company_id}>
              <h1>{`${company.companyname}`}</h1>
              <h3>{`${company.website}`}</h3>
            
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Companies;
