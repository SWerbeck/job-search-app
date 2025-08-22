import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "../../../server/api/axios";
import { useNavigate } from "react-router-dom";
import { editCompanyName } from "../../store/userAppsSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// make a schema using zod
const schema = z.object({
  companyName: z.string().min(1, {
    message: "Please edit company name",
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
  const usersList = useSelector((state: RootState) => state.users.users);

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

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      console.log("DATA FROM EDIT COMPANY", data);
      const editJobTitle = await axios.put(`/api/companies/${companyId}`, {
        companyName: data.companyName,
        company_id: companyId,
        company_website: data.company_website,
      });
      dispatch(editCompanyName({ applicationId, data }));
      setEditMode(false);
    } catch (error) {
      setError("root", {
        message: "No application exists",
      });
    }
  };

  console.log("edit mode from editCompanycard", editMode);
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
          {...register("companyName")}
          type="text"
          placeholder={singleCompany.company}
        />
        <button disabled={isSubmitting}>
          {isSubmitting ? "Loading..." : "Submit"}
        </button>
      </form>
    </>
  );
};

export default EditCompanyCard;
