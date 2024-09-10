import * as Yup from "yup";
import { addPropertyFormSchema } from "./add-property-form-schema";

export const addLandFormSchema = addPropertyFormSchema.shape({
  size: Yup.string().min(1, "Size is required.").required("Size is required."),

  measuringUnit: Yup.mixed()
    .oneOf(["acres", "perches"], "You need to select a measuring unit.")
    .required("You need to select a measuring unit."),

  accessRoad: Yup.string()
    .min(1, "Access road frontage required.")
    .required("Access road frontage is required."),

  amenity: Yup.array()
    .of(Yup.string())
    .min(1, "You have to select at least one item.")
    .required("At least one amenity is required."),

  surveyPlans: Yup.string()
    .min(2, "Survey plans approval is required.")
    .required("Survey plans approval is required."),

  deedType: Yup.string()
    .min(2, "Type of deed is required.")
    .required("Type of deed is required."),

  price: Yup.string()
    .min(2, "Price is required.")
    .required("Price is required."),

  description: Yup.string()
    .min(2, "Description is required.")
    .required("Description is required."),

  cover: Yup.string().required("Cover is required."),

  video: Yup.string().required("Video URL is required."),

  pictures: Yup.string().optional(),
});
