import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// make a schema using zod
const schema = z.object({
  firstName: z.string().min(2, {
    message: 'First name is required and must be at least 2 characters',
  }),
  lastName: z
    .string()
    .min(2, {
      message: 'Last name is required and must be at least 2 characters',
    }),
  password: z.string().min(8),
  email: z.string().email(),
  userName: z.string().min(6),
});

type FormFields = z.infer<typeof schema>;

// TS defining the form without zod
// type FormFields = {
//   firstName: string;
//   lastName: string;
//   password: string;
//   email: string;
//   userName: string;
// };

const Signup = () => {
  // register, handleSubmit, and formState come from React HF
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error();
      console.log(data);
    } catch (error) {
      setError('root', {
        message: 'you already have an account',
      });
    }
  };
  return (
    <>
      <h1>Sign up below</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('firstName')}
          type="text"
          placeholder="first name"
        />
        {errors.firstName && <div>{errors.firstName.message}</div>}
        <input {...register('lastName')} type="text" placeholder="last name" />
        {errors.lastName && <div>{errors.lastName.message}</div>}
        <input
          {...register('password')}
          type="password"
          placeholder="password"
        />
        {errors.password && <div>{errors.password.message}</div>}
        <input {...register('email')} type="text" placeholder="email" />
        {errors.email && <div>{errors.email.message}</div>}

        <input {...register('userName')} type="text" placeholder="username" />
        {errors.userName && <div>{errors.userName.message}</div>}
        {errors.root && <div>{errors.root.message}</div>}

        <button disabled={isSubmitting}>
          {isSubmitting ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </>
  );
};

export default Signup;
