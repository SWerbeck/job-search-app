import { Link } from 'react-router-dom';

const Lounge = () => {
  return (
    <>
      <h1>Lounge Route</h1>
      <br />
      <p>WELCOME TO THE LOUNGE.</p>
      <>
        <Link to="/testroute">go to test route</Link>
      </>
    </>
  );
};

export default Lounge;
