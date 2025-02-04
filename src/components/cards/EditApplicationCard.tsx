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
  application_info: z.string().min(1, {
    message: 'Please edit info title',
  }),
  Status: z.string().min(1, {
    message: 'Please select a status',
  }),
  Company_Website: z.string(),
});

type FormFields = z.infer<typeof schema>;

const EditApplicationCard = ({
  singleApp,
  contactsList,
  editMode,
  setEditMode,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usersList = useSelector((state: RootState) => state.users.users);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const appId = singleApp?.Application_ID;
  const userId = usersList[0]?.user_id;
  const axiosPrivate = useAxiosPrivate();
  const { isDisabled, setIsDisabled } = useDisable();

  const [toastId, setToastId] = useState<string | number | null>(null);

  const handleConfirm = () => {
    // Perform the action you want on confirmation
    toast.dismiss(toastId);
    deleteApplication(appId);
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
      setIsDisabled(true);
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
          onClose: () => setIsDisabled(false),
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
        application_info: data.application_info,
        application_status: data.Status,
        WEBSITE: data.Company_Website,
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

  console.log('duuuun', singleApp);

  return (
    <div className="grid place-items-center">
      <div className="flex space-x-4 pb-4">
        {toastId ? (
          <button
            disabled
            className="bg-button3 text-mainbody px-6 py-2 rounded-md w-40 text-center"
          >
            Cancel
          </button>
        ) : (
          <button
            onClick={() => setEditMode(false)}
            className="bg-button3 text-mainbody px-6 py-2 rounded-md w-40 text-center"
          >
            Cancel
          </button>
        )}
        <button
          className="bg-button1 text-white text-center"
          onClick={showConfirmationToast}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Loading...' : 'Delete Application'}
        </button>
      </div>

      {/* Centering the entire form section */}
      <div className="flex flex-col items-center justify-center text-center">
        <div>
          <h3 className="text-lg font-semibold mb-4 pt-5">
            Edit Application for {singleApp?.company_name}
          </h3>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            {/* Label-Input Pair */}
            <div className="flex items-center justify-center">
              <label className="text-gray-700 text-sm font-bold w-32 text-right mr-4">
                Job Title:
              </label>
              <input
                className="bg-mainbody p-2 border rounded-md w-64"
                {...register('job_title')}
                type="text"
                defaultValue={singleApp?.Position}
                placeholder={singleApp?.Position}
              />
            </div>

            {/* Label-Select Pair */}
            <div className="flex items-center justify-center">
              <label className="text-gray-700 text-sm font-bold w-32 text-right mr-4">
                Status:
              </label>
              <select
                {...register('Status')}
                defaultValue={singleApp?.Status}
                className="p-2 border rounded-md w-64 bg-mainbody"
              >
                <option value="active">Active</option>
                <option value="interviewing">Interviewing</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            {/* Label-Input Pair */}
            <div className="flex items-center justify-center">
              <label className="text-gray-700 text-sm font-bold w-32 text-right mr-4">
                App Info:
              </label>
              <input
                className="bg-mainbody p-2 border rounded-md w-64"
                {...register('application_info')}
                type="text"
                placeholder={singleApp?.application_info}
                defaultValue={singleApp?.application_info}
              />
            </div>

            {/* Label-Input Pair */}
            <div className="flex items-center justify-center">
              <label className="text-gray-700 text-sm font-bold w-32 text-right mr-4">
                Company Website:
              </label>
              <input
                className="bg-mainbody p-2 border rounded-md w-64"
                {...register('Company_Website')}
                type="text"
                placeholder={singleApp?.Company_Website}
                defaultValue={singleApp?.Company_Website}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-5">
              {toastId ? (
                <button
                  className="bg-button2 text-white p-2 w-64 rounded-md"
                  disabled
                >
                  Submit
                </button>
              ) : (
                <button
                  className="bg-button2 text-white px-4 py-2 rounded-md w-40 mb-10"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Loading...' : 'Submit'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default EditApplicationCard;
