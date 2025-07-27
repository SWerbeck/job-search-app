import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useAxiosPrivate from "../custom-hooks/useAxiosPrivate";
import useAuth from "../custom-hooks/useAuth";
import axios from "../../server/api/axios";

// needed for the select to map over later in the form
const allowedOptions = ["has not replied", "replied"] as const;

const schema = z.object({
  contactName: z.string().min(1, {
    message: "Names can not be blank",
  }),
  company_id: z.nullable(z.string()),
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
  newCompanyName: z
    .string()
    .min(1, {
      message: "New company name is required",
    })
    .optional(),
  //   repliedSelectOption: z.enum(allowedOptions, {
  //     errorMap: (issue, ctx) => {
  //       return { message: "Please select a valid option." };
  //     },
  //   }),
});

type FormFields = z.infer<typeof schema>;

const ContactForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, setAuth } = useAuth();
  const [newCompany, setNewCompany] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const from = location.state?.from?.pathname || "/login";

  const usersList = useSelector((state: RootState) => state.users.users);
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const companies = useSelector(
    (state: RootState) => state.companies.companies
  );
  const userApplications = useSelector(
    (state: RootState) => state.userApps.userApps
  );

  console.log("COMPANIESSSS FORM CONTACTS", companies);

  const axiosPrivate = useAxiosPrivate();

  //   if (usersList[0].user_email === "guest@guestmail.com") {
  //     console.log("hey we got the guest");
  //   }

  //    const fetchContacts = async () => {
  //       try {
  //         const fetchedContacts = await axiosPrivate.get(
  //           `/api/contacts/user/${userId}`
  //         );
  //         //console.log('fetched apps from application', fetchedContacts);
  //         dispatch(setContacts(fetchedContacts?.data?.userContacts));
  //         setIsLoaded(true);
  //       } catch (err) {
  //         console.log(err.response.data);
  //         navigate("/", { state: { from: location }, replace: true });
  //       }
  //     };
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      if (usersList[0].user_email === "guest@guestmail.com") {
        console.log("guest data from onsubmit in contact FORM", data);
        const createContact = await axios.post("/api/contacts", {
          company_id: data.company_id,
          user_id: usersList[0].user_id,
          CONTACTNAME: data.contactName,
          CONTACT_LINKEDIN: data.linkedin,
          CONTACT_PHONE: data.phone,
          CONTACT_EMAIL: data.email,
          companyName: data.newCompanyName,
        });
        navigate(`/home/${usersList[0].user_id}/contacts`);
      } else {
        const createContact = await axios.post("/api/contacts", {
          company_id: data.company_id,
          user_id: auth.id,
          CONTACTNAME: data.contactName,
          CONTACT_LINKEDIN: data.linkedin,
          CONTACT_PHONE: data.phone,
          CONTACT_EMAIL: data.email,
          companyName: data.newCompanyName,
        });
        navigate(`/home/${auth.id}/contacts`);
      }
    } catch (error) {
      setError("root", {
        message: "Oops please try again",
      });
    }
  };

  useEffect(() => {
    console.log("useEffect triggered fromt he form");
  }, [userApplications]);

  return (
    <div>
      <h1>Contact form page</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("contactName")}
          type="text"
          placeholder="contactName"
        />
        {errors.contactName && <div>{errors.contactName.message}</div>}
        <select
          {...register("company_id")}
          onChange={(event) => {
            setNewCompany(event.target.value);
          }}
        >
          {userApplications?.map((app, idx) => (
            <option key={idx} value={app.company_id}>
              {app.company}
            </option>
          ))}
          {<option value={"0"}> add new</option>}
        </select>
        {newCompany === "0" ? (
          <input
            {...register("newCompanyName", { required: true })}
            type="text"
            placeholder="New Company Name"
          />
        ) : (
          <></>
        )}{" "}
        {errors.newCompanyName && <div>{errors.newCompanyName.message}</div>}
        <input {...register("linkedin")} type="text" placeholder="linkedin" />
        {errors.linkedin && <div>{errors.linkedin.message}</div>}
        <input {...register("phone")} type="text" placeholder="phone" />
        {errors.phone && <div>{errors.phone.message}</div>}
        <input {...register("email")} type="text" placeholder="email" />
        {errors.email && <div>{errors.email.message}</div>}
        <button
          className="bg-button1 text-white"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
