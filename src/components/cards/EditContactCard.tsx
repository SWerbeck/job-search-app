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
    message: "Names can not be blank",
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
    <div className="grid place-items-center mt-16 mb-20">
      <div className="bg-gray-100 drop-shadow-lg rounded-xl xs:w-full sm:w-full md:w-3/4 lg:w-1/2">
        <div className="bg-button2 rounded-tl-xl rounded-tr-xl rounded-br-sm rounded-bl-sm inset-x-0 top-0 flex justify-center items-center drop-shadow-lg mb-10">
          <h3 className="text-xl text-white font-semibold mb-8 pt-5">
            Edit contact for {filteredContact[0].contactname}
          </h3>
        </div>

        <div className="flex flex-col items-center justify-center text-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <div className="flex items-center justify-center">
              <label className="text-gray-700 text-md font-bold w-32 text-center">
                Name:
              </label>
              <div className="flex flex-col w-64">
                <input
                  {...register("contactName")}
                  type="text"
                  className="bg-mainbody p-2 border rounded-md w-64"
                  placeholder={filteredContact[0].contactname}
                  defaultValue={filteredContact[0].contactname}
                />
                {errors.contactName && (
                  <div className="flex justify-center items-center">
                    <p className="text-red-500 text-xs">
                      {errors.contactName.message}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <label className="text-gray-700 text-md font-bold w-32 text-center">
                Linkedin url:
              </label>
              <div className="flex flex-col w-64">
                <input
                  {...register("linkedin")}
                  type="text"
                  className="bg-mainbody p-2 border rounded-md w-64"
                  placeholder={filteredContact[0].contact_linkedin}
                  defaultValue={filteredContact[0].contact_linkedin}
                />
                {errors.linkedin && (
                  <div className="flex justify-center items-center">
                    <p className="text-red-500 text-xs">
                      {errors.linkedin.message}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <label className="text-gray-700 text-md font-bold w-32 text-center">
                Contact phone:
              </label>
              <div className="flex flex-col w-64">
                <input
                  {...register("phone")}
                  type="text"
                  className="bg-mainbody p-2 border rounded-md w-64"
                  placeholder={filteredContact[0].contact_phone}
                />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <label className="text-gray-700 text-md font-bold w-32 text-center">
                Contact email:
              </label>
              <div className="flex flex-col w-64">
                <input
                  {...register("email")}
                  type="text"
                  className="bg-mainbody p-2 border rounded-md w-64"
                  placeholder={filteredContact[0].contact_email}
                  defaultValue={filteredContact[0].contact_email}
                />
                {errors.email && (
                  <div className="flex justify-center items-center">
                    <p className="text-red-500 text-xs">
                      {errors.email.message}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <label className="text-gray-700 text-md font-bold w-32 text-center">
                Status:
              </label>
              <div className="flex flex-col w-64">
                <select
                  {...register("repliedSelectOption")}
                  className="p-2 border rounded-md w-64 bg-mainbody"
                >
                  {allowedOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.repliedSelectOption && (
                  <span>{errors.repliedSelectOption.message}</span>
                )}
              </div>
            </div>

            <div className="flex justify-center pt-5">
              <button
                disabled={isSubmitting}
                className="bg-button2 text-white px-4 py-2 rounded-md w-40 mb-10"
              >
                {isSubmitting ? "Loading..." : "Submit"}
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="bg-button2  text-white px-6 py-2 rounded-md w-40 text-center mb-10 mx-4"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditContactCard;
