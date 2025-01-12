import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from '../../../server/api/axios';
import { useNavigate } from 'react-router-dom';
import { editAppInfo } from '../../store/userAppsSlice';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
  
// make a schema using zod
const schema = z.object({
    job_title: z.string().min(1, {
      message: 'Please edit job title',
    }),
  });
  
  type FormFields = z.infer<typeof schema>;


  const  EditApplicationCard = ( {
    singleApp,
    contactsList,
    editMode,
    setEditMode}) => {
        
    const navigate = useNavigate();
    const dispatch = useDispatch();

        const {
            register,
            handleSubmit,
            setError,
            formState: { errors, isSubmitting },
          } = useForm<FormFields>({ resolver: zodResolver(schema) });
        

const appId = singleApp?.Application_ID

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const editJobTitle = await axios.put(`/api/applications/${appId}`, {
        job_title: data.job_title,
        applicationId: singleApp.Application_ID,
      });
      console.log('DATA FROM EDIT', data);
      dispatch(editAppInfo({ appId, data }));
      setEditMode(false);
    } catch (error) {
      setError('root', {
        message: 'No application exists',
      });
    }
  };


  return (
    <div>
      {/* <p>{singleApp?.Position}</p> */}
         <button
        onClick={() => setEditMode(false)}
        className="bg-button2 text-mainbody"
      >
        Cancel
      </button>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('job_title')}
          type="text"
          placeholder={singleApp?.Position}
        />
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}
export default EditApplicationCard