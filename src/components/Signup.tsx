import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "../../server/api/axios";
import { useNavigate } from "react-router-dom";

// make a schema using zod
const schema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
  email: z.string().email(),
  userName: z.string().min(6, {
    message: "Username must be at least 6 characters",
  }),
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
  const navigate = useNavigate();

  // register, handleSubmit, and formState come from React HF
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      //await new Promise((resolve) => setTimeout(resolve, 1000));
      //throw new Error();
      const createUser = await axios.post("/api/users", {
        firstName: data.firstName,
        lastName: data.lastName,
        user_password: data.password,
        email: data.email,
        userName: data.userName,
      });
      console.log(data);
      navigate("/");
    } catch (error) {
      setError("root", {
        message: "Username or Email already exists",
      });
    }
  };
  return (
    <div className="flex justify-center items-center mb-20 mt-20">
      <div className="justify-center items-center xs:w-full xs:ml-7 xs:mr-7 sm:w-full sm:ml-14 sm:mr-14 md:ml-28 md:mr-28 lg:ml-48 lg:mr-48 xl:ml-96 xl:mr-96">
        <div className="bg-button2 rounded-tl-xl rounded-tr-xl rounded-br-sm rounded-bl-sm h-16 flex justify-center items-center drop-shadow-lg">
          <h1 className="text-xl text-white">Sign up</h1>
        </div>
        {/* className="flex items-center flex-col justify-center text-center" */}
        <div className="rounded-br-xl rounded-bl-xl pb-10 drop-shadow-lg bg-gray-100">
          <form className="h-96" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-center items-center pt-12 xl:pl-10 xl:pr-10">
              <input className="md:w-80"
                {...register("firstName")}
                type="text"
                placeholder="first name"
              />
            </div>
            {errors.firstName && (
              <div className="flex justify-center items-center">
                <p className="text-xs text-button4">{errors.firstName.message}</p>
              </div>
            )}
            <div className="flex justify-center items-center mt-6 xl:pl-10 xl:pr-10">
              <input className="md:w-80"
                {...register("lastName")}
                type="text"
                placeholder="last name"
              />
            </div>
            {errors.lastName && (
              <div className="flex justify-center items-center">
                <p className="text-xs text-button4">{errors.lastName.message}</p>
              </div>
            )}
            <div className="flex justify-center items-center mt-6 xl:pl-10 xl:pr-10">
              <input className="md:w-80"
                {...register("password")}
                type="password"
                placeholder="password"
              />
            </div>
            <div className="flex justify-center items-center">
              {errors.password && (
                <p className="text-xs text-button4">{errors.password.message}</p>
              )}
            </div>
            <div className="flex justify-center items-center mt-6 xl:pl-10 xl:pr-10">
              <input {...register("email")} type="text" placeholder="email"className="md:w-80" />
            </div>
            {errors.email && (
              <div className="flex justify-center items-center">
                <p className="text-xs text-button4">{errors.email.message}</p>
              </div>
            )}
            <div className="flex justify-center items-center mt-6 xl:pl-10 xl:pr-10">
              <input className="md:w-80"
                {...register("userName")}
                type="text"
                placeholder="username"
              />
            </div>
            {errors.userName && (
              <div className="flex justify-center items-center">
                <p className="text-xs text-button4">{errors.userName.message}</p>
              </div>
            )}
            {errors.root && (
              <div className="flex justify-center items-center">
                {errors.root.message}
              </div>
            )}
            <div className="flex justify-center items-center mt-6">
              <button disabled={isSubmitting} className="bg-button1 text-white">
                {isSubmitting ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
