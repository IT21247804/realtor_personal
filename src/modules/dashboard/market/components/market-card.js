import { Trash2 } from "lucide-react";
import { Button, Popover, notification } from "antd";
import { useState } from "react";

export const MarketCard = ({
  image,
  location,
  propertyType,
  description,
  id,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const truncateDescription = (str) => {
    if (str?.length > 400) {
      return str.slice(0, 400) + "...";
    }
    return str;
  };

  const confirmDelete = async () => {
    if (!id) return;

    setIsDeleting(true);

    try {
      const response = await fetch(
        `http://localhost:3001/delete-market-by-id/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete market");
      }

      // Show success notification
      notification.success({
        message: "Market Deleted",
        description: "The market has been successfully deleted.",
        placement: "topRight",
      });

      // Reload the page to reflect the deletion
      window.location.reload();
    } catch (error) {
      // Show error notification
      notification.error({
        message: "Deletion Failed",
        description:
          "There was an error deleting the market. Please try again.",
        placement: "topRight",
      });
      console.error("Error deleting market:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const popoverContent = (
    <div className="p-4">
      <p className="mb-2 font-semibold">
        Are you sure you want to delete this market?
      </p>
      <p className="mb-4">
        This action cannot be undone. This will permanently delete the market
        and remove the data from our servers.
      </p>
      <div className="flex justify-end gap-2">
        <Button onClick={() => setIsDeleting(false)}>Cancel</Button>
        <Button type="primary" onClick={confirmDelete} loading={isDeleting}>
          Continue
        </Button>
      </div>
    </div>
  );

  return (
    <div className="relative group w-full cursor-pointer rounded-lg border border-lightBlue shadow-lg hover:shadow-md duration-300 hover:shadow-lightBlue/40 overflow-hidden h-[500px] z-10">
      <div className="absolute top-4 right-4 z-10">
        <Popover
          content={popoverContent}
          trigger="click"
          onClick={() => setIsDeleting(false)} // Close popover when clicked outside
        >
          <Button
            className="bg-red-400 rounded-full w-10 h-10 p-1 flex items-center justify-center hover:bg-red-500"
            icon={<Trash2 className="text-white" size={16} />}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#272c63";
              e.currentTarget.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#272c63";
            }}
          />
        </Popover>
      </div>

      <div className="overflow-hidden shadow-xs relative z-0">
        <img
          src={image || "/images/default-image.png"}
          alt={location}
          className="object-cover w-full h-64"
        />
      </div>

      <div className="p-2 bg-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <p className="text-lg font-semibold text-darkBlue capitalize">
              {propertyType} in {location}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <p className="w-full text-sm">{truncateDescription(description)}</p>
        </div>
      </div>
    </div>
  );
};
