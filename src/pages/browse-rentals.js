import { BrowseRentalProperties } from "../modules/client/browse-rentals/browse-rentals";
import { CustomTableHeader } from "../modules/shared/components/custom-table-header";

export const BrowseRentals = () => {
  return (
    <div className={"w-full max-w-[1440px] mx-auto p-8"}>
      <CustomTableHeader
        header={"Find your dream stay here."}
        description={
          "You can see all the uploaded properties here which are available for rent."
        }
      />

      <BrowseRentalProperties />
    </div>
  );
};
