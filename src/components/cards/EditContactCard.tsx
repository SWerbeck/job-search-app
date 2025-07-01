import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "../../../server/api/axios";
import { useNavigate } from "react-router-dom";

// needed for the select to map over later in the form
const allowedOptions = ["has not replied", "replied"] as const;

// make a schema using zod
const schema = z.object({
  contactName: z.string().min(1, {
    message: "Please edit the contacts name",
  }),
  linkedin: z
    .string()
    .optional()
    .refine((val) => !val || val.trim().endsWith(".com"), {
      message: "LinkedIn must end in .com or be left blank.",
    }),
  phone: z.string().optional(),
  email: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val ||
        (z.string().email().safeParse(val).success && val.endsWith(".com")),
      {
        message:
          "Email must be a valid address ending in .com or be left blank.",
      }
    ),
  repliedSelectOption: z.enum(allowedOptions, {
    errorMap: (issue, ctx) => {
      return { message: "Please select a valid option." };
    },
  }),
});

type FormFields = z.infer<typeof schema>;

const EditContactCard = ({
  editMode,
  setEditMode,
  filteredContact,
  setSingleContact,
  singleContact,
}) => {
  const navigate = useNavigate();

  console.log("from the edit componenet!", filteredContact);

  const contactId = filteredContact[0].contact_id;
  console.log("should get the id from edit", contactId);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      console.log("DATA FROM EDIT", data);
      const editContact = await axios.put(`/api/contacts/${contactId}`, {
        CONTACTNAME: data.contactName,
        CONTACT_LINKEDIN: data.linkedin,
        CONTACT_PHONE: data.phone,
        CONTACT_EMAIL: data.email,
        reply_status: data.repliedSelectOption,
      });
      console.log("DATA FROM EDIT", data);
      setSingleContact((prevContacts) =>
        prevContacts.map((contact) =>
          contact.contact_id === contactId
            ? {
                ...contact,
                contactname: data.contactName,
                contact_linkedin: data.linkedin,
                contact_phone: data.phone,
                contact_email: data.email,
                reply_status: data.repliedSelectOption,
              }
            : contact
        )
      );
      //   dispatch(editCompanyName({ applicationId, data }));
      setEditMode(false);
    } catch (error) {
      setError("root", {
        message: "No application exists",
      });
    }
  };

  //   console.log('edit mode from editCompanycard', editMode);
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
          {...register("contactName")}
          type="text"
          placeholder={filteredContact[0].contactname}
          defaultValue={filteredContact[0].contactname}
        />
        <input
          {...register("linkedin")}
          type="text"
          placeholder={filteredContact[0].contact_linkedin}
          //   defaultValue={filteredContact[0].contact_linkedin}
        />
        {errors.linkedin && (
          <div className="flex justify-center items-center">
            <p className="text-xs text-button4">{errors.linkedin.message}</p>
          </div>
        )}
        <input
          {...register("phone")}
          type="text"
          placeholder={filteredContact[0].contact_phone}
        />
        <input
          {...register("email")}
          type="text"
          placeholder={filteredContact[0].contact_email}
        />
        {errors.email && (
          <div className="flex justify-center items-center">
            <p className="text-xs text-button4">{errors.email.message}</p>
          </div>
        )}
        <select {...register("repliedSelectOption")}>
          {allowedOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.repliedSelectOption && (
          <span>{errors.repliedSelectOption.message}</span>
        )}
        <button
          disabled={isSubmitting}
          className="bg-button2 text-white px-4 py-2 rounded-md w-40 mb-10"
        >
          {isSubmitting ? "Loading..." : "Submit"}
        </button>
      </form>
    </>
  );
};

export default EditContactCard;
