import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from '../../../server/api/axios'
import { useNavigate  } from 'react-router-dom';
import { editUserApp } from '../../store/userAppsSlice';
import { useDispatch } from 'react-redux';




// make a schema using zod
const schema = z.object({
  job_title: z
    .string()
    .min(2, {
      message: 'Please edit poisiton',
    }),
});

type FormFields = z.infer<typeof schema>;


const EditCompanyCard = ({editMode, setEditMode, applicationId, jobPosition}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const editJobTitle = await axios.put(`/api/applications/${applicationId}`, {
      job_title: data.job_title,
      });
      console.log(data);
      dispatch(editUserApp({applicationId, data}))
      setEditMode(false)
    } catch (error) {
      setError('root', {
        message: 'No application exists',
      });
    }
  };

  console.log('edit mode from editCompanycard',editMode)
    return (
        <>
        <button onClick={()=> setEditMode(false)} className="bg-button2 text-mainbody">Cancel</button>
       <h1>edit mode</h1>
       <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('job_title')}
          type="text"
          placeholder={jobPosition}
        />
        {errors.job_title && <div>{errors.job_title.message}</div>}
        <button disabled={isSubmitting} >
          {isSubmitting ? 'Loading...' : 'Submit'}
        </button>
      </form>
        </>
      );

}



export default EditCompanyCard;
