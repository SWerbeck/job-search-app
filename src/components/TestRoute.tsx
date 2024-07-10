import { Link } from 'react-router-dom';

const TestRoute = () => {
  return (
    <>
      <h1>Test Route</h1>
      <br />
      <p>This route is for testing jwt.</p>
      <>
        <Link to="/lounge">Go to lounge</Link>
      </>
    </>
  );
};

export default TestRoute;
