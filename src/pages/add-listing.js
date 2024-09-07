import { AddListingForm } from "../modules/client/add-listing/add-listing-form";

const AddListing = () => {
  return (
    <div
      className={
        "relative w-full h-screen flex items-center justify-center text-center overflow-hidden"
      }
    >
      <img
        src={"/images/add-listing.jpeg"}
        alt={"cover"}
        className={
          "absolute top-0 left-0 right-0 bottom-0 w-full h-screen object-cover z-0"
        }
      />

      <div className="absolute h-screen top-0 left-0 right-0 bottom-0 bg-slate-950/30 z-0" />

      <div className={"z-20 flex items-center justify-center w-full"}>
        <AddListingForm />
      </div>
    </div>
  );
};

export default AddListing;
