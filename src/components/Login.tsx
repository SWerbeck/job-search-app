import axios from '../../server/api/axios';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import useAuth from '../custom-hooks/useAuth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// make a schema using zod
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

type FormFields = z.infer<typeof schema>;

const Login = ({ grabUseId }) => {
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // register, handleSubmit, and formState come from React HF
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  // This from property might need to be utilized in navigate if issues later on
  // Protected routes tutorial 18 min mark
  // const from = location.state?.from?.pathname || '/';

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      // alert('are you sure you want to login?')
  
      const loggedInUser = await axios.post('/api/auth/login', {
        email: data.email,
        user_password: data.password,
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
      setError(error.response.data.error);
      console.log(error.response.data.error);
    }
  };

  const logout = async () => {
    const loggedOut = await axios.get('http://localhost:3000/api/auth/logout');
    setAuth({});
    setError('');
    reset();
    navigate('/');
    console.log(loggedOut.data.message);
  };
  return (
    <div>
      {/* if we dont have an accessToken bring us to the login page  */}
      {!auth.accessToken ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('email')} type="text" placeholder="email" />
          {error && <p className="text-white text-xs">{error}</p>}
          <input
            {...register('password')}
            type="password"
            placeholder="password"
          />
          <button disabled={isSubmitting} className="bg-button1 text-white">
            {isSubmitting ? 'Loading...' : 'Login'}
          </button>
        </form>
      ) : (
        // if we do have an accessToken we want to show the logout button
        <button onClick={logout} className="bg-white text-button1">
          Log out
        </button>
      )}
    </div>
  );
};

export default Login;
