import axios from 'axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  console.log('1');
  const { setAuth } = useAuth();
  console.log('2');
  const refresh = async () => {
    console.log('3');
    const response = await axios.get(
      'http://localhost:3000/api/auth/refresh_token',
      {
        withCredentials: false,

        //headers: { 'Content-Type': 'application/json' },
        //refreshToken: setAuth.accessToken,
      }
    );
    console.log('4');
    setAuth((prev) => {
      console.log('prev state do i need json.stringify?', prev);
      //console.log('from refresh token', response.data.token.accessToken);
      return { ...prev, accessToken: response.data.acessToken };
    });
    console.log('response data from broekennnnnn', response.data);
    //return response.data.tokens;
  };
  return refresh;
};

export default useRefreshToken;
