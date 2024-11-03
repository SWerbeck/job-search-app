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
  job_title: z.string().min(2, {
    message: 'Please edit poisiton',
  }),
  companyName: z.string().min(1, {
    message: 'Please edit company name',
  }),
  contactName: z.string().min(1, {
    message: 'Please edit contactName',
  }),
});

type FormFields = z.infer<typeof schema>;

const EditCompanyCard = ({
  editMode,
  setEditMode,
  singleApplication,
  singleCompany,
  applicationId,
  companyId,
  contacts,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jobPosition = singleApplication.map((app) => app.Position);

  const [contactsLocalHook, setContactsLocalHook] = useState([]);

  const grabContInfoFromRedux = () => {
    // need to use map instead of forEach
    const info = contacts?.map((cont) => {
      // created an object bust changed CONTACT_ID to id and CONTACT_NAME to name
      return { id: cont.CONTACT_ID, name: cont.CONTACT_NAME };
    });
    // save info in local hook
    setContactsLocalHook(info);
  };

  useEffect(() => {
    grabContInfoFromRedux();
  }, []);

  console.log('local hook we just made', contactsLocalHook);
  //console.log('contacts from the edit', contacts);
  //console.log('from edit mode', singleApplication);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const editJobTitle = await axios.put(
        `/api/applications/${applicationId}`,
        {
          job_title: data.job_title,
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

  console.log('edit mode from editCompanycard', editMode);
  return (
    <>
      <button
        onClick={() => setEditMode(false)}
        className="bg-button2 text-mainbody"
      >
        Cancel
      </button>
      <h1>edit mode</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('companyName')}
          type="text"
          placeholder={singleCompany.company}
        />
        <input
          {...register('job_title')}
          type="text"
          placeholder={jobPosition}
        />

        {/* {contacts ? <input
          {...register('contactName')}
          type="text"
          placeholder={contacts[0].CONTACT_NAME}
        /> : <button>click here to add contact</button>} */}

        {contacts ? (
          contacts.map((contact) => (
            <input
              {...register('contactName')}
              type="text"
              placeholder={contact.CONTACT_NAME}
            />
          ))
        ) : (
          <button>click here to add contact</button>
        )}

        {errors.job_title && <div>{errors.job_title.message}</div>}
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </>
  );
};

export default EditCompanyCard;
