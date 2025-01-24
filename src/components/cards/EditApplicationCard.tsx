import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from '../../../server/api/axios';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import { editAppInfo } from '../../store/userAppsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { deleteUserApps } from '../../store/userAppsSlice';
import useAxiosPrivate from '../../custom-hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDisable } from '../../context/DisableContext';

  
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
    const usersList = useSelector((state: RootState) => state.users.users);
      

        const {
            register,
            handleSubmit,
            setError,
            formState: { errors, isSubmitting },
          } = useForm<FormFields>({ resolver: zodResolver(schema) });
        

const appId = singleApp?.Application_ID
const userId = usersList[0]?.user_id;
const axiosPrivate = useAxiosPrivate();
const { isDisabled, setIsDisabled } = useDisable();


const [toastId, setToastId] = useState<string | number | null>(null);

const handleConfirm = () => {
  // Perform the action you want on confirmation
  toast.dismiss(toastId);
  deleteApplication(appId)
  // Enable interactions again
    console.log('Confirmed!');
};

const handleCancel = () => {
  // Do nothing or handle the cancellation
  toast.dismiss(toastId);
  setToastId(null); // Enable interactions again
  console.log('Cancelled!');
  
};

const showConfirmationToast = () => {
  if (!toastId || !toast.isActive(toastId)) {
    setIsDisabled(true)
    const id = toast.info(
      <div>
        <p>Are you sure?</p>
        <button onClick={handleConfirm}>Yes</button>
        <button onClick={handleCancel}>No</button>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        pauseOnHover: false,
        onClose: () => setIsDisabled(false)
      }
    );
    setToastId(id); // Correct type now matches
  }
};

const deleteApplication = async (appId: string) => {
  try {
    const applicationToDelete = await axiosPrivate.delete(
      `/api/applications/${appId}`
    );
    dispatch(deleteUserApps(appId));
    setToastId(null); 
    navigate(`/home/${userId}/applications`);
  } catch (err) {
    console.log(err.response.data);
    setToastId(null); 
    navigate('/', { state: { from: location }, replace: true });
  }
};

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
        {toastId ? <button
        disabled
        className="bg-button3 text-mainbody"
      >
        Cancel
      </button> : <button
        onClick={() => setEditMode(false)}
        className="bg-button3 text-mainbody"
      >
        Cancel
      </button>}
      <button className="bg-button1 text-white"
        onClick={showConfirmationToast} 
        // deleteApplication(appId)
        disabled={isSubmitting}>
          {isSubmitting ? 'Loading...' : 'Delete Application'}
        </button>
        
        
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('job_title')}
          type="text"
          placeholder={singleApp?.Position}
        />
        {toastId ? <button className="bg-button2 text-white" disabled>
          Submit
        </button> :  <button className="bg-button2 text-white" disabled={isSubmitting}>
          {isSubmitting ? 'Loading...' : 'Submit'}
        </button>}
       
        
      </form>
      
    </div>
  )
}
export default EditApplicationCard