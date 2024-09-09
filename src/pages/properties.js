import React from "react";
import { CustomTableHeader } from "../modules/shared/components/custom-table-header";
import { PropertyDetails } from "../modules/dashboard/properties/components/property-details";

const Properties = () => {
  return (
    <div className="w-full max-w-[1440px] mx-auto">
      <CustomTableHeader
        header={"properties"}
        description={"You can view all the properties here."}
      />
      <PropertyDetails />
      helo
    </div>
  );
};

export default Properties;
