import { useState } from 'react';
import Login from './Login';

const Navbar = () => {
  // const [hasToken, setHastoken] useState = (false)

  // useEffect(() => {
  //   fetchuserinfo();
  // }, [hasToken]);

  return (
    <>
      {/* <Login hasToken={hasToken}/> */}
      <Login />
      applications, companies applied to, contacts
    </>
  );
};

export default Navbar;
