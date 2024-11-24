import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { RootState } from '../store';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useAxiosPrivate from '../custom-hooks/useAxiosPrivate';
import useAuth from '../custom-hooks/useAuth';
import { addUserApp } from '../store/userAppsSlice';
import axios from '../../server/api/axios';

// //Needed for api route
// //job_title,
// //company_id,
// //user_id,
// //application_info,

const schema = z.object({
  job_title: z.string().min(2, {
    message: 'Job title is required and must be at least 2 characters',
  }),
  company_id: z.nullable(z.string()),
  application_info: z.string().min(2, {
    message: 'Application info is required and must be at least 2 characters',
  }),
  // newCompanyName: z.string().min(2, {
  //   message: 'New company info is required and must be at least 2 characters',
  // }),
  newCompanyName: z.nullable(z.string()),
});

type FormFields = z.infer<typeof schema>;

const ApplicationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, setAuth } = useAuth();
  const [ newCompany, setNewCompany ] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const from = location.state?.from?.pathname || '/login';

  const usersList = useSelector((state: RootState) => state.users.users);
  const userApplications = useSelector(
    (state: RootState) => state.userApps.userApps
  );

  const axiosPrivate = useAxiosPrivate();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log("from submit company_id ", data.company_id)
    console.log("from submit new company name ", data.newCompanyName)
    try {
      const createApp = await axios.post('/api/applications', {
        
        job_title: data.job_title,
        companyName: data.newCompanyName,
        company_id: data.company_id || null,
        user_id: auth.id,
        application_info: data.application_info,
      });
      dispatch(addUserApp({ appData: createApp.data.newApp, data }));
      navigate(`/home/${auth.id}/applications`);
    } catch (error) {
      setError('root', {
        message: 'Oops please try again',
      });
    }
  };
  
  useEffect(() => {}, []);

  return (
    <div>
      <h1>Application form page</h1>

      <form onSubmit={handleSubmit(onSubmit)}>

        <input {...register('job_title')} type="text" placeholder="job title" />
        {errors.job_title && <div>{errors.job_title.message}</div>}
        <select {...register('company_id')} 
        onChange={(event) => {
              setNewCompany(event.target.value);
            }}>
          {userApplications?.map((app, idx) => (
            <option key={idx} value={app.company_id} {...register('newCompanyName', {setValueAs: app.company})}>
              {app.company}
            </option>
            
          ))}
          {<option value={"0"}> add new</option>}
        </select>
       {newCompany == "0" ?  <input
          {...register('newCompanyName')}
          type="text"
          placeholder="New Company Name"
        /> : <></>}
        <input
          {...register('application_info')}
          type="text"
          placeholder="Application info"
        />
        {errors.application_info && (
          <div>{errors.application_info.message}</div>
        )}
        <button
          className="bg-button1 text-white"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default ApplicationForm;
