import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setUsers } from '../store/userSlice';
import { RootState } from '../store';
import { setCompanies } from '../store/companiesSlice';
import Companiescard from './cards/Companiescard';

const Companies = () => {
  const dispatch = useDispatch();
  const companiesList = useSelector(
    (state: RootState) => state.companies.companies
  );
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchCompanies = async () => {
    try {
      const fetchedCompanies = await axios.get(
        'http://localhost:3000/api/companies'
      );
      dispatch(setCompanies(fetchedCompanies.data.companies));
      setIsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCompanies();
    console.log('companies ', companiesList);
  }, []);
  if (!isLoaded) {
    return <div>LOADING...</div>;
  }
  return (
    <div>
      <h2 className="bg-headline h-20 w-50 border-spacing-x-5 border border: mx-3 border-white grid place-content-center text-white text-4xl">
        COMPANIES
      </h2>
      <div>
        {companiesList.map((company) => {
          return (
            <Companiescard
              companyName={`${company.companyname}`}
              companyId={`${company.company_id}`}
            />
            // <div key={company.company_id}>
            //   <h1>{`${company.companyname}`}</h1>
            // </div>
          );
        })}
      </div>
    </div>
  );
};

export default Companies;
