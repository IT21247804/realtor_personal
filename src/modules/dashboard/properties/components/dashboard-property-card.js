import { Popover, Button, notification } from "antd";
import { MapPin, ChevronsDown, Eye, Trash2, Activity } from "lucide-react";
import { formatPrice } from "../../../shared/utils/format-price";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const DashboardPropertyCard = ({
  image,
  location,
  price,
  propertyType,
  description,
  listingType,
  id,
  agentPhone,
  status,
  signature,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const openNotificationWithIcon = (type, title, description) => {
    notification[type]({
      message: title,
      description: description,
    });
  };

  const confirmDelete = async () => {
    if (!id) return;
    setIsDeleting(true);
    try {
      // Delete property description
      const deleteDescriptionResponse = await fetch(
        `http://localhost:3001/delete-property-description-by-property-id/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!deleteDescriptionResponse.ok) {
        throw new Error("Failed to delete property description");
      }

      // Delete property
      const deletePropertyResponse = await fetch(
        `http://localhost:3001/delete-property-by-id/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!deletePropertyResponse.ok) {
        throw new Error("Failed to delete property");
      }

      openNotificationWithIcon(
        "success",
        "Property Deleted",
        "The property and its description were successfully deleted."
      );
    } catch (error) {
      console.error("Error deleting property:", error);
      openNotificationWithIcon(
        "error",
        "Failed to Delete",
        "There was an issue deleting the property or its description."
      );
    } finally {
      window.location.reload(); // Reload the page
      setIsDeleting(false);
    }
  };

  const truncateDescription = (str) => {
    if (str?.length > 230) {
      return str.slice(0, 230) + "...";
    }
    return str;
  };

  const handleAddToSignature = async () => {
    try {
      // Fetch current signature state
      const currentSignatureResponse = await fetch(
        `http://localhost:3001/get-property-by-id/${id}`,
        {
          method: "GET",
        }
      );

      if (!currentSignatureResponse.ok) {
        console.error(
          "Failed to fetch current signature:",
          currentSignatureResponse.statusText
        );
        throw new Error("Failed to fetch current property signature");
      }

      const property = await currentSignatureResponse.json();
      const currentSignature = property.signature;
      const newSignature = !currentSignature;

      // Update property signature
      const updateSignatureResponse = await fetch(
        `http://localhost:3001/set-signature-property/${id}`,
        {
          method: "PUT", // Change to PUT if your API uses PUT for updates
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ signature: newSignature }),
        }
      );

      if (!updateSignatureResponse.ok) {
        console.error(
          "Failed to update signature:",
          updateSignatureResponse.statusText
        );
        throw new Error("Failed to update property signature");
      }

      // Notify on success
      notification.success({
        message: "Signature Updated",
        description: `The property signature was successfully ${
          newSignature ? "enabled" : "disabled"
        }.`,
      });
    } catch (error) {
      // Notify on error
      notification.error({
        message: "Failed to Update Signature",
        description: "There was an issue updating the property signature.",
      });
    } finally {
      window.location.reload(); // Reload the page
      setIsDeleting(false); // Reset state or handle accordingly
    }
  };

  function formatNumber(number) {
    let reversedNumber = number?.toString().split("").reverse().join("");
    let reversedWithCommas = reversedNumber?.match(/.{1,3}/g).join(",");
    let formattedNumber = reversedWithCommas?.split("").reverse().join("");

    return formattedNumber;
  }

  const popoverContent = (
    <div>
      <div className="flex items-center gap-2 rounded-md hover:bg-gray-100 p-2 cursor-pointer">
        <Link
          to={`/dashboard/properties/${id}`}
          className="flex items-center gap-2"
        >
          <p className="text-sm text--[#272c63] font-semibold">View Property</p>
          <Eye className="h-4 text--[#272c63]" />
        </Link>
      </div>
      <div
        className="flex items-center gap-2 rounded-md hover:bg-gray-100 p-2 cursor-pointer"
        onClick={handleAddToSignature}
      >
        <p className="text-sm text--[#085585] font-semibold capitalize">
          {signature ? "Remove Signature" : "Add Signature"}
        </p>
        <Activity className="h-4 text--[#085585]" />
      </div>
      <div
        className="flex items-center gap-2 rounded-md hover:bg-gray-100 p-2 cursor-pointer"
        onClick={confirmDelete}
      >
        <p className="text-sm text--[#db4646] font-semibold">Delete Property</p>
        <Trash2 className="h-4 text--[#db4646]" />
      </div>
    </div>
  );

  return (
    <div className="relative group w-full cursor-pointer rounded-lg border border--[#085585] shadow-lg hover:shadow-md duration-300 hover:shadow--[#085585]/40 overflow-hidden h-[600px] z-10">
      {status === "sold" && (
        <div className="w-full h-full absolute bg-black/10" />
      )}
      <div className="w-full flex items-center justify-end p-4 absolute top-0 right-0 z-10">
        <Popover content={popoverContent} trigger="click">
          <Button shape="circle" icon={<ChevronsDown />} />
        </Popover>
      </div>
      <div className="overflow-hidden shadow-xs relative z-0">
        <img
          src={image || "/images/default-image.png"}
          alt={location}
          className="object-cover w-full h-64"
        />
      </div>
      <div className={`p-2 ${signature ? "bg-pink-100" : "bg-white"} h-full`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <p className="text-lg font-semibold text--[#272c63]">
              {listingType === "rent" ? (
                <>
                  <span className="text-sm">LKR</span> {formatNumber(price)}
                </>
              ) : (
                <>
                  <span className="text-sm">LKR</span> {formatPrice(price)}{" "}
                  Million
                </>
              )}
            </p>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 text--[#085585]" />
            <p className="font-semibold capitalize text--[#085585]">
              {location}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="capitalize text-md">{propertyType}</p>
          </div>
          <div>
            <p
              className={
                "rounded-full shadow-xs border border--[#db4646] px-4 py-1 uppercase text-sm group-hover:bg--[#db4646] group-hover:text-coolGray font-semibold text--[#e53030] duration-300"
              }
            >
              {status !== "sold" ? <>{listingType}</> : "sold out"}
            </p>
          </div>
        </div>
        <div className="mb-4">
          {typeof description === "string"
            ? truncateDescription(description)
            : description}
        </div>
        <div>
          <p className="w-full text-sm">
            Agent Phone: <span className="italic">{agentPhone}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
