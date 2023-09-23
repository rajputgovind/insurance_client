import * as yup from "yup";

const formSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),

  dateOfBirth: yup.date()
    .max(new Date(), "Date of Birth cannot be in the future")
    .required("Date of Birth is required")
    .test("age", "Applicant must be at least 16 years old", (value) => {
      const today = new Date();
      const dob = new Date(value);
      const age = today.getFullYear() - dob.getFullYear();
      return age >= 16;
    })
    .typeError("Date Of birth is required"),

  street: yup.string().required("Street is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),

  zipCode:yup.number()
  .required('Zip Code is required') 
  .test('is-six-digits', 'Zip Code must be a 6-digit number', (value) => {
    if (!value) return false;
    return String(value).length === 6;
  })
  .typeError("Zip Code is required"),


  vin: yup.string().required("VIN is required"),
  
   year: yup.number()
 // .integer("Year must be a whole number")
    .min(1985, "Year must be greater than or equal to 1985")
    .max(new Date().getFullYear() + 1, "Year cannot exceed current year + 1")
    .typeError("year is required"),

  makeModel: yup.string().required("Make is required") ,
  
});

export default formSchema;
