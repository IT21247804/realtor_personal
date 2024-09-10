import * as Yup from "yup";

export const addPropertyFormSchema = Yup.object().shape({
  referenceId: Yup.string()
    .min(2, "Reference number is required.")
    .required("Reference number is required."),

  firstname: Yup.string()
    .min(2, "Firstname is required.")
    .required("Firstname is required."),

  lastname: Yup.string()
    .min(2, "Lastname is required.")
    .required("Lastname is required."),

  contactNumberOne: Yup.string()
    .min(2, "Contact number one is required.")
    .required("Contact number one is required."),

  contactNumberTwo: Yup.string().optional(),

  whatsappNumber: Yup.string()
    .min(2, "Whatsapp number one is required.")
    .required("Whatsapp number one is required."),

  email: Yup.string().email("Invalid email address.").optional(),

  addressLineOne: Yup.string().optional(),

  addressLineTwo: Yup.string().optional(),

  location: Yup.string()
    .min(4, "Property location is required.")
    .required("Property location is required."),

  age: Yup.string()
    .min(2, "Property age is required.")
    .required("Please select property age."),

  listingType: Yup.string()
    .min(2, "Listing type is required.")
    .required("Please select a listing type."),

  // propertyType: Yup.string()
  //   .min(2, "Property type is required.")
  //   .required("Property type is required."),
});
