import React from "react";
import { CustomTableHeader } from "../modules/shared/components/custom-table-header";
import { AddPropertyForm } from "../modules/dashboard/properties/components/add-property-form";

const AddProperty = () => {
  return (
    <div className="w-full mx-auto max-w-[1440px]">
      <CustomTableHeader header={"add new property."} description={""} />
      <AddPropertyForm />
    </div>
  );
};

export default AddProperty;
