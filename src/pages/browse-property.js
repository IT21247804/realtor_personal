import { useLocation } from "react-router-dom";
import { ViewIndividualProperty } from "../modules/shared/components/view-individual-property";

export const BrowseProperty = () => {
  const route = useLocation();
  const propertyId = parseInt(route.pathname.split("/")[2]);
  return (
    <div className={"w-full max-w-[1440px] mx-auto p-8"}>
      <ViewIndividualProperty id={propertyId} />
    </div>
  );
};
