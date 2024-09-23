import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const SingleCompany = () => {
  const { company_id } = useParams();
  const userApplications = useSelector(
    (state: RootState) => state.userApps.userApps
  );
  // here lets try to figure out some logic where if data = null we can run a fetch request,
  // otherwise we can just filter from the userApplications
  // currently unless you click on the application route in the navbar the data will be null
  // need to be concerned about an infinite loop
  // maybe having a useEffect that runs only once can help with that.
  console.log('from single component', company_id);
  console.log('from single component', userApplications);

  return (
    <section>
      <h1>This is thr single company page</h1>
      <h2></h2>
    </section>
  );
};

export default SingleCompany;
