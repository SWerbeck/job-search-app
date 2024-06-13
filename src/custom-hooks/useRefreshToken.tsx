import axios from 'axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.get('/api/auth/refresh_token', {
      withCredentials: true,
    });
    console.log('4');
    setAuth((prev) => {
      console.log('prev state do i need json.stringify?', prev);
      console.log('from refresh token', response.data.accessToken);
      return { ...prev, accessToken: response.data.acessToken };
    });
    console.log('response data from broekennnnnn', response.data);
    //return response.data.tokens;
  };
  return refresh;
};

export default useRefreshToken;
