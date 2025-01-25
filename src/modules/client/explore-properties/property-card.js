import { useState } from "react";
import { PushpinOutlined } from "@ant-design/icons";
import { formatPrice } from "../../shared/utils/format-price";
import { useNavigate } from "react-router-dom";

export const PropertyCard = ({
  cover,
  location,
  price,
  propertyType,
  description,
  listingType,
  status,
  id,
}) => {
  const [isExpanded, setIsExpanded] = useState(false); // State for toggling description
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/property/${id}`); // Redirect to the property details page
  };

  const handleToggleDescription = (e) => {
    e.stopPropagation(); // Prevent the card click event from firing
    e.preventDefault();
    setIsExpanded(!isExpanded); // Toggle the expanded state
  };

  const truncateDescription = (str) => {
    if (str?.length > 280) {
      return str.slice(0, 280) + "...";
    }
    return str;
  };

  function formatNumber(number) {
    let reversedNumber = number?.toString()?.split("")?.reverse()?.join("");
    let reversedWithCommas = reversedNumber?.match(/.{1,3}/g)?.join(",");
    return reversedWithCommas?.split("")?.reverse()?.join("");
  }

  return (
    <div
      className={
        "relative group w-full cursor-pointer rounded-lg border border-[#085585] shadow-lg hover:shadow-md duration-300 hover:shadow-[#085585]/40 overflow-hidden h-auto"
      }
      onClick={handleCardClick} // Handle card redirection
    >
      {status === "sold" && (
        <div className={"w-full h-full absolute bg-black/20"} />
      )}
      <div
        className={
          "overflow-hidden shadow-xs relative transition-all duration-300"
        }
      >
        <img
          src={cover || "/images/default-image.png"}
          alt={location}
          className={
            "object-cover w-full h-64 hover:scale-110 transition-all duration-300"
          }
        />
      </div>

      <div className={"p-4"}>
        <div className={"flex items-center justify-between mb-4"}>
          <div className={"flex items-center"}>
            {listingType === "rent" ? (
              <p className={"text-lg font-semibold text-[#272c63]"}>
                <span className={"text-sm"}>LKR</span> {formatNumber(price)}
              </p>
            ) : (
              <p className={"text-lg font-semibold text-[#272c63]"}>
                <span className={"text-sm"}>LKR</span> {formatPrice(price)}{" "}
                Million
              </p>
            )}
          </div>
          <div className={"flex items-center"}>
            <PushpinOutlined className={"h-4 text-[#085585]"} />
            <p className={"font-semibold capitalize text-[#085585]"}>
              {location}
            </p>
          </div>
        </div>

        <div className={"flex items-center justify-between mb-4"}>
          <div>
            <p className={"capitalize text-md "}>{propertyType}</p>
          </div>
          <div>
            <p
              className={
                "rounded-full shadow-xs border border-[#db4646] px-4 py-1 uppercase text-sm group-hover:bg-[#db4646] group-hover:text-[#e9ecee] font-semibold text-[#e53030] duration-300"
              }
            >
              {status !== "sold" ? <>{listingType}</> : "sold out"}
            </p>
          </div>
        </div>

        <div className={"mb-4"}>
          {isExpanded ? description : truncateDescription(description)}
          {description?.length > 280 && (
            <button
              className="text-[#085585] font-semibold underline ml-2"
              onClick={handleToggleDescription} // Prevent card click propagation
            >
              {isExpanded ? "See Less" : "See More"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
