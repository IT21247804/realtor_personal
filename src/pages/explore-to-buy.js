import { ExploreProperties } from "../modules/client/explore-properties/explore-properties";
import { CustomTableHeader } from "../modules/shared/components/custom-table-header";

export const ExploreToBuy = () => {
  return (
    <div className={"w-full max-w-[1440px] mx-auto p-8"}>
      <CustomTableHeader
        header={"Find your dream stay here."}
        description={"You can see all the uploaded properties here."}
      />

      <ExploreProperties />
    </div>
  );
};
