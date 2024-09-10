import * as Yup from "yup";
import { addPropertyFormSchema } from "./add-property-form-schema";

export const addCommercialPropertyFormSchema = addPropertyFormSchema.shape({
  numberOfRooms: Yup.string()
    .min(1, "Number of rooms are required.")
    .required("Number of rooms are required."),

  numberOfWashrooms: Yup.string()
    .min(1, "Number of washrooms required.")
    .required("Number of washrooms are required."),

  floorArea: Yup.string()
    .min(2, "Total area is required.")
    .required("Total area is required."),

  elevator: Yup.string()
    .min(2, "Elevator is required.")
    .required("Elevator is required."),

  generator: Yup.string()
    .min(2, "Generator is required.")
    .required("Generator is required."),

  airCondition: Yup.string()
    .min(2, "Air conditioning is required.")
    .required("Air conditioning is required."),

  parking: Yup.string()
    .min(2, "Parking is required.")
    .required("Parking is required."),

  security: Yup.string()
    .min(2, "Security is required.")
    .required("Security is required."),

  price: Yup.string()
    .min(2, "Price is required.")
    .required("Price is required."),

  furnished: Yup.string()
    .min(2, "Furnished / Un-furnished is required.")
    .required("Furnished / Un-furnished is required."),

  description: Yup.string()
    .min(2, "Description is required.")
    .required("Description is required."),

  cover: Yup.string().required("Cover is required."),

  video: Yup.string().optional(),

  pictures: Yup.string().optional(),
});
