import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useRefreshToken from '../custom-hooks/useRefreshToken';
import useAuth from '../custom-hooks/useAuth';

const PersistantLogin = () => {
  const [isLoading, setIsloading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        // reach out to endPoint, takes cookie with it, and reaches out to endPoint before reachine RequireAuth component
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        // will always setIsLoading to false to not end up in an endless loop
        setIsloading(false);
      }
    };
    /* only runs this verifyRefreshToken function if we dont have an access token. 
    Remember when we refresh or leave the page the auth state will be empty. We don't want to hit the refresh backend route 
    everytime we need access to a requested page. Only want this to run when we dont have an accessToken.  */
    !auth?.accessToken ? verifyRefreshToken() : setIsloading(false);
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`authToken: ${JSON.stringify(auth?.accessToken)}`);
  }, [isLoading]);

  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistantLogin;
