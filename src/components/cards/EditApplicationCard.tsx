import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from '../../../server/api/axios';
import { useNavigate } from 'react-router-dom';
import { editUserApp } from '../../store/userAppsSlice';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
  
// make a schema using zod
const schema = z.object({
    companyName: z.string().min(1, {
      message: 'Please edit company name',
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
        
          const onSubmit: SubmitHandler<FormFields> = async (data) => {
            try {
              const editJobTitle = await axios.put(
                `/api/companies/${companyId}`,
                {
                  companyName: data.companyName,
                  company_id: companyId,
                }
              );
              console.log('DATA FROM EDIT', data);
              dispatch(editUserApp({ applicationId, data }));
              setEditMode(false);
            } catch (error) {
              setError('root', {
                message: 'No application exists',
              });
            }
          };


  return (
    <div>edit application
         <button
        onClick={() => setEditMode(false)}
        className="bg-button2 text-mainbody"
      >
        Cancel
      </button>


      <button disabled={isSubmitting}>
          {isSubmitting ? 'Loading...' : 'Submit'}
        </button>
    </div>
  )
}
export default EditApplicationCard