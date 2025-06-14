import { Button, Select, Input, Slider } from "antd";
import { formatPrice } from "../utils/format-price";
import { propertyAgeType, propertyTypes } from "../utils/types";
import { useLocation } from "react-router-dom";

export const PropertyFilterBar = ({
  data,
  selectedPropertyAge,
  selectedPropertyType,
  setSelectedPropertyAge,
  setSelectedPropertyType,
  setSelectedLocation,
  selectedLocation,
  priceRange,
  setPriceRange,
  setSelectedNumberOfRooms,
  selectedNumberOfRooms,
  maxPrice,
  link,
}) => {
  const router = useLocation();

  const locations = Array.from(
    new Set(data?.map((property) => property?.location) || [])
  );

  const resetFilters = () => {
    setSelectedLocation("");
    setSelectedPropertyType("");
    setPriceRange([0, maxPrice]);
    setSelectedPropertyAge("");
    setSelectedNumberOfRooms("");
  };

  const handleInputChange = (e) => {
    const value = e.target.value;

    if (!isNaN(value) && Number(value) >= 0) {
      setSelectedNumberOfRooms(value);
    } else if (value === "") {
      setSelectedNumberOfRooms("");
    }
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
    <div className="mb-8 capitalize flex flex-col lg:flex-row items-start justify-between border-b pb-4 w-full z-0">
      <div className={"w-full"}>
        <div className={"flex gap-4 lg:items-center flex-col lg:flex-row"}>
          <div className={"lg:mb-4"}>
            <p className={"font-semibold text-[#272c63] text-sm mb-2"}>
               Location:
            </p>
            <Select
              showSearch
              value={selectedLocation || "Locations"}
              className="h-10"
              style={{ width: 220 }}
              options={locations.map((location) => ({
                value: location,
                label: location,
              }))}
              onChange={(value) => setSelectedLocation(value)}
            />
          </div>

          <div className={"lg:mb-4"}>
            <p className={"font-semibold text-[#272c63] text-sm mb-2"}>
             Property Type:
            </p>
            <Select
              showSearch
              value={selectedPropertyType || "Property types"}
              className="h-10"
              style={{ width: 220 }}
              options={propertyTypes.map((property) => ({
                value: property.value,
                label: property.label,
              }))}
              onChange={(value) => setSelectedPropertyType(value)}
            />
          </div>

          {/* <div className={"lg:mb-4"}>
            <p className={"font-semibold text-[#272c63] text-sm mb-2"}>
              Property Age:
            </p>
            <Select
              showSearch
              value={selectedPropertyAge || "Property age"}
              className="h-10"
              style={{ width: 220 }}
              options={propertyAgeType.map((age) => ({
                value: age.value,
                label: age.label,
              }))}
              onChange={(value) => setSelectedPropertyAge(value)}
            />
          </div> */}

          {selectedPropertyType !== "land" && selectedPropertyType && (
            <div className={"lg:mb-4"}>
              <p className={"font-semibold text-[#272c63] text-sm mb-2"}>
               Number of Rooms:
              </p>
              <Input
                type="number"
                placeholder="Number of rooms"
                value={selectedNumberOfRooms}
                onChange={handleInputChange}
                className={"w-full lg:w-[220px] h-10"}
              />
            </div>
          )}
        </div>

        <div className={"mt-4 lg:mt-0 z-0"}>
          <div className={"w-full lg:max-w-[600px]"}>
            <p className={"font-semibold text-[#272c63] text-sm mb-2"}>
              Filter by Price:
            </p>
            <div className={"w-full max-w-[600px]"}>
              <Slider
                range
                min={0}
                max={maxPrice}
                value={priceRange}
                onChange={(value) => setPriceRange(value)}
              />
            </div>
          </div>
          <div className="flex justify-between mt-2 w-full max-w-[600px]">
            {router.pathname.includes("rentals") ? (
              <span className={"text-sm text-[#085585]"}>
                LKR {formatNumber(priceRange[0])}
              </span>
            ) : (
              <span className={"text-sm text-[#085585]"}>
                LKR {formatPrice(priceRange[0])} Million
              </span>
            )}
            {router.pathname.includes("rentals") ? (
              <span className={"text-sm text-[#085585]"}>
                LKR {formatNumber(priceRange[1])}
              </span>
            ) : (
              <span className={"text-sm text-[#085585]"}>
                LKR {formatPrice(priceRange[1])} Million
              </span>
            )}
          </div>
        </div>
      </div>

      <Button
        onClick={resetFilters}
        className="bg-[#085585] hover:bg-[#db4646] text-white mt-4 lg:mt-0 lg:w-48 h-10 border-0"
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#e53030";
          e.currentTarget.style.color = "#ffffff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#272c63";
        }}
      >
        Reset filters
      </Button>
    </div>
  );
};
