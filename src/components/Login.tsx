import axios from '../../server/api/axios';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import useAuth from '../custom-hooks/useAuth';

const Login = ({ grabUseId }) => {
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // This from property might need to be utilized in navigate if issues later on
  // Protected routes tutorial 18 min mark
  // const from = location.state?.from?.pathname || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const login = async () => {
    try {
      const loggedInUser = await axios.post('/api/auth/login', {
        email: email,
        user_password: password,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      const accessToken = loggedInUser?.data?.accessToken;
      //const refreshToken = loggedInUser?.data?.token?.refreshToken;
      const id = loggedInUser?.data?.id;
      const roles = loggedInUser?.data?.roles;

      setAuth({ id, roles: [roles], email, password, accessToken });
      //console.log('LOGGED IN USER DATA', loggedInUser?.data);
      grabUseId(`${loggedInUser?.data?.id}`);
      navigate(`/home/${loggedInUser?.data?.id}`);
    } catch (error) {
      setEmailError(error.response.data.error);
      console.log(error.response.data.error);
    }
  };

  const logout = async () => {
    const loggedOut = await axios.get('http://localhost:3000/api/auth/logout');
    setAuth({});
    navigate('/');
    console.log(loggedOut.data.message);
  };
  return (
    <div>
      {/* if we dont have an accessToken bring us to the login page  */}
      {!auth.accessToken ? (
        <>
          <h1 className="text-peach">Login page</h1>
          <input
            type="text"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            type="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <button onClick={login}>Log in</button>
          {emailError.length ? <p>{emailError}</p> : <p></p>}
        </>
      ) : (
        // if we do have an accessToken we want to show the logout button
        <button onClick={logout}>Log out</button>
      )}
    </div>
  );
};

export default Login;
