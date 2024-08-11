import axios from '../../server/api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.get('/api/auth/refresh_token', {
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log('prev state ---->', prev);
      // taking previous state and overriding the accessTpken with the refresh endpoint
      return {
        ...prev,
        id: response.data.id,
        roles: [response.data.roles],
        accessToken: response.data.accessToken,
      };
    });
    console.log('response data from refresh', response.data);
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
