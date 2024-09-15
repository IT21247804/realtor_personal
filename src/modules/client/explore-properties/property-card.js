import { PushpinOutlined } from "@ant-design/icons";
import { formatPrice } from "../../shared/utils/format-price";

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
  const truncateDescription = (str) => {
    if (str?.length > 280) {
      return str.slice(0, 280) + "...";
    }
    return str;
  };

  function formatNumber(number) {
    // Convert the number to a string and reverse it
    let reversedNumber = number?.toString()?.split("")?.reverse()?.join("");

    // Use a regular expression to insert commas every three digits
    let reversedWithCommas = reversedNumber?.match(/.{1,3}/g)?.join(",");

    // Reverse the string back to its original order
    let formattedNumber = reversedWithCommas?.split("")?.reverse()?.join("");

    return formattedNumber;
  }

  return (
    <div
      className={
        "relative group w-full cursor-pointer rounded-lg border border-[#085585] shadow-lg hover:shadow-md duration-300 hover:shadow-[#085585]/40 overflow-hidden h-[500px]"
      }
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

      <div className={"p-2"}>
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

        <div className={"mb-4"}>{description}</div>
      </div>
    </div>
  );
};
