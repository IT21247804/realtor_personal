import * as Yup from "yup";
import { addPropertyFormSchema } from "./add-property-form-schema";

export const addHouseOrHotelOrVillaFormSchema = addPropertyFormSchema.shape({
  size: Yup.string().min(1, "Size is required.").required("Size is required."),

  numberOfRooms: Yup.string()
    .min(1, "Number of rooms are required.")
    .required("Number of rooms are required."),

  numberOfWashrooms: Yup.string()
    .min(1, "Number of washrooms required.")
    .required("Number of washrooms are required."),

  floorArea: Yup.string()
    .min(2, "Floor area is required.")
    .required("Floor area is required."),

  price: Yup.string()
    .min(2, "Price is required.")
    .required("Price is required."),

  numberOfFloors: Yup.string()
    .min(1, "Number of floors are required.")
    .required("Number of floors are required."),

  furnished: Yup.string()
    .min(2, "Furnished / Un-furnished / Semi-furnished is required.")
    .required("Furnished / Un-furnished / Semi-furnished is required."),

  description: Yup.string()
    .min(2, "Description is required.")
    .required("Description is required."),

  cover: Yup.string().required("Cover is required."),

  video: Yup.string().required("Video URL is required."),

  pictures: Yup.string().optional(),

  measuringUnit: Yup.mixed()
    .oneOf(["acres", "perches"], "You need to select a measuring unit.")
    .required("You need to select a measuring unit."),
});
